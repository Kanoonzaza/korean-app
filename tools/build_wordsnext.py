"""Rebuild / extend content/wordsnext.js — the continuation deck beyond Core 5k.

This reproduces the pipeline used on 2026-07-05 (see docs/design-review-2026-07-05.md).
Run it when you want more words, fixed glosses, or a fresh build. It guarantees
every output word is absent from (a) the user's Anki Core 5k deck, (b) lesson
vocab, and (c) words5k.js.

Requirements (Windows, Python 3.12):
    pip install wordfreq mecab-python3 mecab-ko-dic
Inputs (downloaded automatically if missing, into this folder):
    combined.tsv  — NIKL 학습용 어휘 + TOPIK lists, merged with corpus ranks
                    https://raw.githubusercontent.com/julienshim/combined_korean_vocabulary_list/master/results.tsv
    kengdic.tsv   — Korean/English dictionary (MPL 2.0)
                    https://raw.githubusercontent.com/garfieldnate/kengdic/master/kengdic.tsv
    The Anki export: "Korean Core 5k - English to Korean.txt" (path below).

Pipeline:
  tier A  curated NIKL/TOPIK words not already known, minus predictable
          X하다/X되다 of known bases, proper nouns, and BLOCK-listed grammar words;
          corpus-ranked entries first, then unranked (TOPIK B before C).
  tier B  wordfreq's ranked Korean tokens, kept only if 2–5 hangul chars,
          a kengdic headword, and MeCab-tagged as a single NNG (noun) or MAG
          (adverb) — this removes particles, verb stems, and conjugated forms.
  gloss   kengdic (up to 3 shortest distinct glosses) overridden by MY_GLOSS,
          then cleaned (numbering, "or  ", casing).
Manual curation matters: scan new words for grammar homographs (things like
마다/조차/이랑 rank high as particles, not as their rare noun meanings) and add
them to BLOCK. Output words get r = 5001, 5002, … in deck order.

NOTE: the BLOCK / MY_GLOSS sets from the original run are embedded in git
history (commit 9115aac) via the generated file; if you rerun from scratch,
diff the new wordsnext.js against the committed one to keep those decisions.
"""

import csv, io, json, os, re, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(HERE)
ANKI_TXT = r"C:\Users\HP\Claude work\anki-korean-deck\Korean Core 5k - English to Korean.txt"
OUT = os.path.join(APP, "content", "wordsnext.js")
TARGET_TIER_B = 1500          # corpus words appended after the curated tier

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
    with io.open(ANKI_TXT, encoding="utf-8") as f:
        for line in f:
            if line.startswith("#"): continue
            m = re.search(r"<b style='font-size:2em'>([^<]+)</b>", line)
            if m: known.add(m.group(1).strip())
    for fname, pat in [("lessons.js", r'ko:\s*"([^"]+)"'), ("words5k.js", r'"ko":\s*"([^"]+)"')]:
        src = io.open(os.path.join(APP, "content", fname), encoding="utf-8").read()
        known.update(m.group(1) for m in re.finditer(pat, src))
    return known

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

def main():
    known = known_words()
    keng = load_kengdic()
    print("known:", len(known), "| kengdic headwords:", len(keng))

    # --- tier A: curated learner lists ---
    rows = list(csv.DictReader(io.open(fetch("combined.tsv"), encoding="utf-8"), delimiter="\t"))
    tierA, seen = [], set()
    for r in rows:
        w = re.sub(r"\d+$", "", r["word"]).strip()
        if not w or w.startswith("-") or w.endswith("-") or len(w) < 2: continue
        if r["part_of_speech"] in ("접사", "의존 명사", "조사", "어미", "고유 명사"): continue
        if w in known or w in seen: continue
        m = re.match(r"^(.+?)(하다|되다)$", w)
        if m and m.group(1) in known: continue
        seen.add(w)
        tierA.append({"w": w, "pos": r["part_of_speech"], "hj": r["hanja"],
                      "rank": int(r["rank"]) if r["rank"].strip().isdigit() else None,
                      "topik": r["topik_level"]})
    tierA = sorted([c for c in tierA if c["rank"]], key=lambda c: c["rank"]) + \
            sorted([c for c in tierA if not c["rank"]], key=lambda c: (c["topik"] or "Z", c["w"]))

    # --- tier B: frequency-ranked dictionary nouns/adverbs ---
    import MeCab, mecab_ko_dic
    from wordfreq import iter_wordlist
    tagger = MeCab.Tagger(mecab_ko_dic.MECAB_ARGS)
    def pos_of(w):
        parts = [l.split("\t") for l in tagger.parse(w).splitlines() if l != "EOS" and "\t" in l]
        if len(parts) != 1 or parts[0][0] != w: return None
        return parts[0][1].split(",")[0]

    HANGUL = re.compile(r"^[가-힣]{2,5}$")
    Aset = set(c["w"] for c in tierA)
    tierB = []
    for i, w in enumerate(iter_wordlist("ko")):
        if i > 40000 or len(tierB) >= TARGET_TIER_B: break
        if not HANGUL.match(w) or w in known or w in Aset or w not in keng: continue
        p = pos_of(w)
        if p not in ("NNG", "MAG"): continue
        tierB.append({"w": w, "pos": "명사" if p == "NNG" else "부사", "hj": ""})

    # --- glosses ---
    def pick_gloss(w):
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

    out, missing = [], []
    for d in tierA + tierB:
        en = clean(pick_gloss(d["w"]))
        if not en:
            missing.append(d["w"])
            continue
        e = {"r": 5000 + len(out) + 1, "ko": d["w"], "en": en}
        if d.get("hj"): e["hj"] = d["hj"]
        if d.get("pos"): e["pos"] = d["pos"]
        out.append(e)

    with io.open(OUT + ".new", "w", encoding="utf-8") as f:
        f.write("window.WORDSNEXT = [\n")
        for e in out:
            f.write(json.dumps(e, ensure_ascii=False) + ",\n")
        f.write("];\n")
    io.open(os.path.join(HERE, "missing_gloss.txt"), "w", encoding="utf-8").write("\n".join(missing))
    print("wrote", OUT + ".new", "-", len(out), "words;", len(missing),
          "words need hand glosses (missing_gloss.txt).")
    print("DIFF against the committed wordsnext.js before replacing it - the live",
          "file carries hand curation (BLOCK drops + 170 hand glosses) on top of this.")

if __name__ == "__main__":
    main()
