# Task 7 spec review — syllabus + lesson player

**Commits reviewed:** `645b75f` (feat: syllabus + 5-step lesson player), `a758c6a` (fix: fuller quizzes for drill lessons)
**Branch:** `v2` · **Reviewed:** 2026-07-25 · **Method:** full source read + static content simulation (node) + live browser drive at `http://localhost:8734`

## Verdict

**Spec compliant.** No blocking issues. Every binding rule (single route, unlock chain skipping `known`, `best` monotonicity, `srs` seeded once, day-counter read-modify-write preserving `done`, `compressed`-vs-drill quiz branch, teardown on all render paths, `hasKorean()` gating) was independently confirmed with observed values. Five polish items below.

Implementer claims were spot-checked and all held. Nothing was found to be misreported.

---

## 1. What actually changed

`git show --stat`:

| commit | file | +/- |
|---|---|---|
| 645b75f | `css/style.css` | +92 |
| 645b75f | `js/tts.js` | +7 |
| 645b75f | `js/views/lesson.js` | +432 / −(part of 14) |
| 645b75f | `js/views/syllabus.js` | +107 |
| a758c6a | `js/views/lesson.js` | +36 / −10 |
| a758c6a | `docs/.../2026-07-18-korean-app-v2-HANDOFF.md` | +5 |

- The two named view files are the bulk (539 of 624 lines in 645b75f).
- `js/tts.js` addition is a clean minimal 7-line `export function cancel()` (`js/tts.js:32-37`) — `if (!supported) return;` + try/catch around `speechSynthesis.cancel()`. Nothing else in that file touched. Justified: it keeps views from touching `speechSynthesis` directly.
- CSS is additive only — a new block inserted before the pre-existing "answer diff" rules; no existing selector modified. All custom properties it uses (`--kfont`, `--accent-ink`, `--surface-2`, `--ok`, `--bad`, `--radius`) already exist at `css/style.css:4-16`.
- No source file outside the sanctioned set was touched.

## 2. Source review

### Routing — PASS
- `js/views/syllabus.js:17` registers exactly one prefix: `route("/learn", (mount, params) => { if (params) return renderLesson(mount, params); renderSyllabus(mount); })`.
- `js/views/lesson.js:32` — `export function register() { /* no route */ }`, a deliberate no-op so `js/main.js:13` can keep treating all views identically.
- Repo-wide grep for `route(` confirms the only `/learn` registration is `syllabus.js:17`. No `/learn/<id>` anywhere.
- Router (`js/router.js:23,27`) matches `path === prefix || path.startsWith(prefix + "/")` and hands the tail as `params`. Verified live: `#/learn` → list, `#/learn/` → list, `#/learn/4.01` → player.

### Unlock chain — PASS (the important one)
`js/views/syllabus.js:33-47`. `status:"known"` rows `continue` at line 38 **before** `earlierAllDone` is touched, so a known lesson can never gate the next.

Live proof: with a clean store, `up next` = **4.01**. After completing 4.01, `up next` = **`#/learn/4.03`** — known lesson **4.02 was skipped, not treated as a gate**. Exactly the required behavior.

Row states (`syllabus.js:51-80`): done/current are `<a class="lrow …">`; locked is `<div class="lrow locked" aria-disabled="true">` with no `href`; known is `<div class="lrow known">`. `canDo` only rendered when `tappable` (line 73).

### Persistence — PASS
- `saveStep` (`lesson.js:92-97`) early-returns when the stored step is already ≥ the new index → `step` is the furthest step reached.
- `saveCompletion` (`lesson.js:99-106`): `r.done = true` unconditionally; `r.best = Math.max(existing ?? 0, pct)`; `if (!r.srs) r.srs = schedule(null, 2, Date.now())`. `srs` is persisted verbatim, never hand-constructed, and the `!r.srs` guard makes it first-completion-only.
- `logAnswer` (`lesson.js:110-122`) reads the whole day object, defaults `{right:0,wrong:0,done:[]}`, coerces a non-array `done` back to `[]` (line 113), increments one counter, and writes the whole object back via `store.setDay`. `store.setLesson`/`setDay` (`js/store.js:13,23`) replace the whole per-key value, and since `rec()`/`logAnswer` always start from the full stored object, no sibling field is lost.
- Weak pile: `w[expectedKo] = { en: en || "", kind }` (line 119) — exact shape, no retirement logic.

### Quiz branch — PASS
`lesson.js:149` branches on **`body.compressed`**, not on vocab length. That is precisely the amended ruling, and the `a758c6a` diff shows the old `if (!vocab.length)` being replaced by `if (body.compressed)`. Drills (0 vocab, not compressed) fall through to the general path and take 4 typed sentences (`lesson.js:166-172`) plus the shared 2-item listen tail (`lesson.js:176-183`). Counts are content-driven: every loop is bounded by `vi < vPool.length` / `si < sPool.length`, so nothing is ever padded.

