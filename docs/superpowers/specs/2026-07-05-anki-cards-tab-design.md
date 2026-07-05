# Anki-style Cards tab — design

Date: 2026-07-05 · Status: approved by user (mockup + summary)

## Goal

Add a vocabulary study mode that feels like the Anki app: English front →
tap to reveal the Korean back → self-grade **Again / Hard / Good / Easy**,
with an Anki-like scheduler, deck counts, and a daily new-card limit.
Card pool: the existing `window.WORDS5K` list (~3k intermediate Core 5k
words, frequency order). Direction: English → Korean, matching the user's
"Korean Core 5k — English to Korean" Anki deck.

## UI

**Nav:** new "Cards" tab between Review and Words, with a badge showing
cards available now (new + learning + due).

**Deck screen (`#/cards`):**
- Deck card "Core vocabulary · English → Korean" with three counts:
  New (blue), Learning (orange), Due (green) — plus words-seen progress.
- "Study now" button → `#/cards/study` (disabled when nothing available).
- Setting: new cards/day (default 20, −/+ in steps of 5, 0–100), synced.

**Study screen (`#/cards/study`):**
- Counts row (new · learning · due remaining today), frequency-rank tag.
- Front: the English meaning, centered; "Show answer" bar.
- Back: English stays on top, divider, Korean word large + 🔊 (TTS
  auto-plays on reveal), romanization (existing `RR`), example sentence
  (ko + en) with the headword highlighted when present.
- Grade bar: Again / Hard / Good / Easy, each with its next-interval
  preview label. Keyboard: Space/Enter reveals then grades Good; 1–4 grade.
- When queue is empty: congratulations screen.

## Scheduler (simplified Anki SM-2) — `js/cards.js`

Card state per word (keyed by `ko`), stored under `__cards`:
`{ st: "learn"|"relearn"|"rev", step, ivl (days), ef, due (ms), u (updated ms) }`
Unseen words have no entry ("new"). Meta under `__cardsMeta`:
`{ day: "YYYY-MM-DD", introduced, newPerDay, u }`.

- Learning steps: 1 min → 10 min. From new/learning:
  Again → step 0 (+1 min); Hard → repeat step (+5 min);
  Good → next step, or graduate at ivl 1 d, ef 2.5; Easy → graduate at 4 d.
- Review: Again → relearn (+10 min), ivl → max(1, ⌊ivl·0.25⌋), ef −0.2
  (floor 1.3); Hard → ivl·1.2 (min +1 d), ef −0.15; Good → ivl·ef;
  Easy → ivl·ef·1.3 (min +2 d), ef +0.15. Due = now + ivl days.
- Relearn: Again/Hard → +10 min; Good → back to review at stored ivl;
  Easy → ivl+1.
- Queue order: learning due now → reviews due today → new (within daily
  allotment) → learn-ahead (earliest learning card due today).
- `introduced` increments when a new card is first graded; resets when the
  day changes.

## Storage & sync

`storage.js`: `getCards/setCard`, `getCardsMeta/setCardsMeta` (both stamp
`u`). `mergeData`: `__cards` per-word most-recent-`u` wins; `__cardsMeta`
most-recent-`u` wins, but same-day `introduced` merges by max. Existing
`__srs` (Leitner Today's review), weak items, and bookmarks are untouched.
Export/import picks the new keys up automatically (same root object).

## Files

- new `js/cards.js` — scheduler, queue, counts, previews
- `js/app.js` — nav link, `#/cards` routes, deck + study renderers, actions,
  keyboard handling
- `js/storage.js`, — card state + meta + merge rules
- `css/style.css` — deck counts, study card, grade buttons
- `index.html` — load `js/cards.js`
- `sw.js` — add asset, bump cache version
- `README.md` — feature + file list

## Testing

No test framework in this repo (plain no-build globals). Verify by serving
the app locally and exercising: deck counts, a full study loop (reveal,
each grade), new-limit setting, badge update, and persistence across
reload.
