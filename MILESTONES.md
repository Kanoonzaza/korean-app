# Milestones — 한국어 Study app

A running record of what's been built, in order. Newest at the top.
(Live site: https://kanoonzaza.github.io/korean-app/)

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