### Teardown — PASS
`renderLesson` returns `() => cancelSpeech()` on **both** exits: the not-found / known-id card (`lesson.js:381`) and the normal player (`lesson.js:442`). `js/router.js:20` invokes the stored cleanup before the next render. `prev`/`next` also call `cancelSpeech()` before changing step (`lesson.js:428,433`).

### TTS gating — PASS
`spk()` (`lesson.js:70-73`) returns `""` unless `hasKorean() && ko`. Every 🔊 in grammar/bridge/vocab/examples/listen-prompt goes through it. Clicks are delegated once per step via `wireSpeakers(host)` (`lesson.js:74-80,425`) and survive the runner replacing `host.innerHTML`.

### Bridge lookup — PASS
`enForKo` (`lesson.js:58-65`) builds a lazy `ko → en` Map from `TTMIK_SENTENCES` and is an exact-key lookup. Miss path is safe: returns `""`, and the template renders `${en ? … : ""}` (`lesson.js:238`) — Korean alone, no crash. Static check: **101 bridge strings across all 52 bodies, 0 misses** against 1596 TTMIK sentences.

---

## 3. Static content simulation (node, mirrors `buildQuiz`/`buildPractice`/step assembly)

- `CURRICULUM` = **60** entries; **8** `status:"known"` (4.02, 4.07, 4.08, 4.14, 4.25, 4.26, 4.27, 5.02); **52** gating (49 `new` + 3 `compressed`).
- Level 4: 30 rows / 23 gating / 7 known. Level 5: 30 rows / 29 gating / 1 known. All 60 ids match a `4.`/`5.` prefix, so no row is dropped by `levelBlock`'s filter.
- Body coverage is exact: 52 bodies (23 L4 + 29 L5); **0 non-known lessons without a body, 0 known lessons with one, 0 orphan bodies**. So the `hasBody()` guard in `syllabus.js:64` is pure belt-and-braces and never suppresses a real row.
- Quiz item counts across all 52 lessons:
  - 44 normal lessons → **8 items, 2 listen** (with voice) / 8 items, 0 listen (without). Never fewer, even 4.21 which has only 4 vocab.
  - 5 drills (4.20, 4.30, 5.11, 5.20, 5.30) → **6 items, 2 listen** / 6, 0.
  - 3 compressed (4.04, 4.10, 5.27) → **3 items, 0 listen**, always.
- Practice: every lesson yields **3 or 4** items after the `Math.min(4, …)` cap (compressed → exactly 3, everything else → 4). Never below 3.
- Step counts: 44 lessons → 5 steps; the 8 zero-vocab lessons (3 compressed + 5 drills) → 4 steps. Correct per "vocab step skipped when vocab is empty".
- `grammar.summary/formation/explanation/notes` and `pitfalls` present on all 52 bodies; 24 formations contain `\n`. `bridge` absent on 6 (4.06, 4.13, 4.22, 5.06, 5.13, 5.22) — the panel is correctly omitted there.

---

## 4. Live browser verification (observed values)

Environment: `preview_start {name:"korean-v2"}` reused the running server on port 8734. Placeholder SW unregistered (1 registration), `kov2.*` cleared, hard navigation with a cache-buster.

This browser has **no ko-KR voice** (`hasKorean() === false`, 4 voices, 0 Korean). For the listen-path tests a **genuine `SpeechSynthesisVoice` instance** with its `lang` shadowed to `"ko-KR"` was returned from a patched `getVoices()` — so `u.voice = v` type-converts cleanly and the console stays clean (see §5).

### `/learn` list, clean store
```
intro:        "TTMIK Levels 4–5 · 0 of 52 lessons done · 8 already known from Anki"
levelHeads:   ["Level 4 0 / 23 done", "Level 5 0 / 29 done"]
totalRows:    60
known:        8      (all DIV, class "lrow known", text "… known from Anki", no .lcando)
lockedDivs:   51     (DIV, aria-disabled="true", hasHref=false, no .lcando)
anchorRows:   1      -> ["#/learn/4.01"]   <-- only ONE anchor across all 60 rows
current row:  "▶ 4.01 … up next  I can say that as one thing increases…" (.lcando present)
```
Known and locked rows are `<div>` with no `href` — genuinely not clickable/focusable.

### `/learn` after completing 4.01
```
intro:        "TTMIK Levels 4–5 · 1 of 52 lessons done · 8 already known from Anki"
levelHeads:   ["Level 4 1 / 23 done", "Level 5 0 / 29 done"]
doneRow:      "✓ 4.01 The more..., the more... -(으)면 -(으)ㄹ수록 best 100% …"  href=#/learn/4.01
currentRow:   "▶ 4.03 It can't be ... -(으)ㄹ 리가 없다 up next …"  href=#/learn/4.03
anchors: 2   locked: 50   known: 8   (= 60)
```

