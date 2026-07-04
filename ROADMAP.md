# Content & Feature Roadmap — 한국어 Study

This is the plan for growing the app's **content** and **features** over time. Each
phase is self-contained: it names the file(s) it touches, the data shape to follow,
and a "definition of done" so any future work session can pick up one phase and
finish it without re-discovering the architecture.

The app is deliberately **no-build** (plain global `window.*` objects loaded by
`<script>` tags, rendered by hand-written string templates). Keep it that way —
every phase below fits that model with zero tooling.

---

## Where things stand today

- **Grammar lessons:** Levels 4–5 (`content/lessons.js`), 5-step flow each
  (Grammar → Vocab → Examples → Quiz → Practice).
- **Vocabulary:** 153 lesson words, now each with an example sentence + usage note
  + collocations (`content/vocab-usage.js`). Plus the 3,216-word Intermediate
  **Core 5k** frequency list (`content/words5k.js`), of which ~838 have example
  sentences from the source deck.
- **Review:** spaced repetition (Leitner), weak-item pile, mixed review,
  conjugation drills (`js/srs.js`, `js/review.js`, `js/conj.js`).
- **Tests:** per-level checkpoints + mock TOPIK (`js/exam.js`).
- **Extras:** streak tracking, due-count badge, TTS speed, cloud sync, PWA/offline.

The **usage store** (`content/vocab-usage.js`, keyed by the Korean word) is the
backbone of content growth: any word in any list can be enriched just by adding a
key. **No code changes are needed** to enrich more words — only data.

---

## PHASE 1 — Usage guides for the top 500 Core 5k words
**Goal:** the 500 most-frequent Core 5k words each get the full treatment
(example sentence, usage note, 2–3 collocations) — the same quality bar as the
153 lesson words.

- **File:** append keys to `content/vocab-usage.js` (schema below).
- **Method:** generate in **5 batches of 100**, frequency order (lowest `r` first).
  Where `words5k.js` already has a sentence (`sko`/`sen`), reuse it as `s`/`se`;
  otherwise author a new one using only beginner–intermediate grammar.
- **Schema** (already live):
  ```js
  "단어": {
    s:  "example sentence in Korean",
    se: "English translation",
    u:  "usage note — when/how to use, nuance, register, common mistakes",
    p:  [["collocation", "english"], ["collocation", "english"]]
  }
  ```
- **Definition of done:** revealing any top-500 word in the Words tab shows a
  sentence + note + phrases; no console errors; entries spot-checked for accuracy.

## PHASE 2 — Usage guides for the remaining Core 5k (500 → 3,216)
- **File:** `content/vocab-usage.js`, batches of ~250, frequency order.
- **Priority:** first fill the **2,378 words that currently have no sentence at all**,
  then enrich the rest.
- **Definition of done:** ≥90% of Core 5k words have a sentence + note.

## PHASE 3 — Level 6 lessons (upper-intermediate grammar)
**Goal:** extend the course past Level 5.

- **File:** add lesson objects to `content/lessons.js`; matching `content/curriculum.js`
  entries (TOPIK/CEFR tag + can-do objective). Quizzes, practice, SRS, exams all
  pick new lessons up **automatically** — no JS changes.
- **Candidate grammar points:** `-는데` (contrast/background), `-거든요`, `-잖아요`,
  indirect quotation (`-다고/-라고/-냐고/-자고 하다`), `-(으)ㄴ/는지`, `-게`/`-도록`,
  `-아/어 버리다`, `-고 나서`, `-(으)ㄹ 텐데`, `-던`.
- **Also:** extend `js/conj.js` `ENDINGS` with the new patterns so conjugation
  drills cover them; add the new verbs' forms if any are introduced.
- **Definition of done:** lessons appear on Home + Syllabus with correct % tracking;
  Level 6 checkpoint test generates; conjugation drill includes ≥5 new endings.

## PHASE 4 — Level 7 lessons (advanced)
- **File:** same as Phase 3.
- **Candidate grammar:** formal `합니다`체, passive/causative verb pairs, `-(으)며`,
  `-더라고요`, `-았/었더니`, comparatives `만큼`/`처럼`, `-(으)ㄹ 뿐만 아니라`.
- **Definition of done:** Level 7 present end-to-end like Level 6.

## PHASE 5 — Graded reading passages (new "Reading" tab)
**Goal:** move from sentences to short paragraphs so grammar is seen in context.

- **New file:** `content/readings.js` → `window.READINGS = [{ id, level, title,
  text, glossary: {word: meaning}, questions: [{q, options, answer}] }]`.
- **New module:** `js/reading.js` (mirror `js/listening.js`); add a "Reading" nav
  link in `topbar()` (`js/app.js`) and a route branch in `render()`.
- **Reuse:** the multiple-choice UI already built for exams (`.opt` / `exam-opt`
  handling in `js/app.js`); tap-to-gloss can reuse the `word-reveal` reveal pattern.
- **Definition of done:** each level has ≥3 passages; tapping a glossed word shows
  its meaning; comprehension MCQs grade and feed the streak.

## PHASE 6 — Dictation mode
**Goal:** active listening practice (hear a sentence, type it).

- **Where:** extend the Listening tab or add a Review sub-mode. Reuse the existing
  listen-question infrastructure (`kind: "listen"` in `js/quiz.js`, TTS speed
  control already built) and the character-diff feedback.
- **Source material:** lesson example sentences + Core 5k sentences.
- **Definition of done:** a dictation session plays a sentence at the chosen speed,
  grades the typed answer with the char-diff, and records activity for the streak.

## PHASE 7 (stretch) — Richer word data
- Part-of-speech + synonym/antonym links in `vocab-usage.js` (`pos`, `syn`, `ant`).
- Audio-file playback fallback where a device has no Korean TTS voice
  (the Core 5k deck ships `[sound:...]` mp3 references that could be bundled).

---

## Feature improvements to consider (not content)
Tracked here so they aren't lost; independent of the content phases above.

1. **"Quiz this band"** button on each Core 5k frequency band (Words tab) — drill
   just those 100 words. Small: reuse `Quiz.fromTriples` with the band's slice.
2. **Part-of-speech / bookmarked filter chips** in the Words tab.
3. **Review forecast** on Progress — how many cards are due today / this week
   (`js/srs.js` already knows due dates).
4. **Retention stats** — % correct over time; store daily right/wrong counts
   (extends the `__days` streak store in `js/storage.js`).
5. **Adjustable new-card cap** for SRS (currently fixed `NEW_CAP = 15` in
   `js/srs.js`) as a Progress setting.
6. **Anki export** of the weak-item pile (the miss store) as a `.txt` the user can
   re-import into their existing deck.
7. **Example-sentence audio** — if TTS quality is inconsistent, allow bundling the
   deck's mp3s for key sentences.
