# 한국어 Study — v2

A small offline-first web app that continues Korean study from where two Anki
decks stop: **TTMIK Supplement (Levels 1–3)** and **Korean Core 5k**.

Everything the app teaches is chosen against those decks. The 60-lesson syllabus
is TTMIK Levels 4–5, with lessons already covered by the studied deck marked
*known* and skipped. The flashcard deck starts at word #5001 — every entry is
absent from Core 5k, from the TTMIK deck, and from the lesson vocab. Dictation
sentences are drawn only from sentences already studied, so the meaning is known
and the work is hearing it.

No build step, no dependencies, no framework: plain ES modules, hand-written
string templates, `localStorage`.

## How to open it

**On the phone / anywhere — the hosted copy:**
<https://kanoonzaza.github.io/korean-app/> (GitHub Pages, served from `main`).
Add it to the home screen — Android Chrome: menu → *Install app*; iPhone Safari:
Share → *Add to Home Screen*. After the first load it works fully offline.

**Locally — you must serve it over http:**

```bash
cd korean-learning-app
python -m http.server 8734
# then open http://localhost:8734
```

> **`file://` will not work.** The app is built from ES modules
> (`<script type="module">` + `import`), and browsers block module imports from
> `file://` under the CORS rules. Double-clicking `index.html` gives a blank
> page and a console full of CORS errors. Service workers are also http-only, so
> `file://` has no offline caching either. Use the Pages URL or a local server.

## The four tabs

- **Today** — the daily plan: one lesson (or a due review), a batch of cards,
  one dictation round. Finish all three to keep the streak.
- **Learn** — the 60-lesson TTMIK L4–L5 syllabus and the lesson player. Each
  lesson is a 5-step flow: Grammar → Vocab → Examples → Quiz → Practice.
  Finished lessons come back as spaced review sessions.
- **Practice** — the hub: Cards (the 2,481-word continuation deck, SM-2
  scheduled, Korean→English with the reverse direction lagging behind),
  Dictation (hear a studied sentence, type it), Weak items (anything you typed
  wrong, until you get it right), Reading (graded passages with tap-to-gloss and
  comprehension questions), Podcasts.
- **Me** — streak calendar, retention, totals, speech rate, new-cards-per-day,
  and backup/restore.

Audio uses the browser's Web Speech API. With no Korean voice installed the app
still works; the 🔊 controls and dictation are hidden rather than silently
failing.

## Offline

`sw.js` precaches the whole app (31 files — shell, every JS module, every content
module, icons) into a versioned cache and serves cache-first. Every screen works
with no connection; only the Podcasts tab needs one, because its players are
Spotify/YouTube iframes — that page still renders offline, the players just
don't load.

**After changing any file, bump `CACHE` in `sw.js`** (`kov2-v1` → `kov2-v2`).
Old caches are deleted on activate. Without the bump, installed copies keep
serving the old files.

## Content

```
content/curriculum.js        60 TTMIK L4-L5 lessons: title, point, TOPIK/CEFR
                             tag, and status (new / compressed / known)
content/lessons/l4.js        52 lesson bodies (23 + 29) for the entries that
content/lessons/l5.js          aren't already known from the studied deck
content/wordsnext.js         2,481-word continuation flashcard deck  GENERATED
content/ttmik-sentences.js   1,596 studied L1-3 sentences            GENERATED
content/known.js             known-word index (tool input only)      GENERATED
content/readings.js          6 graded reading passages
content/podcasts.js          4 podcast shows
```

### Adding lessons

Lesson bodies are hand-written in `content/lessons/l4.js` / `l5.js`; the
syllabus entry (title, level, status) comes from `content/curriculum.js`. A body
looks like this:

```js
{
  id: "4.01", level: 4, title: "…", point: "-(으)ㄹ수록",
  grammar: {
    summary: "one sentence — what it does",
    formation: "V-stem + …   (rules, incl. irregulars; \n is kept)",
    explanation: "3-6 sentences of plain English, with register notes",
    notes: ["short extra facts"]
  },
  pitfalls: ["common mistake", "…"],
  bridge:  ["<ko copied EXACTLY from content/ttmik-sentences.js>", "…"],
  vocab:   [{ ko, en, romaji, pos, note }],
  sentences: [{ ko, en, romaji, blankWord }]
}
```

Rules that matter:

- `bridge` strings must be exact `ko` matches in `ttmik-sentences.js` — the app
  looks the English up at render time, so a typo shows an empty bridge.
- `vocab.ko` must be new: not in `content/known.js` and not used by another
  lesson.
- `blankWord` is the exact substring hidden in fill-in-the-blank practice.
- A `"compressed": true` body is the short form used for lessons the deck partly
  covers: summary + a couple of bridges + a few sentences, no new vocab.
- Romanization is Revised Romanization, lowercase, hyphenless.

Add the matching `curriculum.js` entry (or flip its `status` to `"new"`), reload,
and the syllabus, Today, quizzes, review and stats pick it up with no JS changes.
Podcasts and readings work the same way — data only.

## Re-running the content tools after a fresh Anki export

Both tools read the exports at
`C:\Users\HP\Claude work\Korean\anki-korean-deck\` (`TTMIK Supplement.txt`,
`Korean Core 5k - English to Korean.txt`). Run them in this order, from the repo
root:

```bash
python -X utf8 tools/build_from_anki.py     # -> content/known.js, content/ttmik-sentences.js
python -X utf8 tools/build_wordsnext.py     # -> content/wordsnext.js
python -X utf8 tools/test_build_from_anki.py  # sanity-checks the first tool's output
```

`build_wordsnext.py` runs in **reconcile mode**: the committed
`content/wordsnext.js` is its base, and it only ever *drops* entries — words you
now know from the decks, words absorbed into lesson vocab, and grammar
homographs on its `BLOCK` list. Refill is disabled, so the deck can shrink but
never grows on its own, and every kept gloss is carried forward verbatim.
**The hand-curated glosses live only in the committed file** — deleting
`content/wordsnext.js` forces a from-scratch rebuild and loses them.

The tool also needs `wordfreq`, `mecab-python3` and `mecab-ko-dic` installed, and
downloads `combined.tsv` / `kengdic.tsv` into `tools/` on first run.

## Backup and restore

Progress lives in this browser's `localStorage` under `kov2.*` keys and is never
uploaded anywhere — so it is per-device, and clearing site data erases it.

**Me → Backup → ⤓ Download backup** writes a single JSON file with every `kov2.`
key: lesson progress and review schedules, card scheduling, day history, weak
items, settings. **↥ Import a backup…** reads one back after a confirmation
step; importing replaces every key the file mentions and leaves the rest alone.
That is also how you move progress from one device to another.

## Layout

```
index.html               shell: nav, #view mount, module entry point
sw.js                    offline precache worker (bump CACHE on any change)
manifest.webmanifest     PWA metadata
css/style.css            dark theme, system font stack, no external requests
js/main.js               registers every view's routes, starts the router
js/router.js             hash router with per-view teardown
js/store.js              localStorage layer (all kov2.* keys)
js/srs.js                SM-2 scheduler — shared by cards and lesson review
js/grader.js             forgiving answer match + character diff
js/tts.js                Korean speech (Web Speech API)
js/views/*.js            one module per screen (10)
content/*                data (see above)
tools/*.py               the Anki -> content pipeline
docs/                    design docs, plans and reviews
```

v1 of this app (a `window.*`-globals build with cloud sync, exams and
conjugation drills) was replaced by this rebuild and removed in Task 12; it is
still in the git history if anything needs to be recovered.
