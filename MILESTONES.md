# Milestones — 한국어 Study app

A running record of what's been built, in order. Newest at the top.
(Live site: https://kanoonzaza.github.io/korean-app/)

## 2026-06-04 — Cloud sync LIVE ✅ (Firebase project connected + tested)
- Baked in the Firebase project config (project `korean-app-d08a8`); Firestore enabled
  with a security rule (read/write only under /progress, code length ≥ 16).
- Verified end-to-end: raw write/read round-trip works, short codes are blocked by the
  rule, and the app's own Sync module push→pull restores lessons + weak items via merge.
- Users turn it on per device: Progress → Cloud sync → Generate code → Turn on (same
  code on both devices).

## 2026-06-04 — Cloud sync (Firebase) — client built, awaiting project config
- Added optional **cloud auto-sync** of progress via Firebase Firestore (`js/sync.js`,
  `content/firebase-config.js`). One Firestore doc per private "sync code".
- Behaviour: on load pull + MERGE (no progress lost), debounced push after changes,
  re-sync when back online. Firebase SDK is lazy-loaded only when configured.
- `Storage.mergeData` added: per-lesson keep best furthestStep/score, union weak items.
- Sync UI in Progress tab (paste config → set sync code → on/off → sync now).
- Stays dormant until a Firebase config + sync code are provided. Verified: UI state
  machine works, app error-free, Firebase not loaded until configured.
- TODO: user creates Firebase project + Firestore rule, then we flip it on and test.

## 2026-06-04 — Auto-update banner
- Added a "🔄 New version available — Update" banner that appears automatically when a
  new version is published; tapping it activates the new service worker and reloads.
- Service worker no longer auto-skips waiting; it waits for the user's tap (message
  `SKIP_WAITING`). Page re-checks for updates on focus + hourly.
- Note: progress is still **per-device** (localStorage). No cross-device auto-sync —
  use Progress → Export/Import to move data between phone and PC.

## 2026-06-04 — Level 4 complete, batch 2 (4.12–4.20)
- Added 9 lessons: 4.12 아/어 주다 (do for someone), 4.13 보다/제일 (comparison),
  4.14 고 있다 (-ing), 4.15 게 되다 (end up), 4.16 (으)ㄹ 줄 알다 (know how to),
  4.17 못 (cannot), 4.18 (으)면서 (while), 4.19 기로 하다 (decide to),
  4.20 (으)ㄴ 적이 있다 (have done before).
- **Level 4 now complete: 20 lessons (4.1–4.20).** Paused here before Level 5 (per request).
- Verified: all 20 lessons parse, valid shape, blanks resolve, quizzes/practice build clean.

## 2026-06-04 — Level 4 expansion, batch 1 (4.6–4.11)
- Added 6 lessons: 4.6 것 같다 (I think/it seems), 4.7 아/어지다 (become),
  4.8 (으)ㄹ 때 (when), 4.9 기 전에 (before), 4.10 (으)ㄴ 후에 (after),
  4.11 아/어 보다 (try doing). Lesson count: **11** (4.1–4.11).
- Part of the ongoing "all of Level 4 & 5" build — done in accuracy-checked batches.
- Verified: all 11 lessons valid + generate quizzes/practice with no errors.

## 2026-06-04 — TOPIK level gauge (learner level estimate)
- Added an **estimated TOPIK level** shown as a semicircular **gauge** at the top of the
  Progress tab (`js/level.js`).
- Estimate = completed lessons × quiz scores, minus a small penalty for weak items;
  mapped into the early-intermediate band (~TOPIK 2.0 → 3.5) the content covers.
- Clearly labelled as an indicative self-study estimate (not an official TOPIK result),
  with an expandable "How is this estimated?" explainer.

## 2026-06-04 — Lessons 4.4 & 4.5 added
- **Lesson 4.4 — Because / So (V-(으)니까)**: reason clause, incl. use before commands/suggestions.
- **Lesson 4.5 — If / When (V-(으)면)**: conditional, with "if" vs general "whenever".
- Both follow the same 5-step format; quizzes/practice/review pick them up automatically.
- Home subtitle generalised beyond "modals".
- Lesson count: **5** (4.1–4.5).

## 2026-06-04 — Cross-device support (PWA) + live hosting
- Made it an installable **PWA**: `manifest.webmanifest`, `icon.svg`, offline `sw.js`
  (network-first, so edits show fresh; cache for offline).
- Mobile meta tags + verified responsive (no overflow at 375px).
- **Progress export/import** added to the Progress tab (move data between devices).
- Initialised git, authored as `noonkk <noonkk.138@gmail.com>`.
- Pushed to GitHub and enabled **GitHub Pages** → site is live and installable.

## 2026-06-04 — Review feature
- New **Review** tab with two modes:
  - **Mixed review** — questions drawn from all completed lessons.
  - **Weak items** — anything answered wrong (in quiz or review) is saved and resurfaces;
    answering it right once retires it.
- Misses are captured automatically across quizzes, practice, and review.

## 2026-06-04 — Initial build (v1)
- Static, no-build web app (HTML/CSS/vanilla JS) — clean minimal **dark theme**.
- 3 original **Level 4** lessons: 4.1 Have to/Must, 4.2 May/Must-not, 4.3 Can/Cannot.
- Each lesson = 5-step linear flow: **Grammar → Vocab → Examples → Quiz → Practice**,
  with a "Common mistakes" callout.
- **Quizzes**: type-the-Korean + listening (no multiple choice), forgiving grading.
- **Practice**: fill-in-the-blank + sentence translation.
- **Listening**: embedded podcast library (Didi, IYAGI, SpongeMind, Choisusu).
- **Audio** via browser TTS; **progress** (✓, %, best score) in localStorage.

---

### Ideas / backlog (not done yet)
- More Level 4 lessons (e.g. 것 같다 "I think/it seems", -고 있다 progressive, -(으)ㄴ/는데).
- Optional: fix romanization to reflect real pronunciation (sound changes), or remove it.
- Optional: weak-item count badge in the top nav.
