"""Rebuild / extend content/wordsnext.js — the continuation deck beyond Core 5k.

DEFAULT MODE — RECONCILE (preserves hand curation):
  The tool's base is the previous committed deck: content/wordsnext.js if it
  exists, else v1/content/wordsnext.js. From the base it DROPS every entry
  whose word is now known (Anki Core 5k deck, Anki TTMIK Supplement deck,
  v1 lessons.js / words5k.js, and any v2 lesson files in V2_LESSON_FILES),
  is a predictable X하다/X되다 derivative of a known base, or sits on the
  BLOCK list of grammar homographs (see below). Every kept entry
  preserves its base gloss VERBATIM — that carried-forward gloss text is the
  hand curation (BLOCK drops + ~170 hand glosses from the original 2026-07-05
  run live only in the committed file, not in this code). It then REFILLS the
  tail with new tier-B words (wordfreq-ranked, kengdic-glossed, MeCab NNG/MAG)
  until the deck is back to the base's size, and renumbers r = 5001, 5002, …
  Each rerun reconciles against its own last output, so curation keeps
  carrying forward even after the v1/ folder is deleted.

  WARNING: deleting content/wordsnext.js (with no v1/ fallback left) forces a
  from-scratch rebuild, which LOSES all hand curation.

FROM-SCRATCH MODE (fallback only, when no base deck file exists):
  Reproduces the original 2026-07-05 pipeline (docs/design-review-2026-07-05.md):
  tier A  curated NIKL/TOPIK words not already known, minus predictable
          X하다/X되다 of known bases and proper nouns; corpus-ranked entries
          first, then unranked (TOPIK B before C).
  tier B  wordfreq's ranked Korean tokens, kept only if 2–5 hangul chars,
          a kengdic headword, and MeCab-tagged as a single NNG (noun) or MAG
          (adverb) — this removes particles, verb stems, and conjugated forms.
  gloss   kengdic (up to 3 shortest distinct glosses), then cleaned
          (numbering, "or  ", casing).
  Manual curation matters: scan new words for grammar homographs (things like
  마다/조차/이랑 rank high as particles, not as their rare noun meanings) and
  add them to the BLOCK set below — the next reconcile run drops them from the
  deck and refills the tail. (Hand-deleting from the generated file also works;
  reconcile reruns keep the drop.)
  Note: today's combined.tsv upstream snapshot differs from the 2026-07-05
  one, so a from-scratch run will NOT reproduce the committed deck.

Known-word sources are parsed with the shared helpers exported by
tools/build_from_anki.py (Task 1): rows_of / strip_html / as_single_word plus
the CORE_TXT / TTMIK_TXT path constants — the single-word rule is imported,
never re-derived here. The v1 exclusion inputs (words5k.js, lessons.js) live
under v1/content/; v2 lesson files land in V2_LESSON_FILES once Task 6
authors them.

Requirements (Windows, Python 3.12):
    pip install wordfreq mecab-python3 mecab-ko-dic
Inputs (downloaded automatically if missing, into this folder):
    combined.tsv  — NIKL 학습용 어휘 + TOPIK lists, merged with corpus ranks
                    https://raw.githubusercontent.com/julienshim/combined_korean_vocabulary_list/master/results.tsv
    kengdic.tsv   — Korean/English dictionary (MPL 2.0)
                    https://raw.githubusercontent.com/garfieldnate/kengdic/master/kengdic.tsv
    The Anki exports "Korean Core 5k - English to Korean.txt" and
    "TTMIK Supplement.txt" (CORE_TXT / TTMIK_TXT from build_from_anki.py).

Run: python -X utf8 tools/build_wordsnext.py
"""

import csv, io, json, os, re, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(HERE)
sys.path.insert(0, HERE)  # import Task 1's shared helpers (module is main()-guarded)
from build_from_anki import rows_of, strip_html, as_single_word, CORE_TXT, TTMIK_TXT

OUT = os.path.join(APP, "content", "wordsnext.js")
V1_WORDSNEXT = os.path.join(APP, "v1", "content", "wordsnext.js")
TARGET_TIER_B = 1500          # corpus words appended after the curated tier (from-scratch mode)
MAX_CORPUS_SCAN = 40000       # how deep into wordfreq's ranking tier B may look

