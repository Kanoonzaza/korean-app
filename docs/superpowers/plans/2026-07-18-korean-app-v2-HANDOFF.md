# Korean App v2 — Execution Handoff (for any fresh session)

**Written:** 2026-07-20 by the planning session (Fable), for continuation by a fresh
session (any model) after a usage-limit cutoff. Read this FIRST, then the plan.

**The governing documents, in priority order:**
1. This handoff (current state + binding amendments)
2. `2026-07-18-korean-app-v2-BRAINDUMP.md` (same folder) — **grammar cribs for every
   remaining lesson, behavioral rulings for Tasks 7–11, and per-task review focus.
   Written by the planning model; use it as the review key and nuance tie-breaker.**
3. `docs/superpowers/plans/2026-07-18-korean-app-v2.md` (the task-by-task plan)
4. `docs/superpowers/specs/2026-07-18-korean-app-v2-design.md` (the approved design)

**Repo:** `C:\Users\HP\Claude work\Korean\korean-learning-app`, branch **`v2`**.
v1 app preserved read-only in `v1/` (deleted only in plan Task 12).
**Do NOT push to GitHub** — the user pushes when ready. Merge v2→main only at plan
Task 12 after full verification.

---

## 1. Where the build stands

Plan Tasks **0–5 are COMPLETE** (implemented + spec-reviewed + quality-reviewed +
all review fixes landed). Commits on `v2`, oldest first:

```
ac3c9cd chore: move v1 app into v1/ for v2 rebuild            (Task 0)
5ccf13b feat: Anki export pipeline -> known.js + ttmik-sentences.js  (Task 1)
e30cf00 refactor: importable helpers in build_from_anki       (Task 1 fix)
d195d08 feat: wordsnext reconcile mode - excludes TTMIK words (Task 2)
d0a62f3 chore: block crude refill words                       (Task 2 fix)
f6b1c55 chore: harden wordsnext reconcile (...)               (Task 2 fix)
353dc8a feat: verified TTMIK L4-5 curriculum with dedup statuses (Task 3)
c353dab fix: curriculum audit note for 4.12 + strict-JSON array  (Task 3 fix)
88cbadd docs: curriculum audit note for 4.02 + corpus-growth note (Task 3 fix)
465c378 feat: v2 shell - router, store, tab bar, theme        (Task 4)
c6de12d fix: router teardown + unknown-route fallback + shell cleanups (Task 4 fix)
5778031 feat: shared SRS scheduler, grader, TTS modules       (Task 5)
510fe85 fix: grader forgives commas (v2 deviation for TTS dictation) (Task 5 fix)
5b97709 docs: engine contracts + diff styles                  (Task 5 fix)
```

**Task 6 (ALL lesson content) is COMPLETE.** `content/lessons/l4.js` (23 bodies)
and `content/lessons/l5.js` (29 bodies) cover every non-known TTMIK L4–5 lesson:
52 bodies, 308 unique vocab, validation clean (vocab leakage, exact bridges,
blankWord substrings); deck reconciled to 2,481 words with zero leakage vs
known.js or any lesson vocab.

Content-batch reviews live in `docs/superpowers/plans/reviews/` — 6A (4.01–4.15)
and 6B (4.16–4.30) are reviewed and accepted. **Level 5 (5.01–5.30) has NOT had a
spec review yet** — run one against BRAINDUMP Part A cribs + Part D gold blocks
and commit findings there. Content batches use the spec review as the deep review;
a separate code-quality pass on lesson data files is not required.

NOTE for future content work: background subagents repeatedly died mid-stream
(session limits, stream watchdog) when generating long Korean lesson files — four
attempts on 5.16–5.30 failed. What worked: the controller authored them inline in
~4-lesson chunks written to scratchpad JSON files, then merged them into the
lesson file with a short Python script. Prefer that over one big subagent dispatch.

Also landed: tier-B REFILL is now DISABLED in `tools/build_wordsnext.py` (corpus
quality exhausted at rank ~7500 — two refill waves produced only proper nouns,
loanword fragments and mis-glossed rarities). The deck only shrinks as lessons
absorb words; the BLOCK list was extended accordingly.

**Remaining:** plan Tasks 7-12 exactly as written, amended by section 2 below and
by BRAINDUMP Part B (behavioral rulings) / Part C (per-task review focus).

## 2. Binding amendments made during execution (override the plan where they conflict)

These decisions were made controller-side during Tasks 1–6 and are already
implemented. Later tasks MUST respect them.

1. **`tools/build_from_anki.py`** exposes importable helpers (`rows_of`,
   `strip_html`, `as_single_word`, `js_module`, `TTMIK_TXT`, `CORE_TXT`) under a
   `main()` guard. Any tool needing the single-word rule imports it — never
   re-derives it.
2. **`tools/build_wordsnext.py` is a RECONCILE tool now** (the plan's Step 2.5
   assumption was wrong — BLOCK/MY_GLOSS never lived in the tool). Behavior:
   base = previous committed `content/wordsnext.js` (fallback `v1/content/wordsnext.js`);
   drop base entries now in the known set (Core5k ∪ TTMIK ∪ v1 lessons/words5k ∪
   `V2_LESSON_FILES` vocab) or 하다/되다 derivatives of known bases; refill tail
   via tier-B generation to the base's size (2,524); renumber r=5001+. Kept
   entries preserve glosses verbatim (that IS the curation). Guards: zero-match
   lesson file → SystemExit; base <1000 entries → SystemExit; refill shortfall →
   loud WARNING. BLOCK list includes 4 crude words (병신/콜걸/포르노/바카라) —
   extend it rather than hand-editing the deck. **Task 6 batches must append
   each new lesson file to `V2_LESSON_FILES` and rerun the tool** (this shrinks
   the deck only if lesson vocab collides; normally kept 2524/dropped 0).
