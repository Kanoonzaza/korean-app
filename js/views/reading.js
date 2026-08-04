// js/views/reading.js — graded reading passages (content/readings.js) with
// tap-to-gloss words and TOPIK-style comprehension questions.
//
// Ported from v1/js/reading.js. v1 kept passage state in a module singleton and
// let App re-render the whole view after every click; here the house pattern
// applies instead — one route, two screens (list / passage) held in closure
// state, redrawn in place. Moving between them must NOT push a hash, or Back
// would walk back through every question.
//
// Two things this file owns:
//   1. The gloss. Only the FIRST occurrence of each glossary word is wrapped,
//      and the wrap happens on the ESCAPED text so the surrounding passage is
//      never re-escaped (indexes would shift). Tapping shows the meaning in a
//      box under the passage — the same "one gloss at a time" affordance as v1,
//      which keeps the passage itself uncluttered on a phone.
//   2. Scoring. Every answer feeds today's retention counters (right/wrong),
//      and the finished round's percentage is kept per passage as a personal
//      best that is never lowered.
import { register as route } from "../router.js";
import { READINGS } from "../../content/readings.js";
import { store } from "../store.js";
import { speak, hasKorean, cancel as cancelSpeech } from "../tts.js";

const PASS = 70;              // % at or above which a passage counts as passed

function byId(id) {
  return READINGS.find(r => r.id === id) || null;
}

// ------------------------------------------------------------- day bookkeeping

function dayKey(t) {
  const p = n => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
}

// One answered question → today's retention counters. Read-modify-write of the
// whole day record: `done` (lesson completions) and `dict` (dictation indexes)
// live in the same object and must survive untouched.
function logAnswer(ok) {
  const key = dayKey(new Date());
  const day = store.days()[key] || { right: 0, wrong: 0, done: [] };
  if (!Array.isArray(day.done)) day.done = [];
  if (ok) day.right = (day.right || 0) + 1;
  else day.wrong = (day.wrong || 0) + 1;
  store.setDay(key, day);
}

// Personal best per passage, never lowered — a worse retry keeps the old score.
export function saveBest(id, pct) {
  const prev = store.reading()[id];
  const best = Math.max(pct, (prev && prev.best) || 0);
  store.setReading(id, { best });
  return best;
}

// --------------------------------------------------------------------- view

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// Gated on hasKorean(): speak() falls back to a default voice, so the UI decides
// whether a 🔊 control is honest.
function spk(ko, label) {
  if (!hasKorean() || !ko) return "";
  return `<button class="btn ghost spk" type="button" data-ko="${esc(ko)}"
          aria-label="${esc(label || "Play Korean audio")}">🔊</button>`;
}
function say(ko) {
  if (!hasKorean() || !ko) return;
  speak(ko, store.settings().ttsRate);
}

export function register() {
  route("/practice/reading", (mount, params) => renderReading(mount, params));
}

