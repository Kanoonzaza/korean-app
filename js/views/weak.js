// js/views/weak.js — the weak-item drill.
//
// store.weak() is the app's single miss pile: lesson quizzes and practice
// (kind "quiz"/"practice") and dictation (kind "dictation") all write to it,
// keyed by the EXPECTED Korean string with {en, kind}. That key is why the pile
// self-deduplicates — missing the same sentence twice leaves one entry.
//
// The rule that shapes this view: a correct answer RETIRES the item (the key is
// deleted), a wrong answer leaves it in place. So the pile only ever shrinks by
// being answered, and re-missing something keeps it around for the next round.
// Retirement happens at grade time, not at the end of the round, so a round
// abandoned halfway still banks the items already cleared.
//
// One route, three screens (start / drill / summary) in closure state, as in
// dictation.js — no hash pushes between them.
import { register as route } from "../router.js";
import { store } from "../store.js";
import { grade } from "../grader.js";
import { speak, hasKorean, cancel as cancelSpeech } from "../tts.js";

const ROUND = 10;             // items per round, oldest first

const KIND_LABEL = { quiz: "Lesson quiz", practice: "Lesson practice", dictation: "Dictation" };

// The pile as an ordered array. Object.keys preserves insertion order for string
// keys, so the oldest miss comes first — the closest thing to age information the
// store keeps (no timestamps are recorded).
export function weakList() {
  const w = store.weak();
  return Object.keys(w).map(ko => ({ ko, en: (w[ko] && w[ko].en) || "", kind: (w[ko] && w[ko].kind) || "" }));
}

export function weakCount() {
  return Object.keys(store.weak()).length;
}

// Read-modify-write: drop one key from the pile.
function retire(ko) {
  const w = store.weak();
  delete w[ko];
  store.setWeak(w);
}

function dayKey(t) {
  const p = n => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
}

// Today's retention counters. Read-modify-write of the whole day record so
// `done` (lesson completions) and `dict` (dictation indexes) survive.
function logAnswer(ok) {
  const key = dayKey(new Date());
  const day = store.days()[key] || { right: 0, wrong: 0, done: [] };
  if (!Array.isArray(day.done)) day.done = [];
  if (ok) day.right = (day.right || 0) + 1;
  else day.wrong = (day.wrong || 0) + 1;
  store.setDay(key, day);
}

// --------------------------------------------------------------------- view

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function spk(ko) {
  if (!hasKorean() || !ko) return "";
  return `<button class="btn ghost spk" type="button" data-ko="${esc(ko)}" aria-label="Play Korean audio">🔊</button>`;
}
function say(ko) {
  if (!hasKorean() || !ko) return;
  speak(ko, store.settings().ttsRate);
}

export function register() {
  route("/practice/weak", mount => renderWeak(mount));
}

