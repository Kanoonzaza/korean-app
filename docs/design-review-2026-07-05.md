# App design review — 2026-07-05

Scope: all of `js/` (16 modules, ~2,800 lines), `content/` (6 data files),
`css/style.css`, `sw.js`, `index.html`, ROADMAP, MILESTONES. Findings only —
nothing here has been changed.

## Overall verdict

The architecture is healthy and unusually disciplined for a no-build app:
content is pure data (`window.LESSONS`, `WORDS5K`, `WORDSNEXT`, `VOCAB_USAGE`),
logic modules are small and single-purpose, and new lessons/words flow into
quizzes, review, exams, and the syllabus with zero code changes. The storage
layer's namespaced keys with per-key merge rules is the right foundation for
sync. Keep the no-build constraint — it is the app's superpower for
maintenance-by-conversation.

## 1 · Redundancies and debt

Ordered by how much they matter.

1. **Three overlapping memorization systems.** The app now runs
   (a) the Leitner SRS (`__srs`, typed answers, lesson material + bookmarked
   5k words), (b) the SM-2 Cards engine (`__cards`, self-graded, continuation
   deck), and (c) the Words-tab reveal counter (`__wordviews`, no scheduling).
   Two schedulers with different philosophies is one more than needed
   long-term. Recommended direction (not urgent): make the Cards SM-2 engine
   the single scheduler and let "Today's review" feed lesson material through
   it (typed answer correct → Good, wrong → Again). The reveal counter (×N)
   feeds nothing and could be retired.
2. **`js/app.js` is becoming a god module** (1,212 lines: nav, router, five
   runners, all click handling). Each new tab grows it. When the Reading tab
   (ROADMAP Phase 5) lands, extract per-view modules (`js/views/*.js` pattern
   is fine as plain globals) and reduce `render()` to a route → view table.
3. **Stale first-version card state.** Cards graded before today's
   continuation deck were keyed by plain `ko` (e.g. `동의`); current keys are
   `KE|word` / `EK|word`. Old keys linger in `__cards` and sync forever,
   invisible but dead. A one-time purge of keys without a `|` would clean it.
4. **Duplicated helpers.** `esc()` exists in app.js, glossary.js,
   listening.js; `shuffle()` in quiz.js and exam.js. A tiny `js/util.js`
   would remove four copies.
5. **Dead `romaji` fields in content.** Display romanization is generated
   live by `js/romanize.js` everywhere; the hand-written `romaji` strings in
   `lessons.js` survive only as pass-through into the weak-item pile where
   they're also unused for display. New content files already omit them.
6. **`window.Storage` shadows the DOM's built-in `Storage` interface.** It
   works, but it's a foot-gun for future code (e.g. `instanceof Storage`).
   Rename only if ever doing a bigger refactor; not worth churn alone.
7. **`sw.js` ASSETS is hand-maintained** and has to be edited every time a
   file is added (missed entries only hurt first-load offline, since the
   fetch handler caches on demand). Acceptable; a comment in index.html
   reminding "add new scripts to sw.js" would prevent drift.

## 2 · Feature opportunities

High value first; the existing ROADMAP is good — this reorders it in light of
the new Cards system.

1. **"Today" panel on the home screen** — one glance: cards available,
   lesson reviews due, streak, next lesson. The two nav badges (Review,
   Cards) currently compete; a single daily entry point is the Anki-like
   habit loop. Small: reuse `SRS.count()`, `Cards.counts()`, `streakChip()`.
2. **Usage guides for continuation words** (extends ROADMAP Phase 1/2).
   `VOCAB_USAGE` is keyed by word and already the designed growth path — it
   works for `WORDSNEXT` words too. Small code change: Cards back also shows
   `VOCAB_USAGE[ko]` when present; then enrich top words in batches (example
   sentence + note), exactly like the lesson words.
3. **Cards quality-of-life to match Anki muscle memory:** undo last grade
   (one-deep), bury the sibling card (KE/EK of the same word) for the rest of
   the day, and a reviews-per-day cap. All are small scheduler tweaks.
4. **Retention stats** (ROADMAP improvement #4): daily right/wrong counts
   already half-exist (`__days`); a 30-day accuracy strip on Progress would
   close the feedback loop for both schedulers.
5. **Reading tab** (ROADMAP Phase 5) — still the biggest learning-value gap:
   the app trains words and sentences but never paragraphs. The continuation
   deck raises the ceiling; graded readings are what make those words stick.
6. **Dictation mode** (Phase 6) — cheapest new mode; all infrastructure
   (listen questions, char-diff, TTS speed) exists.
7. **Typed-recall option for EK cards** — a Cards setting to type the Korean
   before flipping (auto-grades Good/Again). Bridges the app's typing
   philosophy into the Anki flow for stronger recall.

Deliberately *not* recommended: frameworks/bundlers, accounts beyond the
existing Firebase sync, server-side anything, or importing the full Anki
deck into Cards (Anki already owns those words — that separation is now the
design).

## 3 · Future-expansion support

- **Storage schema version.** `__*` namespaces with per-key merge logic in
  `mergeData` are growing (7 special cases now). Add `__v: 1` and a small
  migration hook on load before the next schema change; merge rules for
  unknown future keys currently fall through to lesson-entry logic, which is
  the one latent trap in `mergeData`.
- **A no-build test page for the scheduler.** `js/cards.js` is now the most
  logic-dense pure module. A `tests.html` that loads the globals and runs
  assertions in the browser (no tooling) would protect the SM-2 math and the
  lag-200 queue order — the two things a casual future edit is most likely
  to break silently.
- **Content pipeline docs.** The wordsnext generation pipeline (NIKL/TOPIK +
  wordfreq + MeCab + kengdic, exclusion against the Anki export) lives only
  in this session. Recorded here so it can be re-run: see
  `docs/superpowers/specs/` and the commit message of the continuation deck.
  Future batches (words 7,500+, example sentences) should follow the same
  exclusion check against the Anki export.
- **View registry when the next tab lands** (see finding 1.2) — that's the
  moment to pay the app.js debt, not before.