function renderReading(mount, params) {
  let passage = null;         // the open passage, or null on the list screen
  let i = 0;                  // question index
  let correct = 0;
  let phase = "q";            // "q" | "feedback" | "done"
  let chosen = -1;            // option index picked in the feedback phase
  let gloss = null;           // {w, m} currently revealed

  // ---- list screen
  function drawList() {
    passage = null;
    const saved = store.reading();
    const levels = [...new Set(READINGS.map(r => r.level))].sort();
    const sections = levels.map(lv => {
      const rows = READINGS.filter(r => r.level === lv).map(r => {
        const e = saved[r.id];
        const status = e && typeof e.best === "number"
          ? `<span class="rbest${e.best >= PASS ? " pass" : ""}">${e.best >= PASS ? "✓ " : ""}${e.best}%</span>`
          : `<span class="rbest muted">New</span>`;
        return `
          <button class="rrow" type="button" data-id="${esc(r.id)}">
            <span class="grow">
              <span class="rtitle">${esc(r.title)}</span>
              <span class="muted small rblurb">${esc(r.blurb || "")}</span>
            </span>
            ${status}
          </button>`;
      }).join("");
      return `<div class="card"><h4>Level ${esc(String(lv))}</h4>${rows}</div>`;
    }).join("");

    mount.innerHTML = `
      <h1>Reading</h1>
      <p class="muted small">Short graded passages using grammar the lessons have
        covered. Tap a <span class="gw">dotted</span> word for its meaning, listen
        with 🔊, then answer the questions.</p>
      ${sections}
      <div class="navrow"><a class="btn secondary" href="#/practice">← Practice</a></div>`;

    mount.querySelectorAll("[data-id]").forEach(b => b.addEventListener("click", () => {
      open(byId(b.getAttribute("data-id")));
    }));
  }

  function open(r) {
    if (!r) { drawList(); return; }
    passage = r;
    i = 0; correct = 0; phase = "q"; chosen = -1; gloss = null;
    drawPassage();
    window.scrollTo(0, 0);
  }

  // Wrap the FIRST occurrence of each glossary word in a tappable span. Done on
  // the already-escaped text: escaping afterwards would eat the markup, and
  // re-escaping per slice would shift every later index.
  function glossedHTML(r) {
    let html = esc(r.text).replace(/\n/g, "</p><p>");
    Object.keys(r.glossary || {}).forEach(w => {
      const e = esc(w);
      const at = html.indexOf(e);
      if (at < 0) return;
      html = html.slice(0, at) +
        `<span class="gw" data-w="${esc(w)}" role="button" tabindex="0">${e}</span>` +
        html.slice(at + e.length);
    });
    return `<p>${html}</p>`;
  }

  function questionHTML(r) {
    const total = r.questions.length;

    if (phase === "done") {
      const pct = Math.round((correct / total) * 100);
      const best = saveBest(r.id, pct);
      return `
        <div class="card center">
          <h4>Passage complete</h4>
          <div class="score">${pct}%</div>
          <p class="muted">${correct} of ${total} correct${best > pct ? ` · best ${best}%` : ""}</p>
          <button class="btn secondary" type="button" id="retry">Try again</button>
        </div>`;
    }

    const q = r.questions[i];
    const opts = q.options.map((o, idx) => {
      let cls = "opt";
      if (phase === "feedback") {
        if (idx === q.answer) cls += " correct";
        else if (idx === chosen) cls += " wrong";
        else cls += " dim";
      }
      return `<button class="${cls}" type="button" data-o="${idx}"
              ${phase === "feedback" ? "disabled" : ""}>${esc(o)}</button>`;
    }).join("");

    const ok = phase === "feedback" && chosen === q.answer;
    const foot = phase === "feedback" ? `
      <div class="fb ${ok ? "ok" : "bad"}">${ok ? "✓ Correct" : "✗ Not quite"}</div>
      <div class="navrow">
        <button class="btn wide" type="button" id="next">${i + 1 < total ? "Next question" : "See score"}</button>
      </div>` : "";

    return `
      <div class="card">
        <h4>Question ${i + 1} of ${total}</h4>
        <div class="qprompt ko">${esc(q.q)}</div>
        ${q.qe ? `<p class="muted small">${esc(q.qe)}</p>` : ""}
        <div class="optlist">${opts}</div>
        ${foot}
      </div>`;
  }

  // ---- passage screen
  function drawPassage() {
    const r = passage;
    const g = gloss
      ? `<div class="glossbox">
           <span class="ko">${esc(gloss.w)}</span> — ${esc(gloss.m)}
           ${spk(gloss.w, "Play the word")}
         </div>`
      : `<div class="glossbox muted small">Tap a dotted word to see its meaning here.</div>`;

    mount.innerHTML = `
      <div class="crumb"><h1>${esc(r.title)}</h1><span class="tag">Level ${esc(String(r.level))}</span></div>
      <div class="card">
        <div class="passage ko">${glossedHTML(r)}</div>
        ${hasKorean()
          ? `<div class="navrow"><button class="btn secondary" type="button" id="pspk">🔊 Listen to the passage</button></div>`
          : `<p class="muted small">Install a Korean text-to-speech voice to hear the passage.</p>`}
        ${g}
      </div>
      ${questionHTML(r)}
      <div class="navrow"><button class="btn secondary" type="button" id="back">← Passages</button></div>`;

    mount.querySelectorAll(".gw").forEach(el => {
      const pick = () => {
        const w = el.getAttribute("data-w");
        gloss = { w, m: (r.glossary && r.glossary[w]) || "" };
        say(w);
        drawPassage();
      };
      el.addEventListener("click", pick);
      el.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); }
      });
    });

    const pspk = mount.querySelector("#pspk");
    if (pspk) pspk.addEventListener("click", () => say(r.text.replace(/\n/g, " ")));
    mount.querySelectorAll("[data-ko]").forEach(b =>
      b.addEventListener("click", () => say(b.getAttribute("data-ko"))));

    mount.querySelectorAll("[data-o]").forEach(b => b.addEventListener("click", () => {
      if (phase !== "q") return;
      chosen = parseInt(b.getAttribute("data-o"), 10);
      const ok = chosen === r.questions[i].answer;
      if (ok) correct++;
      logAnswer(ok);
      phase = "feedback";
      drawPassage();
    }));

    const next = mount.querySelector("#next");
    if (next) next.addEventListener("click", () => {
      if (i + 1 < r.questions.length) { i++; phase = "q"; chosen = -1; }
      else phase = "done";
      drawPassage();
      window.scrollTo(0, 0);
    });

    const retry = mount.querySelector("#retry");
    if (retry) retry.addEventListener("click", () => open(r));

    mount.querySelector("#back").addEventListener("click", () => {
      cancelSpeech();
      drawList();
      window.scrollTo(0, 0);
    });
  }

  // Deep link: "#/practice/reading/r4-1" opens that passage directly.
  const deep = params ? byId(params) : null;
  if (deep) open(deep); else drawList();

  // Router teardown: stop any utterance started here.
  return () => cancelSpeech();
}
