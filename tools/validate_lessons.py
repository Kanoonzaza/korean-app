"""Gate every lesson-content change. Exits non-zero on any failure.

Run: python -X utf8 tools/validate_lessons.py

This is the committed form of the checks that gated each content batch during
the v2 build (they lived in throwaway scratchpads until now, which is exactly
how the 5.18 answer-leak bug survived a review). Run it after ANY edit to
content/lessons/*.js or content/curriculum.js, before committing.

Checks, in order:
  1. structure   every lesson file parses as JSON; ids unique; each id exists in
                 curriculum.js; `level` matches the id prefix; a body exists for
                 every non-"known" curriculum entry and for no "known" one
  2. quotas      per lesson type (full / compressed / drill / word-builder)
  3. leakage     no vocab word in known.js; no vocab word in two lessons
  4. bridges     every bridge is an exact sentence from EARLIER material — the
                 Anki bank, or an earlier lesson's own examples
  5. blanks      blankWord is a substring of its sentence AND occurs exactly
                 once (a blank that appears twice leaves the answer on screen)
  6. romaji      per-syllable hyphenated lowercase, and liaison resolved onto a
                 following vowel-initial syllable (논문을 -> non-mu-neul)

Lesson TYPE is inferred from the curriculum entry, never hardcoded per id, so
new levels are classified automatically:
  compressed  body.compressed is true
  builder     point contains a hanja character (the Word Builder lessons)
  meta        point is 띄어쓰기 (spacing) or 축약형 (contractions) — these teach a
              writing convention, so they carry light vocab by design
  drill       0 vocab and none of the above (the Sentence Building Drills)
  full        everything else
"""

import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(HERE)
CONTENT = os.path.join(APP, "content")
LESSON_DIR = os.path.join(CONTENT, "lessons")

# quotas: (vocab_min, vocab_max, sent_min, sent_max, bridge_min, bridge_max, pitfall_min)
QUOTAS = {
    "full":       (6, 10, 6, 8, 2, 3, 2),
    "compressed": (0,  0, 3, 3, 2, 2, 1),
    "drill":      (0,  0, 6, 6, 2, 3, 2),
    "builder":    (6, 10, 6, 8, 0, 3, 1),
    "meta":       (0,  8, 6, 8, 0, 3, 2),
}

# points that mark a writing-convention lesson rather than a grammar pattern
META_POINTS = ("띄어쓰기", "축약형")

HANJA = re.compile(r"[一-鿿]")
HANGUL = re.compile(r"[가-힣]")

# jongseong index -> (romaji as a coda, romaji once it moves to the next onset).
# None = never moves (ㅇ) or too irregular to assert (ㅎ).
CODA = {
    1: ("k", "g"), 2: ("k", "kk"), 4: ("n", "n"), 7: ("t", "d"), 8: ("l", "r"),
    16: ("m", "m"), 17: ("p", "b"), 19: ("t", "s"), 20: ("t", "ss"),
    21: ("ng", None), 22: ("t", "j"), 23: ("t", "ch"), 24: ("k", "k"),
    25: ("t", "t"), 26: ("p", "p"), 27: ("t", None),
}

errors, warnings = [], []


def fail(where, msg):
    errors.append(f"{where}: {msg}")


def read_array(path, name):
    with open(path, encoding="utf-8") as f:
        txt = f.read()
    m = re.search("export const " + name + r"\s*=\s*(\[.*?\]);", txt, re.S)
    if not m:
        sys.exit(f"FATAL: could not find `export const {name}` in {path}")
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError as e:
        sys.exit(f"FATAL: {path} is not JSON-compatible ({e}).\n"
                 f"Lesson files must use double-quoted keys and no trailing commas.")


def lesson_files():
    """Read LESSON_SETS out of content/lessons/index.js — the app's own registry,
    so the validator can never check a different set of files than ships."""
    idx = os.path.join(LESSON_DIR, "index.js")
    with open(idx, encoding="utf-8") as f:
        src = f.read()
    names = re.findall(r'import\s*\{\s*(\w+)\s*\}\s*from\s*"\./(\w+\.js)"', src)
    sets = re.search(r"LESSON_SETS\s*=\s*\[([^\]]*)\]", src)
    if not sets:
        sys.exit("FATAL: no LESSON_SETS in content/lessons/index.js")
    order = [n.strip() for n in sets.group(1).split(",") if n.strip()]
    by_name = dict(names)
    missing = [n for n in order if n not in by_name]
    if missing:
        sys.exit(f"FATAL: LESSON_SETS names {missing} are not imported in index.js")
    return [(by_name[n], n) for n in order]