# v1 known-word sources moved under v1/content/ when v2 took over the root.
V1_WORDS5K = os.path.join(APP, "v1", "content", "words5k.js")
V1_LESSONS = os.path.join(APP, "v1", "content", "lessons.js")
# v2 lesson files (content/lessons/*.js) get appended here by Task 6; their
# vocab is excluded once they exist. Empty until then.
V2_LESSON_FILES = []

# Grammar homographs / conjugation-stem artifacts that the MeCab NNG/MAG +
# kengdic filters let through: they rank high in the corpus as particles,
# verbal endings, suffixes, or verb stems — not as the rare noun the kengdic
# gloss shows — so they make useless flashcards. The original 2026-07-05 run
# kept an equivalent list (see that docstring's BLOCK note); it lived only in
# the generated file's curation, so it is re-seeded here from the words the
# 2026-07-19 refill surfaced. Extend this set whenever a refill surfaces new
# ones. Applied to the reconcile base, the refill, and from-scratch tiers.
BLOCK = {
    "보이",  # verb stem of 보이다 (kengdic: "bellboy, boy, valet")
    "이랑",  # particle "with" (kengdic: "a furough in a field") — docstring example
    "마다",  # particle "every" (kengdic: "each one, every one") — docstring example
    "이루",  # adverb only in the fixed idiom 이루 다 …-할 수 없다
    "더니",  # verbal ending, not a noun
    "다운",  # suffix -다운 "befitting" (kengdic: "like")
    "미치",  # verb stem of 미치다 (kengdic gloss belongs to 미처)
    "그린",  # past adnominal of 그리다 (kengdic: "painted; GREEN")
    "고자",  # ending -고자 "intending to" (kengdic gloss wrong)
    "레이",  # name/loan fragment (kengdic: "lei")
    "가리",  # verb stem of 가리다 (kengdic: "coop")
    "마저",  # particle "even" (kengdic gloss belongs to 먼저)
    "짜리",  # suffix -짜리 "worth/denomination"
    "대요",  # reported-speech ending -대요
    "한지",  # -ㄴ지 "whether" homograph; kengdic gloss garbled ("cold latitude s")
    "취하",  # verb stem of 취하다 (kengdic: legal "nonsuit")
    "강하",  # verb stem of 강하다 (kengdic: "fall, falling")
    "위대",  # root of 위대하다, not used standalone
    "해진",  # past adnominal of 해지다 (kengdic: "seaquake")
    "정한",  # past adnominal of 정하다 (kengdic: "undefiled")
    "에이",  # interjection (kengdic: "sdeath")
    "한가",  # root of 한가하다 (kengdic: "underemployed")
    "쟁이",  # suffix -쟁이; kengdic itself labels it "(suffix)"
    "니스",  # varnish clip / the city Nice — not worth a card
    "비치",  # verb stem of 비치다 / 비치하다 root; kengdic gloss garbled
    "신기",  # root of 신기하다, rarely standalone
    "병신",  # offensive slur — unacceptable as a study card
    "콜걸",  # crude loanword, negligible learning value at this rank
    "포르노",  # crude loanword, negligible learning value at this rank
    "바카라",  # casino loanword, negligible learning value at this rank
}

HEADER = """\
/* wordsnext.js — continuation vocabulary beyond the user's known decks.
 * GENERATED by tools/build_wordsnext.py (reconcile mode): every word is absent
 * from the Anki Core 5k deck, the Anki TTMIK Supplement deck, v1 lessons.js /
 * words5k.js, and v2 lesson vocab — including predictable X하다/X되다 forms of
 * known bases. Gloss edits made here ARE the curation: reconcile reruns carry
 * them forward verbatim. Fields: r = sequence (5001+), ko, en, hj = hanja
 * (optional), pos (optional).
 */
"""

URLS = {
    "combined.tsv": "https://raw.githubusercontent.com/julienshim/combined_korean_vocabulary_list/master/results.tsv",
    "kengdic.tsv": "https://raw.githubusercontent.com/garfieldnate/kengdic/master/kengdic.tsv",
}

def fetch(name):
    path = os.path.join(HERE, name)
    if not os.path.exists(path):
        print("downloading", name)
        urllib.request.urlretrieve(URLS[name], path)
    return path