3. **`content/curriculum.js`**: 60 lessons (4.01–4.30, 5.01–5.30), statuses
   49 new / 8 known / 3 compressed. Two documented judgment calls in its header:
   4.02 = "known" via forward tag; 4.12 = "new" despite a stray cross-ref tag.
   When later extending to Level 6+, the dedup corpus must grow to all
   previously-studied levels (header notes this). Strict-JSON array (no trailing
   comma) — keep it that way; tooling json.loads() it.
4. **Router conventions** (`js/router.js`): static-prefix matching ONLY — dynamic
   segments (e.g. `/learn/4.01`) are handled as the `params` tail under a single
   registered prefix (`/learn` is registered by `js/views/syllabus.js`; the
   lesson player renders via that route's params — do NOT register `/learn/<id>`).
   A view's `render()` may return a **cleanup function**; the router calls it
   before the next render — any view starting TTS/timers/audio MUST return one.
   Unknown hashes render a built-in "Page not found" card.
5. **Engines** (`js/srs.js`, `js/grader.js`, `js/tts.js`): pure ES modules.
   `schedule(cur, g, now)` — `now` injected; new card = `cur: null`; persist the
   returned state verbatim; never hand-construct states. Grader deviates from v1
   deliberately: commas (`,` `、`) are stripped in normalization (TTS dictation
   rationale — documented in its header); diff CSS classes (.d-miss/.d-bad/.ans/
   .yours) are styled in `css/style.css`. `speak(text, rate=0.92)`; gate 🔊 UI
   with `hasKorean()` (speak() itself falls back to a default voice).
6. **Lesson files** (`content/lessons/l4.js`, later `l5.js`): JSON-compatible
   syntax (double quotes, no trailing commas). Schema and hard authoring rules
   are in plan Task 6 — the critical ones: bridge sentences copied EXACTLY from
   `ttmik-sentences.js` (render-time en lookup + validation depend on it); vocab
   must pass the leakage check (not in known.js, not in earlier lessons);
   "known"-status lessons get NO body; compressed lessons carry
   `"compressed": true`; per-lesson verification source URLs in the file header.
7. **Store** (`js/store.js`): accessors return fresh parses — read-modify-write
   via setters only; `setDay(dateKey, v)` exists for the hot path. Backup =
   exportAll/importAll (JSON), no cloud sync in v2.

## 3. Execution workflow (how the completed tasks were run — continue the same way)

Subagent-driven development, one plan task at a time, **sequential (never two
implementers in parallel — same repo)**:

1. **Dispatch a fresh implementer subagent** (model: Opus) with the FULL task
   text from the plan pasted in + context + the relevant §2 amendments. Don't
   make it read the plan file. Background dispatch is fine; resume a limit-killed
   agent with a recap message rather than re-dispatching cold.
2. Implementer implements, verifies, commits, self-reviews, reports
   (DONE / DONE_WITH_CONCERNS / BLOCKED / NEEDS_CONTEXT). Address concerns
   before review; BLOCKED → fix the input, don't force.
3. **Spec-compliance review** by a fresh subagent: paste the requirements
   (task + amendments), tell it to verify EVERYTHING independently (rerun
   scripts, re-diff, re-drive the browser) and distrust the report.
4. **Code-quality review** by a fresh subagent (only after spec passes):
   strengths/issues(Critical|Important|Minor)/assessment.
5. Reviewer issues → send back to the SAME implementer agent to fix → re-verify.
   Trivial fully-specified fixes may be applied by the controller directly.
6. Mark the task done; next task.

After ALL plan tasks: final whole-app review subagent, then plan Task 12's
switchover (merge v2→main, no push). Also update `MEMORY.md`/memory files per
the memory instructions if notable durable facts emerged.

## 4. Environment gotchas (all bit us at least once)

- **Windows console is cp1252**: ALWAYS `python -X utf8` — bare `python` crashes
  printing Korean.
- Anki exports live at `C:\Users\HP\Claude work\Korean\anki-korean-deck\`
  (READ-ONLY inputs: `TTMIK Supplement.txt`, `Korean Core 5k - English to Korean.txt`).
- Preview server: `.claude/launch.json` name `korean-v2` → `python -m http.server 8734`
  at repo root. python http.server sends no Cache-Control and a placeholder
  `sw.js` controls the page → after JS edits, hard-refresh (Ctrl+Shift+R) or
  unregister the SW in DevTools, or modules stay stale. (Task 12 replaces the SW.)
- `preview_start` resolves launch configs from the agent's **cwd** (`C:\Users\HP`),
  NOT the repo — so the repo's own `.claude/launch.json` is invisible and
  `korean-v2` errors as "not found". A duplicate `korean-v2` entry (port 8734,
  `--directory` at the repo) now lives in the global `C:\Users\HP\.claude\launch.json`;
  keep both in sync.
- Git LF→CRLF warnings on commit are cosmetic — ignore.
- Session limits kill long subagents mid-task; their edits survive on disk.
  `git status` + the task's own report tell you what landed. Resume via a recap
  message to the same agent when possible.
- Throwaway validation scripts go in the session scratchpad, NEVER committed.
- Commit messages: end with `Co-Authored-By: Claude <model> <noreply@anthropic.com>`.

## 5. Definition of done (unchanged from the plan)

Every plan task through Task 12, two-stage-reviewed; full manual regression in
the preview (every tab, a lesson walkthrough, cards, dictation, reading, backup
export/import, offline reload); v1/ deleted; README/ROADMAP rewritten; v2 merged
to main; NOT pushed (user's call). User progress model: fresh start (user never
used v1).