def syllables(word):
    out = []
    for ch in word:
        c = ord(ch) - 0xAC00
        out.append((c // 588, (c % 588) // 28, c % 28) if 0 <= c < 11172 else None)
    return out


def liaison_expected(word):
    """(stay, onset) for the first moveable liaison inside this word, else None."""
    sy = [s for s in syllables(word) if s]
    for a, b in zip(sy, sy[1:]):
        if a[2] in CODA and CODA[a[2]][1] and b[0] == 11:   # 11 = ㅇ null onset
            return CODA[a[2]]
    return None


def check_romaji(where, ko, romaji):
    if romaji != romaji.lower():
        fail(where, f"romaji must be lowercase: {romaji!r}")
    words, toks = ko.split(), romaji.split()
    if len(words) != len(toks):
        return                                  # punctuation split; nothing safe to assert
    for w, t in zip(words, toks):
        cw = re.sub(r"[^가-힣]", "", w)
        if not cw:
            continue
        exp = liaison_expected(cw)
        if not exp:
            continue
        stay, onset = exp
        if re.search(re.escape(stay) + r"-[aeiou]", t):
            fixed = re.sub(re.escape(stay) + r"-([aeiou])", "-" + onset + r"\1", t, count=1)
            fail(where, f"unresolved liaison in {w}: {t} should be {fixed}")


def main():
    curriculum = read_array(os.path.join(CONTENT, "curriculum.js"), "CURRICULUM")
    meta = {c["id"]: c for c in curriculum}
    order = {c["id"]: i for i, c in enumerate(curriculum)}

    known = set()
    kj = os.path.join(CONTENT, "known.js")
    for name in ("KNOWN_TTMIK", "KNOWN_CORE5K"):
        known |= set(read_array(kj, name))
    bank = {s["ko"] for s in read_array(os.path.join(CONTENT, "ttmik-sentences.js"),
                                        "TTMIK_SENTENCES")}

    lessons, seen_ids = [], set()
    for fname, export in lesson_files():
        for body in read_array(os.path.join(LESSON_DIR, fname), export):
            lid = body.get("id", "?")
            where = f"{fname} {lid}"
            if lid in seen_ids:
                fail(where, "duplicate lesson id")
            seen_ids.add(lid)
            if lid not in meta:
                fail(where, "no matching entry in curriculum.js")
                continue
            if meta[lid]["status"] == "known":
                fail(where, 'curriculum marks this "known" — it must have NO body')
            prefix = lid.split(".")[0]
            if str(body.get("level", "")) != prefix:
                fail(where, f'level {body.get("level")!r} does not match the id prefix {prefix}')
            lessons.append((where, lid, body))

    for c in curriculum:
        if c["status"] != "known" and c["id"] not in seen_ids:
            fail(c["id"], "curriculum entry has no lesson body")

    # sentences available to a lesson's bridges: the bank + everything earlier
    earlier = {}
    acc = set(bank)
    for _, lid, body in sorted(lessons, key=lambda x: order.get(x[1], 10 ** 6)):
        earlier[lid] = set(acc)
        acc |= {s["ko"] for s in body.get("sentences", [])}

    vocab_owner = {}
    for where, lid, body in lessons:
        vocab = body.get("vocab", []) or []
        sents = body.get("sentences", []) or []
        bridges = body.get("bridge", []) or []
        pitfalls = body.get("pitfalls", []) or []

        point = meta[lid].get("point", "")
        kind = ("compressed" if body.get("compressed")
                else "builder" if HANJA.search(point)
                else "meta" if any(p in point for p in META_POINTS)
                else "drill" if not vocab
                else "full")
        vmin, vmax, smin, smax, bmin, bmax, pmin = QUOTAS[kind]
        if not (vmin <= len(vocab) <= vmax):
            fail(where, f"[{kind}] {len(vocab)} vocab, expected {vmin}-{vmax}")
        if not (smin <= len(sents) <= smax):
            fail(where, f"[{kind}] {len(sents)} sentences, expected {smin}-{smax}")
        if not (bmin <= len(bridges) <= bmax):
            fail(where, f"[{kind}] {len(bridges)} bridges, expected {bmin}-{bmax}")
        if len(pitfalls) < pmin:
            fail(where, f"[{kind}] {len(pitfalls)} pitfalls, expected at least {pmin}")

        g = body.get("grammar") or {}
        for key in ("summary", "formation", "explanation"):
            if kind == "compressed" and key != "summary":
                continue
            if not (g.get(key) or "").strip():
                fail(where, f"grammar.{key} is empty")

        for v in vocab:
            ko = v.get("ko", "")
            for key in ("ko", "en", "romaji", "pos"):
                if not (v.get(key) or "").strip():
                    fail(where, f"vocab {ko!r} is missing {key}")
            if ko in known:
                fail(where, f"vocab {ko!r} is already known (known.js)")
            if ko in vocab_owner:
                fail(where, f"vocab {ko!r} already used by {vocab_owner[ko]}")
            else:
                vocab_owner[ko] = lid
            if not HANGUL.search(ko):
                fail(where, f"vocab {ko!r} has no hangul")
            check_romaji(where, ko, v.get("romaji", ""))

        for b in bridges:
            if b not in bank and b not in earlier[lid]:
                fail(where, f"bridge is not earlier material (bank or a previous "
                            f"lesson's sentence): {b!r}")

        for s in sents:
            ko, bw = s.get("ko", ""), s.get("blankWord", "")
            if not (s.get("en") or "").strip():
                fail(where, f"sentence missing en: {ko!r}")
            if not bw:
                fail(where, f"sentence missing blankWord: {ko!r}")
            elif bw not in ko:
                fail(where, f"blankWord {bw!r} is not a substring of {ko!r}")
            elif ko.count(bw) > 1:
                fail(where, f"blankWord {bw!r} occurs {ko.count(bw)}x in {ko!r} — "
                            f"blanking it would leave the answer on screen")
            check_romaji(where, ko, s.get("romaji", ""))

    files = ", ".join(f for f, _ in lesson_files())
    print(f"checked {len(lessons)} lessons across {files}")
    print(f"  {len(vocab_owner)} unique vocab words · {len(curriculum)} curriculum entries")
    for w in warnings:
        print("  WARN " + w)
    if errors:
        print(f"\nFAILED — {len(errors)} problem(s):")
        for e in errors:
            print("  " + e)
        sys.exit(1)
    print("OK — all checks pass")


if __name__ == "__main__":
    main()
