# Roadmap — 한국어 Study

## Status: v2 shipped, v1 phases superseded

Everything below the divider is the **v1 roadmap**. It is kept for the record
only — it is written against v1's architecture (`window.*` globals,
`content/lessons.js`, `content/vocab-usage.js`, `content/words5k.js`,
`js/quiz.js`, `js/conj.js`, `js/exam.js`), none of which exist any more. v2
replaced the app wholesale; v1 was removed from the tree in Task 12 and lives in
git history.

What those phases wanted, and where v2 landed:

| v1 phase | outcome in v2 |
| --- | --- |
| 1–2, usage guides for Core 5k | **Dropped.** Core 5k is a *studied* deck now; v2 teaches only what is beyond it (`content/wordsnext.js`). |
| 3–4, Levels 6–7 | **Reframed.** v2 built the full TTMIK Level 4–5 syllabus first (60 entries, 52 bodies). L6+ is the v2 idea below. |
| 5, graded reading | **Done** — Practice → Reading, `content/readings.js`. |
| 6, dictation | **Done** — Practice → Dictation, from the 1,596 studied sentences. |
| 7, richer word data / bundled audio | **Partly.** `pos` ships on deck entries; bundled audio is still open (below). |
| Feature list: retention stats, review forecast, adjustable new-card cap | **Done** — Me tab (retention strip, totals) and the new-cards-per-day setting. |
| Feature list: cloud sync | **Dropped on purpose.** v2 is local-only with explicit JSON backup/restore. |

The design docs behind v2 are `docs/superpowers/specs/2026-07-18-korean-app-v2-design.md`
and `docs/superpowers/plans/2026-07-18-korean-app-v2.md`.

---

## v2 — future ideas

Nothing here is committed work; it is the honest shortlist of what would come
next, roughly in order of value.

### TTMIK Level 6 and beyond
Extend `content/curriculum.js` past 5.30 and add `content/lessons/l6.js`.
**Full runbook: [docs/EXTENDING.md](docs/EXTENDING.md).**

The views all derive from the curriculum, so no view code changes — but the new
file does have to be *registered* in three places (`content/lessons/index.js`,
`sw.js`'s precache + cache version, and `V2_LESSON_FILES` in
`tools/build_wordsnext.py`). An earlier draft of this section claimed "no JS
changes are needed"; that was wrong.

**The one piece of real thinking** is deciding which L6 lessons the learner
already knows. `tools/dedup_status.py` computes the evidence. It combines *deck
evidence* (fragment hits over the Anki bank, plus forward tags) with *app
evidence*: any point already taught by an existing lesson is `known`, because it
was learned here. That second half replaces an older warning in `curriculum.js`
that the dedup corpus "must grow to every level actually studied" — it cannot,
since L4+ is never exported from Anki, and it does not need to.

### Bundled audio
Every screen depends on the device having a Korean TTS voice; without one,
dictation is unavailable and the 🔊 buttons disappear. The Core 5k Anki export
carries `[sound:…]` mp3 references that could be bundled and played as a
fallback. Cost: repo size, and a precache list that no longer fits in one
`cache.addAll`.

### Mock exams / checkpoints
v1 had per-level checkpoints and a mock TOPIK; v2 deliberately shipped without
them. A level checkpoint generated from completed lessons (the quiz runner and
grader already exist) is the small version; a timed TOPIK-shaped mock with a
reading section is the large one.

### Cloud sync
Deliberately not in v2 — backup/restore is a JSON file on the Me tab. If it ever
comes back it should stay opt-in and keep working offline-first, i.e. sync on
top of the local store rather than replacing it.

### Smaller things
- Grammar search across lesson bodies (there is no way to find a point by name).
- Per-lesson vocab drill, reusing the cards runner over one lesson's `vocab`.
- Export the weak-item pile as an Anki-importable `.txt`.
- A light theme (the CSS is one variable block, but nothing is themed yet).