function renderWeak(mount) {
  let queue = [];             // [{ko, en, kind}] snapshot for this round
  let pos = 0;
  let answered = false;
  let result = null;          // grade() result for the current item
  let typed = "";
  let log = [];               // [{ko, en, ok}] for the summary

  // ---- start screen (also the empty state)
  function drawStart() {
    const all = weakList();
    if (!all.length) {
      mount.innerHTML = `
        <h1>Weak items</h1>
        <div class="card center">
          <div class="score">✓</div>
          <h4>Nothing to review</h4>
          <p class="muted">Wrong answers from lessons, cards and dictation collect here.
            Get one wrong and it will be waiting for you.</p>
        </div>
        <div class="navrow"><a class="btn secondary" href="#/practice">← Practice</a></div>`;
      return;
    }

    const byKind = {};
    all.forEach(it => { byKind[it.kind || "other"] = (byKind[it.kind || "other"] || 0) + 1; });
    const chips = Object.keys(byKind).map(k =>
      `<span class="tag">${esc(KIND_LABEL[k] || "Other")} ${byKind[k]}</span>`).join(" ");

    mount.innerHTML = `
      <h1>Weak items</h1>
      <p class="muted small">Everything you have missed, oldest first. Type the Korean
        from the English — get it right and the item retires for good.</p>
      <div class="card">
        <h4>${all.length} item${all.length === 1 ? "" : "s"} waiting</h4>
        <p class="chiprow">${chips}</p>
        <button class="btn wide" type="button" id="start">
          Review ${Math.min(ROUND, all.length)} item${Math.min(ROUND, all.length) === 1 ? "" : "s"}</button>
        <p class="muted small">A miss stays in the pile for next time.</p>
      </div>
      <div class="navrow"><a class="btn secondary" href="#/practice">← Practice</a></div>`;

    mount.querySelector("#start").addEventListener("click", startRound);
  }

  function startRound() {
    queue = weakList().slice(0, ROUND);
    if (!queue.length) { drawStart(); return; }
    pos = 0; log = [];
    newItem();
  }

  function newItem() {
    answered = false; result = null; typed = "";
    drawDrill();
    window.scrollTo(0, 0);
  }

  function item() { return queue[pos] || { ko: "", en: "", kind: "" }; }

  // ---- drill
  function drawDrill() {
    const it = item();
    const right = log.filter(l => l.ok).length;
    const wrong = log.length - right;

    const after = answered ? `
      <div class="fb ${result.ok ? "ok" : "bad"}">${result.ok ? "✓ Correct — retired" : "✗ Not quite — kept for next time"}</div>
      ${result.ok ? "" : result.diffHtml}
      <div class="dictreveal">
        <div class="vrow">
          <div class="ko big grow">${esc(it.ko)}</div>
          ${spk(it.ko)}
        </div>
      </div>` : "";

    mount.innerHTML = `
      <h1>Weak items</h1>
      <div class="cbar">
        <span class="tag">${esc(KIND_LABEL[it.kind] || "Missed")}</span>
        <span class="grow"></span>
        <span class="muted small">${pos + 1} / ${queue.length}</span>
        <span class="csep">·</span>
        <span class="cc due">${right}</span><span class="csep">/</span><span class="cc learn">${wrong}</span>
      </div>
      <div class="card">
        <h4>Say this in Korean</h4>
        <div class="qprompt">${esc(it.en) || `<span class="muted">(no English recorded — type the Korean you remember)</span>`}</div>
        <textarea class="tinput dictta" id="wta" rows="2" autocomplete="off" autocapitalize="off"
                  spellcheck="false" aria-label="Your answer, in Korean"
                  ${answered ? "disabled" : ""}>${esc(typed)}</textarea>
        <p class="muted small">Enter makes a new line · Ctrl/⌘+Enter submits</p>
        ${after}
        <div class="navrow">
          ${answered
            ? `<button class="btn wide" type="button" id="next">${pos + 1 >= queue.length ? "See summary" : "Next item"}</button>`
            : `<button class="btn wide" type="button" id="submit">Check</button>`}
        </div>
      </div>
      <div class="navrow"><button class="btn secondary" type="button" id="quit">← Weak items</button></div>`;

    const ta = mount.querySelector("#wta");
    ta.addEventListener("focus", () => {
      try { ta.scrollIntoView({ block: "center", behavior: "smooth" }); } catch { ta.scrollIntoView(); }
    });
    ta.addEventListener("keydown", e => {
      if (e.key !== "Enter" || e.isComposing) return;   // never submit mid-IME-composition
      if (!(e.ctrlKey || e.metaKey)) return;            // plain Enter = newline
      e.preventDefault();
      submit();
    });
    if (!answered) ta.focus();

    const sub = mount.querySelector("#submit");
    if (sub) sub.addEventListener("click", submit);
    const nxt = mount.querySelector("#next");
    if (nxt) { nxt.addEventListener("click", advance); nxt.focus(); }
    mount.querySelectorAll("[data-ko]").forEach(b =>
      b.addEventListener("click", () => say(b.getAttribute("data-ko"))));

    mount.querySelector("#quit").addEventListener("click", () => {
      cancelSpeech(); drawStart(); window.scrollTo(0, 0);
    });
  }

  function submit() {
    if (answered) return;
    const ta = mount.querySelector("#wta");
    typed = ta ? ta.value : "";
    const it = item();
    result = grade(it.ko, typed);
    answered = true;
    logAnswer(result.ok);
    if (result.ok) retire(it.ko);          // banked now, not at the end of the round
    log.push({ ko: it.ko, en: it.en, ok: result.ok });
    drawDrill();
  }

  function advance() {
    cancelSpeech();
    if (pos + 1 >= queue.length) { drawSummary(); window.scrollTo(0, 0); return; }
    pos++;
    newItem();
  }

  // ---- summary
  function drawSummary() {
    const right = log.filter(l => l.ok).length;
    const total = log.length;
    const left = weakCount();
    mount.innerHTML = `
      <h1>Weak items</h1>
      <div class="card center">
        <h4>Round complete</h4>
        <div class="score">${right} / ${total}</div>
        <p class="muted">${right} retired · ${left} still in the pile</p>
      </div>
      <div class="card">
        <h4>This round</h4>
        ${log.map(l => `
          <div class="drow${l.ok ? " ok" : " bad"}">
            <span class="mark">${l.ok ? "✓" : "✗"}</span>
            <div class="grow">
              <div class="ko">${esc(l.ko)}</div>
              <div class="muted small">${esc(l.en)}</div>
            </div>
            ${spk(l.ko)}
          </div>`).join("")}
      </div>
      <div class="navrow">
        ${left ? `<button class="btn" type="button" id="again">Another round</button>` : ""}
        <button class="btn secondary" type="button" id="done">${left ? "Done" : "Back"}</button>
      </div>`;
    mount.querySelectorAll("[data-ko]").forEach(b =>
      b.addEventListener("click", () => say(b.getAttribute("data-ko"))));
    const again = mount.querySelector("#again");
    if (again) again.addEventListener("click", () => { cancelSpeech(); startRound(); });
    mount.querySelector("#done").addEventListener("click", () => {
      cancelSpeech(); drawStart(); window.scrollTo(0, 0);
    });
  }

  drawStart();
  return () => cancelSpeech();
}
