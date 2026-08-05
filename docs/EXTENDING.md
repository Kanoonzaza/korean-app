# Adding a level (TTMIK Level 6 and beyond)

The app ships TTMIK Levels 4–5. Adding Level 6 is a **content** job: two tools do
the mechanical checking, and no JavaScript needs changing beyond registering the
new file. This is the runbook. Follow it in order.

Prerequisites: Python 3.12 and `pip install wordfreq mecab-python3 mecab-ko-dic`
(only needed for step 7's deck rebuild). Always run Python as `python -X utf8` —
this console is cp1252 and Korean text crashes plain `print` otherwise.

---

## 1. Get the real lesson list

Look up the official TTMIK Level 6 curriculum and record, per lesson: number,
English title, and the grammar point. **Use two independent sources and make
them agree** — the L4/L5 list was verified against the live TTMIK course pages
plus the archived official PDFs, and the URLs are recorded at the top of
`content/curriculum.js`. Do not write the list from memory.

## 2. Work out which lessons the learner already knows

Some TTMIK L6 lessons cover grammar already met — either in the Anki decks or in
this app. Those become `status: "known"`: the syllabus dims them and the unlock
chain skips them, so they never block progress.

Write a JSON file with one entry per lesson:

```json
[{"id": "6.01", "point": "-(으)ㄹ 텐데", "fragments": ["ㄹ 텐데", "을 텐데"]},
 {"id": "6.02", "point": "Word Builder 9 - 心 (심)", "fragments": []}]
```

`fragments` are **conjugated surface forms you would actually see in a sentence**
— for `-아/어서` write `["아서 ", "어서 ", "해서 "]`, not `["아/어서"]`. Keep them
narrow: a fragment like `"서 "` matches half the corpus and tells you nothing.
Lessons with no surface pattern (Word Builders, spacing, contractions, drills)
take `[]` and are `new` by design.

```bash
python -X utf8 tools/dedup_status.py my-level-6.json
```

The tool applies the rule in two halves:

- **Deck evidence** — the Anki decks (TTMIK L1–3). `known` if a studied sentence
  is *tagged* with that lesson, or the fragments hit ≥5 sentences; `compressed`
  at 3–4; else `new`.
- **App evidence** — anything from Level 4 on was studied *here*, not in Anki, so
  the sentence bank will never grow to cover it. Instead: if the point is already
  taught by an existing non-`known` lesson, it is `known`.

> The second half matters more than it sounds. Run against a sample L6 list,
> `-잖아(요)` scores 4 deck hits and `-(으)니까` scores 1 — "compressed" and "new"
> on deck evidence alone. Both are actually **known**, because lessons 5.27 and
> 5.14 teach them. Older notes in this repo warned that the "dedup corpus must
> grow to all previously-studied levels"; it cannot, and this replaces it.

Read the hit counts before accepting the suggestions. Record any override as an
audit note in the header — see the `4.02` and `4.12` notes there for the format.

## 3. Extend `content/curriculum.js`

Append one entry per lesson, in order, after 5.30:

```js
{ "id": "6.01", "ttmik": "Level 6 Lesson 1", "title": "…", "point": "…",
  "status": "new", "canDo": "I can …" }
```

Ids are zero-padded (`6.01`…`6.30`). The array is **strict JSON** — double-quoted
keys, no trailing comma; tooling parses it with `json.loads`. Paste the fragment
table `dedup_status.py` printed into the header comment (fragments separated by
` · `, which is what makes the audit trail re-checkable).

## 4. Author `content/lessons/l6.js`

Copy the shape of `l4.js`. Export `const L6`. Per lesson:

```js
{ "id": "6.01", "level": 6, "title": "…", "point": "…",
  "grammar": { "summary": "…", "formation": "…", "explanation": "…", "notes": ["…"] },
  "pitfalls": ["…", "…"],
  "bridge": ["<exact earlier sentence>", "…"],
  "vocab": [{ "ko": "…", "en": "…", "romaji": "…", "pos": "noun", "note": "…" }],
  "sentences": [{ "ko": "…", "en": "…", "romaji": "…", "blankWord": "<exact substring>" }] }
```

Hard rules — the validator enforces all of these:

- **Strict JSON syntax.** Double-quoted keys, no trailing commas.
- `level` must equal the id prefix.
- **No vocab word already in `content/known.js`**, and none reused by another
  lesson (one namespace across every level — the Word Builders especially).
- **Romanization: per-syllable, hyphenated, lowercase** Revised Romanization
  (`an-nyeong-ha-se-yo`), with liaison resolved onto a following vowel-initial
  syllable — `논문을` is `non-mu-neul`, never `non-mun-eul`.
- **`blankWord` must appear exactly once** in its sentence. If it appears twice,
  blanking it leaves the answer visible — a real bug that shipped in 5.18.
- **Bridges** ("you already know these") must be exact sentences from *earlier*
  material: the Anki bank, or an earlier lesson's own examples. Never the point
  the lesson is teaching, and never something harder than the lesson.
- Sentences use only the new point + grammar already taught + this lesson's
  vocab + known words. Drills may only combine points from **lower ids**.

Quotas by lesson type (inferred automatically, no need to declare):

| type | vocab | sentences | bridges | pitfalls |
|---|---|---|---|---|
| full | 6–10 | 6–8 | 2–3 | 2+ |
| Word Builder (hanja in the point) | 6–10 | 6–8 | 0–3 | 1+ |
| spacing / contractions (띄어쓰기, 축약형) | 0–8 | 6–8 | 0–3 | 2+ |
| drill (0 vocab) | 0 | 6 | 2–3 | 2+ |
| compressed (`"compressed": true`) | 0 | 3 | 2 | 1+ |

**Process note, learned the hard way:** authoring a whole level in one pass keeps
dying to session limits and stream watchdogs. Write ~4 lessons at a time to a
scratchpad JSON file, then merge them into `l6.js` with a short script. Save to
disk before verifying anything.

The per-lesson grammar cribs used for L4/L5 (formation cores, the canonical
pitfalls each point must carry, bridge guidance) are in
`docs/superpowers/plans/2026-07-18-korean-app-v2-BRAINDUMP.md` — Part A. Write
the equivalent for L6 before authoring; it is what the review reads against.

## 5. Register the file — four places

1. `content/lessons/index.js` — import `L6`, add it to `LESSON_SETS`.
2. `sw.js` — add `"./content/lessons/l6.js"` to `PRECACHE` **and bump `CACHE`**
   (e.g. `kov2-v2`). The precache list is deliberately static; without this the
   lesson only reaches an offline device on a second visit.
3. `tools/build_wordsnext.py` — add the path to `V2_LESSON_FILES` so the new
   vocab is excluded from the flashcard deck.
4. `README.md` — bump the lesson counts.

## 6. Validate

```bash
python -X utf8 tools/validate_lessons.py
```

Must print `OK — all checks pass` and exit 0. It checks everything in step 4.
Fix and re-run until clean; do not commit a red run.

## 7. Rebuild the flashcard deck

```bash
python -X utf8 tools/build_wordsnext.py
```

Reconcile mode: it drops any deck word the new lessons now teach and preserves
every hand-curated gloss. Refill is off, so the deck can only shrink. Expect
`dropped N now-known, refilled 0`. Commit the regenerated `content/wordsnext.js`
together with the lesson file.

## 8. Review before shipping

Content batches got an independent review against the cribs — that is how the
false rule statements in 5.05 and 5.12 were caught (a "ㅂ-irregular" that isn't,
and a "vowel-final" noun ending in ㄴ). Neither the validator nor a compiler can
catch those. Have a fresh reader check every lesson against the crib and commit
the findings under `docs/superpowers/plans/reviews/`.

## Things that do **not** need touching

- `js/views/today.js`, `me.js`, `weak.js`, `cards.js` — all derive from the
  curriculum or from stored progress.
- **Dictation.** Its pool is the static Anki sentence bank by design; lesson
  sentences never feed it, so a new level changes nothing. Its `LEVELS` filter
  (1/2/3) describes the *deck*, not the course.
- The flashcard deck's own contents, beyond the reconcile in step 7.

> If you ever regenerate `content/ttmik-sentences.js` (a fresh Anki export), the
> sentence indexes shift. Dictation stores those indexes in `days[*].dict` for
> its 3-day no-repeat window, so the window gets briefly confused and then heals.
> Nothing else depends on them; it is not a reason to avoid re-exporting.