### Lesson 4.01 — grammar step
```
stepno: "Step 1 / 5 · Grammar"      dots: 5
cards:  ["Grammar point","Formation","How it works","Common mistakes","You already know these"]
pitfalls: 4 <li>
.formation: white-space = "pre-line", text contains "\n", renders as 10 wrapped lines
bridge: 2 items, each ko + resolved en + 🔊
  "TTMIK으로 공부하면, 재미있어요." -> "If {you} study using TTMIK, it's fun. …"  spk=true
  "리모콘을 찾으면, TV를 볼 수 있어요." -> "{You} can watch TV if {you} find the remote. …"  spk=true
crumb: "← Syllabus  Level 4 Lesson 1"
```
Vocab step: 8 `.vcard`, 8 🔊, 8 `.tag` (pos); sample `"성장하다 / seong-jang-ha-da / 🔊 / to grow, to develop verb / of a person, plant, or company"`.
Examples step: 7 cards, 7 🔊; sample includes ko + romaji + en.

### Lesson 4.01 — quiz, first completion at 88%
Item roster over a full 8-item round (captured on the retry, same item set):
```
["type","type","type:sent","listen","listen","type:sent","type","type"]
=> 8 items: 4 typed vocab + 2 sentence translations + 2 listen   ✔ spec
```
After finishing 7/8 (one deliberate wrong on a sentence item):
```
score card:  "88%" / "7 of 8 correct" / button "Retry the quiz"
kov2.lessons: {"4.01":{"step":3,"done":true,"best":88,
                       "srs":{"st":"learn","step":1,"ef":2.5,"due":1784973152438}}}
kov2.days:    {"2026-07-25":{"right":7,"wrong":1,"done":[]}}
kov2.weak:    {"한국어는 공부하면 공부할수록 재미있어요.":
                 {"en":"The more I study Korean, the more fun it is.","kind":"quiz"}}
```
`srs` is byte-for-byte `schedule(null, 2, now)` (`js/srs.js:41` → `learning(1, 10, 2.5, now)`). `done: []` preserved in the day record. Wrong answer showed `res.diffHtml` with both `.ans .d-miss` and `.yours .d-bad` spans.

### Re-completion — `best` monotonic, `srs` frozen
```
retry @ 100%:  best 88 -> 100,  srs UNCHANGED (due 1784973152438, st learn, step 1)  srsIdentical=true
               days -> {"right":15,"wrong":1,"done":[]}
retry @ 0%  :  score "0%" / "0 of 8 correct"
               best STILL 100 (not lowered),  srs.due STILL 1784973152438
               days -> {"right":15,"wrong":9,"done":[]}
               weak -> 8 entries, all kind:"quiz"; every wrong item rendered a diff
```
Syllabus afterwards still shows **`best 100%`** on the 4.01 row.

### Practice step (4.01)
```
stepno: "Step 5 / 5 · Practice"     next button label: "Finish ✓"
header: "Practice 1 / 4"            items: 4, all kind "blank"
display: "한국어는 공부하면 ____ 재미있어요."   english below: "The more I study Korean, the more fun it is."
score:   "75%" / "3 of 4 correct"   retry button "Practice again"
kov2.days  -> {"right":18,"wrong":10,"done":[]}
kov2.weak  -> adds {"많을수록":{"en":"The more people there are, the better.","kind":"practice"}}
kov2.lessons["4.01"] -> step 4; done/best/srs UNCHANGED by practice
```

### Quiz shape per lesson type
With a ko-KR voice present:
```
4.20 (drill,      0 vocab, 6 sents):  "Question 1 / 6 · sentence"  6 items, 2 listen
                                       kinds: [listen,type,type,listen,type,type]
                                       steps: ["Step 1 / 4 · Grammar","Step 2 / 4 · Examples","Step 3 / 4 · Quiz"]  dots 4
4.04 (compressed, 0 vocab, 3 sents):  "Question 1 / 3 · sentence"  3 items, 0 LISTEN  <-- no listen despite a voice
                                       kinds: [type,type,type]                        dots 4
4.01 (normal)                      :  8 items, 2 listen
```
With the voice removed (`hasKorean() === false`):
```
4.30 (drill): "Question 1 / 6 · sentence"  6 items, 0 listen, kinds all "type"  (typed substitutes, length kept)
5.01 grammar step: 0 [data-ko] elements    5.01 vocab step: 0 [data-ko] elements  (8 cards, all 🔊 suppressed)
```

