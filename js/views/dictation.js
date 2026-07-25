// js/views/dictation.js — listening practice over content/ttmik-sentences.js,
// the 1,596 sentences already studied in Anki (so the meaning is known and the
// only new work is the ear).
//
// One route, three screens (library / drill / summary) held in closure state, as
// in cards.js — moving between them must NOT push a hash, or Back would walk
// back through every item of the round.
//
// Two rules this file exists to enforce:
//   1. The Korean is never in the DOM before the answer is submitted. That means
//      the pre-submit audio controls CANNOT use the data-ko attribute pattern
//      spk() uses elsewhere — they call speak() through the closure instead.
//      Anything rendered before submit must be ko-free.
//   2. Sentence identity is the INDEX into TTMIK_SENTENCES (not the text). The
//      index is what today's day.dict array stores, what the 3-day repeat window
//      reads back, and what Task 11's Today flow will look at to see whether a
//      dictation round happened today.
import { register as route } from "../router.js";
import { TTMIK_SENTENCES } from "../../content/ttmik-sentences.js";
import { store } from "../store.js";
import { grade } from "../grader.js";
import { speak, hasKorean, cancel as cancelSpeech } from "../tts.js";

const ROUND_LENGTHS = [5, 10];
const MAX_REPLAYS = 3;      // deliberate replays per item, on top of the auto-play
const SLOW_RATE = 0.7;      // fixed — the slow pass ignores the settings rate
const WINDOW_DAYS = 3;      // today + the 2 previous days are excluded from a round

// ------------------------------------------------------------------- pools

// TTMIK level = the part of `lesson` before the dot ("2.17" → "2"). A few
// sentences carry lesson "" — they have no level, so only "all" offers them.
function levelOf(s) {
  const m = /^(\d+)\./.exec((s && s.lesson) || "");
  return m ? m[1] : "";
}

// The level filters the library offers. Fixed, not derived: the Anki export also
// carries a handful of stray lesson ids from levels 6 and 10 (8 sentences all
// told), too few to be worth a filter of their own — they are still dictated,
// under "All".
const LEVELS = ["1", "2", "3"];

