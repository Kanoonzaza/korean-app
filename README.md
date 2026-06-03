# 한국어 Study — Korean Learning App (Level 4)

A small, clean, dark-themed web app for self-studying Korean. It picks up past
TTMIK Level 3 with original Level 4 "modal" lessons (must / may / can), plus an
embedded podcast library for listening practice.

No build step, no server, no dependencies — just open the file.

## How to open

- **On your PC:** double-click `index.html`. It opens in your browser and works
  fully offline (the only thing needing internet is the Listening tab's podcast
  players and the web font).

## Features

- **Lessons** — 3 Level 4 lessons, each a 5-step guided flow:
  Grammar → Vocab → Examples → Quiz → Practice, with a "Common mistakes" callout.
- **Quizzes** — type-the-Korean (English prompt) and listening (hear it, type it).
  No multiple choice; graded by forgiving exact match.
- **Practice** — fill-in-the-blank and full-sentence translation.
- **Review** — keeps older material from fading:
  - *Mixed review* — questions pulled from every lesson you've completed.
  - *Weak items* — anything you answer wrong (in a quiz **or** in review) is saved
    automatically; answer it correctly once and it retires from the pile.
- **Listening** — embedded free podcasts (Didi, IYAGI, SpongeMind, Choisusu).
- **Progress** — completion ✓ and best quiz score per lesson, saved in your browser.
- **Audio** — 🔊 buttons use your browser's Korean voice (Web Speech API). If no
  Korean voice is installed, the app still works; audio just won't play.

## Add your own lessons

Open `content/lessons.js` and copy one lesson object, keeping the same shape:

```js
{
  id: "4.4", level: 4, title: "...", point: "V-...",
  grammar: { summary, formation, explanation, notes: [] },
  pitfalls: [ "..." ],
  vocab: [ { ko, en, romaji, pos, note } ],
  sentences: [ { ko, en, romaji, blankWord } ]
}
```

`blankWord` is the chunk hidden in fill-in-the-blank practice. Quizzes and practice
items are generated automatically from `vocab` + `sentences`.

Add podcasts in `content/podcasts.js` the same way.

## How to update the app

There's no auto-update — it's just files on your PC. You change it in one of two ways:

**1. Edit the content yourself (no coding needed).**
Open `content/lessons.js` in any text editor (Notepad, VS Code) and add a lesson
object using the shape above, or fix a word/translation. Save, then refresh the
browser tab. That's it — quizzes, practice, and review pick up the change
automatically. Same for podcasts in `content/podcasts.js`.

> Tip: keep a backup copy of `content/lessons.js` before big edits. If you ever break
> the file, the app shows an empty list — just restore the backup.

**2. Ask me (Claude) to update it.**
Tell me what you want — "add Level 4 lessons 4.4–4.6", "add a grammar point for ~(으)니까",
"make the quizzes longer", "add a light/day theme" — and I'll edit the files in
`C:\Users\HP\Claude work\korean-learning-app\`. After I'm done, just refresh the tab
(or reopen `index.html`).

**Your progress is safe across updates.** Completion, scores, and the weak-item pile
live in your browser's localStorage, not in the files — editing lessons or replacing
files won't erase them. (Clearing your browser data *will* reset progress.)

## Use it on your phone / any device (GitHub Pages)

The app is a Progressive Web App: once it's on an HTTPS URL you can install it on
your phone's home screen and it runs offline. The free, permanent way to host it is
**GitHub Pages**. A git repo is already initialized in this folder with a first commit,
so you only need to create the remote and push.

### One-time setup

1. **Create an empty repo on GitHub** named e.g. `korean-app`
   (https://github.com/new — no README/.gitignore, keep it empty).
2. **Connect and push** (run these in this folder; replace `YOUR-USERNAME`):
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/korean-app.git
   git branch -M main
   git push -u origin main
   ```
   (Or with the GitHub CLI: `gh repo create korean-app --public --source=. --push`.)
3. **Turn on Pages:** repo → **Settings → Pages** → *Source:* **Deploy from a branch**
   → branch **main**, folder **/ (root)** → Save.
4. Wait ~1 minute. Your app is live at:
   `https://YOUR-USERNAME.github.io/korean-app/`

### Install it on your phone

- Open that URL in the phone browser.
- **Android (Chrome):** menu → **Add to Home screen / Install app**.
- **iPhone (Safari):** Share → **Add to Home Screen**.
- It now opens full-screen like a native app and works offline.

### Pushing future changes

After you (or I) edit lessons/content, publish the update with:
```bash
git add -A
git commit -m "Update lessons"
git push
```
Pages redeploys automatically; reopen the app to get the new version.

> **Progress per device:** your completion/scores/weak-items are stored in each
> browser separately. Use **Progress → Export** on one device and **Import** on another
> to carry them over.

## Files

```
index.html             app shell + script load order
manifest.webmanifest   PWA metadata (name, icon, colors)
sw.js                  service worker (offline support)
icon.svg               app icon
css/style.css          dark theme
content/lessons.js     lesson data (edit to add lessons)
content/podcasts.js    listening library
js/storage.js          progress + weak-item pile + export/import
js/tts.js              Korean text-to-speech
js/quiz.js             quiz generation + grading
js/practice.js         sentence practice
js/review.js           mixed + weak-item review sets
js/listening.js        podcast library view
js/app.js              nav, router, lesson stepper, review runner
```
