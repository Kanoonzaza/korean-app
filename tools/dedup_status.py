"""Compute the dedup evidence for a new level's curriculum entries.

Run: python -X utf8 tools/dedup_status.py            # self-check on the shipped table
     python -X utf8 tools/dedup_status.py new.json   # evidence for a new level

WHY: every lesson in content/curriculum.js carries status "known" | "compressed"
| "new", and the app hides "known" lessons and skips them in the unlock chain.
Those statuses were hand-computed during the v2 build and recorded as prose in
curriculum.js's header. This tool recomputes the evidence so a future level does
not have to re-derive the method from a comment.

THE RULE HAS TWO HALVES.

  1. Deck evidence — the Anki decks (TTMIK Levels 1-3).
     known      a sentence in content/ttmik-sentences.js is TAGGED with this
                lesson (a forward tag), OR the point's surface fragments appear
                in >= 5 studied sentences
     compressed 3-4 fragment hits
     new        fewer

  2. App evidence — lessons taught by THIS app.
     Everything from Level 4 on is studied here, not in Anki, so the sentence
     bank will never grow to cover it. (curriculum.js's header once warned the
     "dedup corpus must grow to all previously-studied levels" — it cannot, and
     it does not need to.) Instead: if a point is already taught by an existing
     non-"known" curriculum lesson, the learner has met it in the app, so the
     new lesson is "known" regardless of what the deck says.

INPUT for a new level — JSON, one entry per lesson:
    [{"id": "6.01", "point": "-(으)ㄹ 텐데", "fragments": ["ㄹ 텐데", "을 텐데"]},
     {"id": "6.02", "point": "Word Builder 9 - 心 (심)", "fragments": []}]
Fragments are CONJUGATED SURFACE FORMS you would actually see in a sentence, not
the dictionary shape: for -아/어서 use ["아서 ", "어서 ", "해서 "], not ["아/어서"].
Choose them by hand and keep them narrow — a fragment like "서 " matches half the
corpus and tells you nothing. Lessons with no surface pattern (Word Builders,
spacing, contractions, drills) take [] and are always "new" by design.

OUTPUT is a paste-ready block in the exact format curriculum.js's header uses,
plus the suggested status per lesson. The statuses are a STARTING POINT: read
the hits before accepting them, and record any override as an audit note in the
header (see the 4.02 and 4.12 notes there for the format).
"""

import json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
APP = os.path.dirname(HERE)
CONTENT = os.path.join(APP, "content")

KNOWN_MIN = 5        # >= this many fragment hits  -> known
COMPRESSED_MIN = 3   # >= this many               -> compressed


def read_array(path, name):
    with open(path, encoding="utf-8") as f:
        txt = f.read()
    m = re.search("export const " + name + r"\s*=\s*(\[.*?\]);", txt, re.S)
    if not m:
        sys.exit(f"FATAL: no `export const {name}` in {path}")
    return json.loads(m.group(1))


def load():
    sents = read_array(os.path.join(CONTENT, "ttmik-sentences.js"), "TTMIK_SENTENCES")
    curriculum = read_array(os.path.join(CONTENT, "curriculum.js"), "CURRICULUM")
    return sents, curriculum


def hits_for(sents, fragments):
    """How many studied sentences contain any of these surface fragments."""
    if not fragments:
        return 0
    return sum(1 for s in sents if any(f in s["ko"] for f in fragments))


def tagged_ids(sents):
    """Lesson ids the deck itself points at (forward tags like TTMIK-4.02)."""
    out = set()
    for s in sents:
        for t in s.get("tags", []):
            m = re.match(r"TTMIK-(\d+)\.(\d+)$", t)
            if m:
                out.add(f"{int(m.group(1))}.{int(m.group(2)):02d}")
    return out


def taught_points(curriculum, upto_level):
    """Points already taught by the app in levels BELOW upto_level."""
    out = {}
    for c in curriculum:
        if c["status"] == "known":
            continue                          # never taught here, only in Anki
        if int(c["id"].split(".")[0]) < upto_level:
            out[c["point"]] = c["id"]
    return out


def classify(hits, is_tagged, taught_by):
    if is_tagged:
        return "known", "deck tag"
    if taught_by:
        return "known", f"already taught by {taught_by}"
    if hits >= KNOWN_MIN:
        return "known", f"{hits} hits"
    if hits >= COMPRESSED_MIN:
        return "compressed", f"{hits} hits"
    return "new", f"{hits} hits"


def self_check(sents, curriculum):
    """Re-run the shipped fragment table and confirm the recorded hit counts.

    The table lives in curriculum.js's header as
        //   <id> <point>: <frag> · <frag> · … -> <n>
    Fragments are separated by " · " because a fragment may itself contain a
    space ("해 봤"); the table originally used plain spaces and could not be
    re-parsed at all, which is why this check exists.
    Reproducing it proves this tool implements the same rule the build used.
    """
    with open(os.path.join(CONTENT, "curriculum.js"), encoding="utf-8") as f:
        header = f.read().split("export const")[0]
    line = re.compile(r"^//\s+(\d+\.\d+)\s+(.*?):\s+(.*?)\s+->\s+(\d+)\s*$", re.M)
    rows = [r for r in line.findall(header) if not r[2].startswith("(")]
    if not rows:
        sys.exit("FATAL: could not parse the fragment table out of curriculum.js")
    bad = []
    for lid, point, frags, recorded in rows:
        got = hits_for(sents, [f.strip() for f in frags.split("·") if f.strip()])
        if got != int(recorded):
            bad.append((lid, point, frags, recorded, got))
    print(f"self-check: {len(rows)} recorded fragment sets from curriculum.js")
    if bad:
        print(f"  MISMATCH on {len(bad)}:")
        for lid, point, frags, rec, got in bad:
            print(f"    {lid} {point}: recorded {rec}, recomputed {got}   [{frags}]")
        return 1
    print("  all recomputed hit counts match the committed table")

    tags = tagged_ids(sents)
    in_scope = sorted(t for t in tags if int(t.split(".")[0]) >= 4)
    print(f"  forward tags at level 4+: {', '.join(in_scope) if in_scope else 'none'}")
    return 0


def report(sents, curriculum, spec):
    level = int(str(spec[0]["id"]).split(".")[0])
    tags = tagged_ids(sents)
    taught = taught_points(curriculum, level)
    print(f"// Dedup fragments used (point: fragments -> hits):")
    rows = []
    for e in spec:
        lid, point = e["id"], e.get("point", "")
        frags = e.get("fragments", []) or []
        h = hits_for(sents, frags)
        status, why = classify(h, lid in tags, taught.get(point))
        print(f"//   {lid} {point}: {' · '.join(frags) if frags else '(no surface pattern)'} -> {h}")
        rows.append((lid, point, status, why))
    print("\nsuggested statuses — READ THE HITS BEFORE ACCEPTING:")
    for lid, point, status, why in rows:
        print(f"  {lid:<6} {status:<11} ({why})   {point}")
    counts = {}
    for _, _, s, _ in rows:
        counts[s] = counts.get(s, 0) + 1
    print("\n  " + " · ".join(f"{v} {k}" for k, v in sorted(counts.items())))
    return 0


def main():
    sents, curriculum = load()
    if len(sys.argv) > 1:
        with open(sys.argv[1], encoding="utf-8") as f:
            spec = json.load(f)
        if not spec:
            sys.exit("FATAL: input file is empty")
        sys.exit(report(sents, curriculum, spec))
    sys.exit(self_check(sents, curriculum))


if __name__ == "__main__":
    main()