def known_words():
    known = set()
    # (a) Anki Core 5k deck — word held in <b ...>WORD</b> of the first column.
    for r in rows_of(CORE_TXT):
        m = re.search(r"<b[^>]*>(.+?)</b>", r[1]) if len(r) > 1 else None
        if m:
            w = strip_html(m.group(1))
            if w: known.add(w)
    # (b) Anki TTMIK Supplement deck — Korean is column 4; keep single-word rows.
    for r in rows_of(TTMIK_TXT):
        if len(r) < 5: continue
        w = as_single_word(strip_html(r[4]))
        if w: known.add(w)
    # (c) v1 lessons + (d) v1 words5k — still valid known-word sources; the v2
    #     lesson files are added once Task 6 authors them (V2_LESSON_FILES).
    for path, pat in [(V1_LESSONS, r'ko:\s*"([^"]+)"'), (V1_WORDS5K, r'"ko":\s*"([^"]+)"')] \
                     + [(p, r'ko:\s*"([^"]+)"') for p in V2_LESSON_FILES]:
        src = io.open(path, encoding="utf-8").read()
        known.update(m.group(1) for m in re.finditer(pat, src))
    return known

def suppressed(w, known):
    """True if w is known, or is a predictable X하다/X되다 of a known base."""
    if w in known: return True
    m = re.match(r"^(.+?)(하다|되다)$", w)
    return bool(m and m.group(1) in known)

def load_kengdic():
    csv.field_size_limit(10**7)
    keng = {}
    r = csv.reader(io.open(fetch("kengdic.tsv"), encoding="utf-8", errors="replace"), delimiter="\t")
    next(r)
    for row in r:
        if len(row) < 4: continue
        s, g = row[1].strip(), row[3].strip()
        if not s or not g or " " in s: continue
        if len(g) > 70 or not re.match(r"^[\x20-\x7e]+$", g): continue
        keng.setdefault(s, []).append(g)
    return keng

# --- glosses ---
def pick_gloss(keng, w):
    out = []
    for g in sorted(set(keng.get(w, [])), key=len):
        g = g.strip(" ;,.")
        if not g or g.lower() in [o.lower() for o in out]: continue
        if re.search(r"\b(obsolete|archaic|vulgar)\b", g, re.I): continue
        out.append(g)
        if len(out) == 3: break
    return "; ".join(out)

def clean(g):
    g = re.sub(r"\bor\s{2,}", "; ", g)
    g = re.sub(r"\s*\d\)\s*", "; ", g).strip("; ")
    g = re.sub(r"\s{2,}", " ", g)
    g = re.sub(r"\s*;\s*", "; ", g).strip(" ;,.")
    if g[:1].isupper() and not re.match(r"^(TV|PD|A |An |I |Korean|Western|English|Chinese|North|Southeast|The [A-Z])", g):
        g = g[0].lower() + g[1:]
    return g

def gen_tier_b(known, exclude, keng):
    """Yield frequency-ranked dictionary noun/adverb candidates, best first."""
    import MeCab, mecab_ko_dic
    from wordfreq import iter_wordlist
    tagger = MeCab.Tagger(mecab_ko_dic.MECAB_ARGS)
    def pos_of(w):
        parts = [l.split("\t") for l in tagger.parse(w).splitlines() if l != "EOS" and "\t" in l]
        if len(parts) != 1 or parts[0][0] != w: return None
        return parts[0][1].split(",")[0]
    HANGUL = re.compile(r"^[가-힣]{2,5}$")
    for i, w in enumerate(iter_wordlist("ko")):
        if i > MAX_CORPUS_SCAN: break
        if not HANGUL.match(w) or w in BLOCK or w in exclude or w not in keng: continue
        if suppressed(w, known): continue
        p = pos_of(w)
        if p not in ("NNG", "MAG"): continue
        yield {"w": w, "pos": "명사" if p == "NNG" else "부사", "hj": ""}

def parse_deck(path):
    """Read the one-entry-per-line JSON objects from a generated wordsnext.js
    (works for both v1's window.WORDSNEXT and v2's export const format)."""
    out = []
    for line in io.open(path, encoding="utf-8"):
        line = line.strip().rstrip(",")
        if line.startswith("{") and line.endswith("}"):
            out.append(json.loads(line))
    return out

def renumber(entries):
    out = []
    for e in entries:
        ne = {"r": 5001 + len(out), "ko": e["ko"], "en": e["en"]}
        if e.get("hj"): ne["hj"] = e["hj"]
        if e.get("pos"): ne["pos"] = e["pos"]
        out.append(ne)
    return out