### Not-found / known deep links — no crash
```
#/learn/4.02  -> h1 "Learn" + card "No lesson here / Lesson 4.02 is marked known from your Anki decks,
                 so it has no player. / Back to the syllabus"   (no .crumb, no .stephead)
#/learn/9.99  -> h1 "Learn" + card "No lesson here / There is no lesson 9.99. / Back to the syllabus"
Leaving either card: speechSynthesis.cancel() called exactly 1x  -> teardown IS returned on these paths
#/learn/<img src=x onerror=alert(1)>  -> rendered escaped inside <code>, 0 <img> elements created
```

### Teardown
Navigating from a live lesson to `#/learn` fired `speechSynthesis.cancel()` **exactly once** (counted via a wrapper). Same for both no-lesson cards.

### Resume
Reopening `#/learn/4.01` after reaching practice landed on **`"Step 5 / 5 · Practice"`**.

### Screenshot / layout
**A screenshot was attempted and TIMED OUT** — `screenshot failed: Screenshot timed out after 5s: the Browser pane is not displayed, so the page is not compositing frames.` Substituted computed-layout checks at 375×812 (`resize_window {preset:"mobile"}`):
```
no horizontal overflow on any surface: documentElement.scrollWidth === 375 === innerWidth
  /learn list, 5.13 grammar, vocab, examples, quiz, 5.14 vocab-with-speakers
  scan of every #view descendant for getBoundingClientRect().right > innerWidth: 0 hits on every page
.formation (5.13):  scrollWidth 301 === clientWidth 301  (no clipped pattern text)
row heights (60):   min 70px, max 131px, 0 under 44px;  tappable rows 125px
controls:           #qin 301×49, #act 301×48, #prev 168×48, #next 166×48
nav links:          94×59 each
🔊 .spk buttons:     49×40   <-- 40px tall, see polish item P1
```

### Console
`read_console_messages` returned **only leftovers from the implementer's own session** — ~20 `[warn] TTS failed: TypeError: Failed to set the 'voice' property … Failed to convert value to 'SpeechSynthesisVoice'`, with stack frames naming `window.__roster` (their driver) and, on the older entries, pre-`a758c6a` line numbers (`lesson.js:312/346/373/410`). **Zero new messages were produced by this review's run**, because a genuine voice object was injected rather than a synthetic one. That confirms those warnings are an artifact of a fake voice object, not a defect: `js/tts.js:47` assigns `u.voice = koVoice`, which throws only when `koVoice` isn't a real `SpeechSynthesisVoice`, and `speak()` already catches and warns. No 404s, no module-load errors, no uncaught exceptions.

---

## 5. Polish / non-blocking observations

**P1 — 🔊 tap target is 40px, below the 44px guideline.** `css/style.css:170` sets `.spk { min-height: 40px; }` while the app's own `.btn` renders at 48px. Measured 49×40. Bump to `min-height: 44px`.

**P2 — a locked lesson is fully playable via a direct hash.** `#/learn/5.30` (locked, 50 rows deep) rendered `"Step 1 / 4 · Grammar"` with `#stepbody` present, and `saveStep` wrote `{"5.30":{"step":0}}` to `kov2.lessons`. The spec only constrains the syllabus row, so this isn't a violation — but the gate is presentation-only, and merely opening a locked lesson leaves a storage record. Consider having `renderLesson` re-check the chain, or at least not calling `saveStep` until the learner advances past step 1.

**P3 — content bug in `content/lessons/l5.js` (outside the reviewed files).** 5.18's sentence `"그 사람이 오는지 안 오는지 몰라요."` has `blankWord: "오는지"`, which occurs twice; `String.prototype.replace` with a string needle replaces only the first, so practice renders `"그 사람이 ____ 안 오는지 몰라요."` — the answer is still visible. This is the only such case in all 52 lessons (checked every sentence: 0 missing/invalid `blankWord`, 0 where `blankWord === ko`). Fix the content, or use `split(blankWord).join("____")` in `lesson.js:192`.

**P4 — dead `MARK.known` entry.** `js/views/syllabus.js:49` defines `known: ""` but the known-row template at line 56 hardcodes `·`, so the map entry is never read. Cosmetic.

**P5 — quiz retry reuses the same items.** `runner`'s retry does `cfg.items = shuffle(cfg.items)` (`lesson.js:298`) rather than rebuilding from the body, so a second attempt re-asks the same 8 items in a new order. Not required either way by the spec, and it makes the "re-complete at a different score" flow deterministic — noting it only so it isn't mistaken for a bug later.

Also noted, not a defect: the `/learn` list path returns no cleanup function (`syllabus.js:19` calls `renderSyllabus` without returning). Correct — the list has no TTS, and the router cancels the *previous* view's audio before rendering it, which was verified live (1 cancel on leaving a lesson).

## 6. Cleanup

All `kov2.*` localStorage keys were removed at the end of the review; the app was left with no stored progress.