// Not every note in the bank is dictatable. 222 of the 1,596 are unusable here,
// for two separate reasons.
//
// 1. Grammar REFERENCE cards rather than sentences — "일 [Sino-Korean #]",
//    "(noun)~은", "~아요 [Conjugation: present tense]", "# 대 [counter]". Read
//    aloud, the English annotation is spoken too and the learner would have to
//    type it back verbatim to pass. Rejected via brackets, parentheses, latin
//    letters, and the # * / ~ markers.
//
// 2. Anything containing an Arabic NUMERAL. TTS reads "1번" as "일번", so the
//    learner types 일번 and grade() fails them against a key that literally holds
//    "1" — normalize() does not touch digits. 25 notes are affected: 18 real
//    sentences ("1번 출구로 나오세요.") plus 7 that print both forms in one field
//    ("1초 일초", "아직 9 시예요. 아직 아홉시예요."), which TTS reads end to end.
//    Digits and ":" are therefore rejected too. Spelled-out numbers (아홉 시) are
//    unaffected and stay in the pool.
//
// That leaves 1,374 real sentences (237 / 563 / 565 for levels 1-3).
//
// Cost of being this blunt: exactly 2 genuine sentences are lost to the latin
// rule — "리모콘을 찾으면, TV를 볼 수 있어요." and "문맥에 따라(서) 달라요." — where the
// latin is real content, not an annotation. Not worth an exception list.
//
// This filter is deliberately LOCAL to dictation: the bank itself stays a
// faithful record of the deck, and lesson bridge panels still reference any note
// by exact text (101 bridges, 3 of them pointing at latin-carrying `ko`).
const NOT_DICTABLE = /[[\]{}()A-Za-z#*/~0-9:]/;
function dictable(s) {
  return !!s && !!s.ko && /[가-힣]/.test(s.ko) && !NOT_DICTABLE.test(s.ko);
}

let poolCache = null;
function pools() {
  if (poolCache) return poolCache;
  const all = [], by = {};
  LEVELS.forEach(l => { by[l] = []; });
  TTMIK_SENTENCES.forEach((s, i) => {
    if (!dictable(s)) return;
    all.push(i);
    const l = levelOf(s);
    if (by[l]) by[l].push(i);
  });
  poolCache = { all, by };
  return poolCache;
}

// Filter keys, in the order the library shows them.
export function filters() {
  return LEVELS.concat(["all"]);
}
export function poolFor(filter) {
  const p = pools();
  return filter === "all" ? p.all : (p.by[filter] || []);
}

// ------------------------------------------------------------- day bookkeeping

function dayKey(t) {
  const p = n => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
}

// Every index dictated in the last WINDOW_DAYS calendar days (today included),
// read straight off days[*].dict. These are skipped when sampling a round.
export function recentIndexes() {
  const days = store.days();
  const now = new Date();
  const seen = new Set();
  for (let d = 0; d < WINDOW_DAYS; d++) {
    const t = new Date(now.getFullYear(), now.getMonth(), now.getDate() - d);
    const rec = days[dayKey(t)];
    if (rec && Array.isArray(rec.dict)) rec.dict.forEach(i => seen.add(i));
  }
  return seen;
}

// Uniform sample of `n` indexes from the filter's pool, skipping anything
// dictated in the last 3 days. When too few remain, repeats are allowed rather
// than serving a short round (or blocking it).
export function sampleRound(filter, n) {
  const pool = poolFor(filter);
  if (!pool.length) return [];
  const skip = recentIndexes();
  const fresh = pool.filter(i => !skip.has(i));
  const bag = fresh.slice();
  const out = [];
  while (out.length < n && bag.length) {
    out.push(bag.splice(Math.floor(Math.random() * bag.length), 1)[0]);
  }
  if (out.length < n) {
    const src = fresh.length ? fresh : pool;      // nothing fresh at all: reuse the pool
    while (out.length < n) out.push(src[Math.floor(Math.random() * src.length)]);
  }
  return out;
}

// One answered item: retention counters + the index in today's dict array, plus
// the weak list on a miss (keyed by the sentence itself, like lesson.js).
export function logItem(ok, idx, ko, en) {
  const key = dayKey(new Date());
  const day = store.days()[key] || { right: 0, wrong: 0, done: [] };
  if (!Array.isArray(day.done)) day.done = [];      // never clobber lesson completions
  if (!Array.isArray(day.dict)) day.dict = [];
  if (ok) day.right = (day.right || 0) + 1;
  else day.wrong = (day.wrong || 0) + 1;
  if (day.dict.indexOf(idx) < 0) day.dict.push(idx);
  store.setDay(key, day);
  if (!ok) {
    const w = store.weak();
    w[ko] = { en: en || "", kind: "dictation" };
    store.setWeak(w);
  }
}

// --------------------------------------------------------------------- view

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

export function register() {
  route("/practice/dictation", mount => renderDictation(mount));
}

function renderDictation(mount) {
  let filter = "all";
  let roundLen = ROUND_LENGTHS[0];
  let queue = [];            // indexes into TTMIK_SENTENCES
  let pos = 0;
  let replays = 0;           // used replays on the current item
  let slowUsed = false;
  let answered = false;
  let result = null;         // grade() result for the current item
  let typed = "";            // the learner's submitted answer (for the diff)
  let log = [];              // [{idx, ok}] for the summary
  let timer = null;          // auto-play tick

  const voice = hasKorean();

  function say(text, rate) {
    if (!voice) return;
    speak(text, rate);
  }
  function clearTimer() {
    if (timer) { clearTimeout(timer); timer = null; }
  }

  // ---- library
  function drawLibrary() {
    const p = pools();
    const chips = filters().map(f => `
      <button class="btn ghost chip${f === filter ? " on" : ""}" type="button" data-f="${esc(f)}"
              aria-pressed="${f === filter}">
        ${f === "all" ? "All" : "Level " + esc(f)}
        <span class="chipn">${poolFor(f).length}</span>
      </button>`).join("");
    const lens = ROUND_LENGTHS.map(n => `
      <button class="btn ghost chip${n === roundLen ? " on" : ""}" type="button" data-n="${n}"
              aria-pressed="${n === roundLen}">${n}</button>`).join("");

    mount.innerHTML = `
      <h1>Dictation</h1>
      <p class="muted small">Listen and type. Every sentence here is one you already
        studied in your Anki deck — ${p.all.length} of them — so you know the meaning;
        the work is hearing it.</p>
      ${voice ? "" : `
      <div class="card">
        <h4>No Korean voice</h4>
        <p class="fb bad">Dictation needs a Korean text-to-speech voice installed.</p>
        <p class="muted small">There is no point typing what you cannot hear. Install a
          Korean voice in your system speech settings (or open this app in a browser that
          ships one), then come back.</p>
      </div>`}
      <div class="card">
        <h4>Level</h4>
        <div class="chiprow">${chips}</div>
        <h4 class="spaced">Sentences per round</h4>
        <div class="chiprow">${lens}</div>
        <button class="btn wide" type="button" id="start" ${voice ? "" : "disabled"}>
          Start ${roundLen}-sentence round</button>
        <p class="muted small">Sentences you dictated in the last ${WINDOW_DAYS} days are skipped.</p>
      </div>`;

    mount.querySelectorAll("[data-f]").forEach(b => b.addEventListener("click", () => {
      filter = b.getAttribute("data-f"); drawLibrary();
    }));
    mount.querySelectorAll("[data-n]").forEach(b => b.addEventListener("click", () => {
      roundLen = parseInt(b.getAttribute("data-n"), 10) || ROUND_LENGTHS[0];
      drawLibrary();
    }));
    const start = mount.querySelector("#start");
    if (start) start.addEventListener("click", startRound);
  }

  function startRound() {
    if (!voice) return;
    queue = sampleRound(filter, roundLen);
    if (!queue.length) return;                 // empty pool: stay on the library
    pos = 0; log = [];
    newItem();
  }

  function newItem() {
    replays = 0; slowUsed = false; answered = false; result = null; typed = "";
    drawDrill();
    // Auto-play once, on the next tick — the utterance is queued after the
    // browser has painted the new item.
    clearTimer();
    timer = setTimeout(() => { timer = null; say(sent().ko, store.settings().ttsRate); }, 120);
  }

  function sent() { return TTMIK_SENTENCES[queue[pos]] || { ko: "", en: "" }; }

  // ---- drill
  function drawDrill() {
    const s = sent();
    const right = log.filter(l => l.ok).length;
    const wrong = log.length - right;

    // PRE-SUBMIT: nothing below may contain s.ko, in any attribute or text node.
    const controls = `
      <div class="navrow dictrow">
        <button class="btn secondary" type="button" id="replay" ${replays >= MAX_REPLAYS ? "disabled" : ""}>
          🔊 Replay${replays ? ` (${MAX_REPLAYS - replays} left)` : ""}</button>
        <button class="btn secondary" type="button" id="slow" ${slowUsed ? "disabled" : ""}>
          🐢 Slow</button>
      </div>`;

    const after = answered ? `
      <div class="fb ${result.ok ? "ok" : "bad"}">${result.ok ? "✓ Correct" : "✗ Not quite"}</div>
      ${result.ok ? "" : result.diffHtml}
      <div class="dictreveal">
        <div class="vrow">
          <div class="ko big grow">${esc(s.ko)}</div>
          <button class="btn ghost spk" type="button" id="rspk" aria-label="Play Korean audio">🔊</button>
        </div>
        <div class="ven">${esc(s.en)}</div>
        ${s.lesson ? `<div class="muted small">TTMIK ${esc(s.lesson)}</div>` : ""}
      </div>` : "";

    mount.innerHTML = `
      <h1>Dictation</h1>
      <div class="cbar">
        <span class="tag">${filter === "all" ? "All levels" : "Level " + esc(filter)}</span>
        <span class="grow"></span>
        <span class="muted small">${pos + 1} / ${queue.length}</span>
        <span class="csep">·</span>
        <span class="cc due">${right}</span><span class="csep">/</span><span class="cc learn">${wrong}</span>
      </div>
      <div class="card">
        <h4>Listen and type what you hear</h4>
        ${controls}
        <textarea class="tinput dictta" id="dta" rows="2" autocomplete="off" autocapitalize="off"
                  spellcheck="false" aria-label="What you heard, in Korean"
                  ${answered ? "disabled" : ""}>${esc(typed)}</textarea>
        <p class="muted small">Enter makes a new line · Ctrl/⌘+Enter submits</p>
        ${after}
        <div class="navrow">
          ${answered
            ? `<button class="btn wide" type="button" id="next">${pos + 1 >= queue.length ? "See score" : "Next sentence"}</button>`
            : `<button class="btn wide" type="button" id="submit">Check</button>`}
        </div>
      </div>
      <div class="navrow"><button class="btn secondary" type="button" id="quit">← Library</button></div>`;

    const ta = mount.querySelector("#dta");
    ta.addEventListener("focus", () => {
      // keep the box clear of the on-screen keyboard
      try { ta.scrollIntoView({ block: "center", behavior: "smooth" }); } catch { ta.scrollIntoView(); }
    });
    ta.addEventListener("keydown", e => {
      if (e.key !== "Enter" || e.isComposing) return;     // never submit mid-IME-composition
      if (!(e.ctrlKey || e.metaKey)) return;              // plain Enter = newline
      e.preventDefault();
      submit();
    });

    mount.querySelector("#replay").addEventListener("click", () => {
      if (replays >= MAX_REPLAYS) return;
      replays++;
      say(sent().ko, store.settings().ttsRate);
      const btn = mount.querySelector("#replay");
      btn.textContent = `🔊 Replay${replays ? ` (${MAX_REPLAYS - replays} left)` : ""}`;
      if (replays >= MAX_REPLAYS) btn.disabled = true;
    });
    mount.querySelector("#slow").addEventListener("click", () => {
      if (slowUsed) return;
      slowUsed = true;
      mount.querySelector("#slow").disabled = true;
      say(sent().ko, SLOW_RATE);
    });

    const sub = mount.querySelector("#submit");
    if (sub) sub.addEventListener("click", submit);
    const nxt = mount.querySelector("#next");
    if (nxt) { nxt.addEventListener("click", advance); nxt.focus(); }
    const rspk = mount.querySelector("#rspk");
    if (rspk) rspk.addEventListener("click", () => say(sent().ko, store.settings().ttsRate));

    mount.querySelector("#quit").addEventListener("click", () => {
      clearTimer(); cancelSpeech();
      drawLibrary(); window.scrollTo(0, 0);
    });
  }

  function submit() {
    if (answered) return;
    const ta = mount.querySelector("#dta");
    typed = ta ? ta.value : "";
    const s = sent();
    result = grade(s.ko, typed);
    answered = true;
    clearTimer(); cancelSpeech();
    logItem(result.ok, queue[pos], s.ko, s.en);
    log.push({ idx: queue[pos], ok: result.ok });
    drawDrill();
  }

  function advance() {
    cancelSpeech();
    if (pos + 1 >= queue.length) { drawSummary(); window.scrollTo(0, 0); return; }
    pos++;
    newItem();
    window.scrollTo(0, 0);
  }

  // ---- summary
  function drawSummary() {
    const right = log.filter(l => l.ok).length;
    const total = log.length;
    const pct = total ? Math.round((right / total) * 100) : 0;
    mount.innerHTML = `
      <h1>Dictation</h1>
      <div class="card center">
        <h4>Round complete</h4>
        <div class="score">${pct}%</div>
        <p class="muted">${right} of ${total} correct</p>
      </div>
      <div class="card">
        <h4>What you heard</h4>
        ${log.map(l => {
          const s = TTMIK_SENTENCES[l.idx] || { ko: "", en: "" };
          return `
          <div class="drow${l.ok ? " ok" : " bad"}">
            <span class="mark">${l.ok ? "✓" : "✗"}</span>
            <div class="grow">
              <div class="ko">${esc(s.ko)}</div>
              <div class="muted small">${esc(s.en)}</div>
            </div>
            <button class="btn ghost spk" type="button" data-i="${l.idx}" aria-label="Play Korean audio">🔊</button>
          </div>`;
        }).join("")}
      </div>
      <div class="navrow">
        <button class="btn" type="button" id="again">Another round</button>
        <button class="btn secondary" type="button" id="lib">Library</button>
      </div>`;
    mount.querySelectorAll("[data-i]").forEach(b => b.addEventListener("click", () => {
      const s = TTMIK_SENTENCES[parseInt(b.getAttribute("data-i"), 10)];
      if (s) say(s.ko, store.settings().ttsRate);
    }));
    mount.querySelector("#again").addEventListener("click", () => { cancelSpeech(); startRound(); window.scrollTo(0, 0); });
    mount.querySelector("#lib").addEventListener("click", () => {
      cancelSpeech(); drawLibrary(); window.scrollTo(0, 0);
    });
  }

  drawLibrary();
  // Router teardown: kill the pending auto-play and stop any utterance.
  return () => { clearTimer(); cancelSpeech(); };
}