def write_deck(entries):
    with io.open(OUT, "w", encoding="utf-8") as f:
        f.write(HEADER)
        f.write("export const WORDSNEXT = [\n")
        # no trailing comma after the last entry: the array must stay strictly
        # JSON-parseable for downstream tooling/verification.
        f.write(",\n".join(json.dumps(e, ensure_ascii=False) for e in entries))
        f.write("\n];\n")

def build_reconcile(base_path, known, keng):
    base = parse_deck(base_path)
    target = len(base)
    kept = [e for e in base if not suppressed(e["ko"], known) and e["ko"] not in BLOCK]
    dropped_known = [e["ko"] for e in base if suppressed(e["ko"], known)]
    dropped_block = [e["ko"] for e in base if e["ko"] in BLOCK and not suppressed(e["ko"], known)]
    base_kos = set(e["ko"] for e in base)
    added = []
    for d in gen_tier_b(known, base_kos, keng):
        if len(kept) + len(added) >= target: break
        en = clean(pick_gloss(keng, d["w"]))
        if not en: continue                     # no usable gloss — skip
        added.append({"ko": d["w"], "en": en, "pos": d["pos"]})
    out = renumber(kept + added)
    write_deck(out)
    print(f"reconciled against {os.path.relpath(base_path, APP)}: "
          f"{len(base)} base -> kept {len(kept)}, dropped {len(dropped_known)} now-known "
          f"+ {len(dropped_block)} BLOCK-listed, "
          f"refilled {len(added)} -> wrote {len(out)} words to {OUT}")
    if dropped_known:
        print("dropped (now known):", " ".join(dropped_known))
    if dropped_block:
        print("dropped (BLOCK):", " ".join(dropped_block))

def build_from_scratch(known, keng):
    print("WARNING: no existing deck found - building from scratch; the hand",
          "curation carried by the previous committed wordsnext.js is LOST.")
    # --- tier A: curated learner lists ---
    rows = list(csv.DictReader(io.open(fetch("combined.tsv"), encoding="utf-8"), delimiter="\t"))
    tierA, seen = [], set()
    for r in rows:
        w = re.sub(r"\d+$", "", r["word"]).strip()
        if not w or w.startswith("-") or w.endswith("-") or len(w) < 2: continue
        if r["part_of_speech"] in ("접사", "의존 명사", "조사", "어미", "고유 명사"): continue
        if w in seen or w in BLOCK or suppressed(w, known): continue
        seen.add(w)
        tierA.append({"w": w, "pos": r["part_of_speech"], "hj": r["hanja"],
                      "rank": int(r["rank"]) if r["rank"].strip().isdigit() else None,
                      "topik": r["topik_level"]})
    tierA = sorted([c for c in tierA if c["rank"]], key=lambda c: c["rank"]) + \
            sorted([c for c in tierA if not c["rank"]], key=lambda c: (c["topik"] or "Z", c["w"]))

    # --- tier B: frequency-ranked dictionary nouns/adverbs ---
    Aset = set(c["w"] for c in tierA)
    tierB = []
    for d in gen_tier_b(known, Aset, keng):
        if len(tierB) >= TARGET_TIER_B: break
        tierB.append(d)

    out, missing = [], []
    for d in tierA + tierB:
        en = clean(pick_gloss(keng, d["w"]))
        if not en:
            missing.append(d["w"])
            continue
        e = {"ko": d["w"], "en": en}
        if d.get("hj"): e["hj"] = d["hj"]
        if d.get("pos"): e["pos"] = d["pos"]
        out.append(e)
    out = renumber(out)
    write_deck(out)
    io.open(os.path.join(HERE, "missing_gloss.txt"), "w", encoding="utf-8").write("\n".join(missing))
    print("wrote", OUT, "-", len(out), "words;", len(missing),
          "words need hand glosses (missing_gloss.txt).")

def main():
    known = known_words()
    keng = load_kengdic()
    print("known:", len(known), "| kengdic headwords:", len(keng))
    base_path = next((p for p in (OUT, V1_WORDSNEXT) if os.path.exists(p)), None)
    if base_path:
        build_reconcile(base_path, known, keng)
    else:
        build_from_scratch(known, keng)

if __name__ == "__main__":
    main()
