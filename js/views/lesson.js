// js/views/lesson.js — the 5-step lesson player for one curriculum lesson.
//
// The router matches STATIC prefixes only, so this module registers NO route of
// its own: syllabus.js owns the "/learn" prefix and calls renderLesson() when
// the params tail names a lesson id. register() stays a no-op so main.js keeps
// treating every view the same way.
//
// Steps are built from the lesson body, so the indicator counts REAL steps: a
// drill with an empty vocab array has no Vocab step and reads "Step 3 / 4"
// rather than offering a dead one. Order: Grammar → Vocab → Examples → Quiz →
// Practice.
//
// Persistence (always read-modify-write through store.js setters):
//   lessons[id].step — furthest step index reached, so reopening resumes there
//   lessons[id].done — true once the quiz run finished, at ANY score
//   lessons[id].best — max score % across attempts; never lowered
//   lessons[id].srs  — seeded ONCE on first completion with schedule(null, 2, now)
//                      and never reset by a re-run (only the review flow regrades it)
//   days[YYYY-MM-DD].right/.wrong — incremented for every graded answer
//   weak[expectedKo] = { en, kind } — every wrong answer; nothing is retired here
import { CURRICULUM } from "../../content/curriculum.js";
import { L4 } from "../../content/lessons/l4.js";
import { L5 } from "../../content/lessons/l5.js";
import { TTMIK_SENTENCES } from "../../content/ttmik-sentences.js";
import { store } from "../store.js";
import { grade } from "../grader.js";
import { schedule } from "../srs.js";
import { speak, hasKorean, cancel as cancelSpeech } from "../tts.js";
import { go } from "../router.js";

// syllabus.js owns "/learn" — nothing to register here.
export function register() { /* no route: see the header comment */ }

const BODIES = new Map([...L4, ...L5].map(b => [b.id, b]));
const META = new Map(CURRICULUM.map(c => [c.id, c]));

// True only for lessons that have a body to play. status:"known" lessons have
// none, so the syllabus must never link to them.
export function hasBody(id) { return BODIES.has(id); }

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- bridge sentences ----------
// Bridge strings are exact `ko` matches into TTMIK_SENTENCES (validated at
// authoring time). Built lazily and once; a miss renders the Korean alone.
let bridgeEn = null;
function enForKo(ko) {
  if (!bridgeEn) {
    bridgeEn = new Map();
    for (const s of TTMIK_SENTENCES) if (!bridgeEn.has(s.ko)) bridgeEn.set(s.ko, s.en);
  }
  return bridgeEn.get(ko) || "";
}

// ---------- speaker buttons ----------
// Gated on hasKorean(): speak() itself falls back to a default voice, so the UI
// is what decides whether a 🔊 control is honest. Clicks are delegated.
function spk(ko) {
  if (!hasKorean() || !ko) return "";
  return `<button class="btn ghost spk" type="button" data-ko="${esc(ko)}" aria-label="Play Korean audio">🔊</button>`;
}
function wireSpeakers(host) {
  host.addEventListener("click", e => {
    const b = e.target.closest("[data-ko]");
    if (!b || !host.contains(b)) return;
    speak(b.getAttribute("data-ko"), store.settings().ttsRate);
  });
}

// ---------- progress persistence ----------
function todayKey(d) {
  const t = d || new Date();
  const p = n => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
}

function rec(id) { return store.lessons()[id] || {}; }

// step = the FURTHEST step reached, so navigating back never rewinds resume.
function saveStep(id, idx) {
  const r = rec(id);
  if (typeof r.step === "number" && r.step >= idx) return;
  r.step = idx;
  store.setLesson(id, r);
}

// done at any score; best only ever rises; srs seeded on first completion only.
function saveCompletion(id, pct) {
  const r = rec(id);
  r.done = true;
  r.best = Math.max(typeof r.best === "number" ? r.best : 0, pct);
  if (!r.srs) r.srs = schedule(null, 2, Date.now());
  store.setLesson(id, r);
}

// Every graded answer (quiz + practice) lands in today's retention counters;
// wrong ones also join the weak pile keyed by the expected Korean.
function logAnswer(ok, expectedKo, en, kind) {
  const key = todayKey();
  const day = store.days()[key] || { right: 0, wrong: 0, done: [] };
  if (!Array.isArray(day.done)) day.done = [];
  if (ok) day.right = (day.right || 0) + 1;
  else day.wrong = (day.wrong || 0) + 1;
  store.setDay(key, day);
  if (!ok) {
    const w = store.weak();
    w[expectedKo] = { en: en || "", kind };
    store.setWeak(w);
  }
}

// ---------- item generation ----------
// Quiz items come from THIS lesson's own vocab + sentences, never invented and
// never borrowed: 4 typed words + 2 sentence translations + 2 listen-and-type
// (typed instead when there is no Korean voice), each capped by what the body
// actually supplies. A lesson with no vocab (compressed lessons and the
// sentence-building drills) gets 3 sentence items instead.
function typedItem(prompt, answer, romaji, source) {
  return { kind: "type", prompt: prompt, answer: answer, en: prompt, romaji: romaji || "", source: source };
}
function listenItem(answer, en, romaji, source) {
  return { kind: "listen", prompt: "", answer: answer, en: en || "", romaji: romaji || "", source: source };
}

function buildQuiz(body) {
  const vocab = (body.vocab || []).filter(v => v && v.ko && v.en);
  const sents = (body.sentences || []).filter(s => s && s.ko && s.en);

  if (!vocab.length) {
    const pick = shuffle(sents).slice(0, Math.min(3, sents.length));
    return pick.map(s => typedItem(s.en, s.ko, s.romaji, "sentence"));
  }

  const vPool = shuffle(vocab), sPool = shuffle(sents);
  let vi = 0, si = 0;
  const items = [];
  for (let n = 0; n < 4 && vi < vPool.length; n++) {
    const v = vPool[vi++];
    items.push(typedItem(v.en, v.ko, v.romaji, "word"));
  }
  for (let n = 0; n < 2 && si < sPool.length; n++) {
    const s = sPool[si++];
    items.push(typedItem(s.en, s.ko, s.romaji, "sentence"));
  }
  // Two ear-training items; without a Korean voice they become typed items so
  // the round keeps its length instead of silently shrinking.
  const listen = hasKorean();
  for (let n = 0; n < 2; n++) {
    let src = null, kindOf = "word";
    if (vi < vPool.length) src = vPool[vi++];
    else if (si < sPool.length) { src = sPool[si++]; kindOf = "sentence"; }
    if (!src) break;
    items.push(listen ? listenItem(src.ko, src.en, src.romaji, kindOf)
                      : typedItem(src.en, src.ko, src.romaji, kindOf));
  }
  return shuffle(items);
}

// Fill-in-the-blank practice: the sentence with its grammar chunk hidden.
function buildPractice(body) {
  const usable = (body.sentences || []).filter(s => s && s.blankWord && s.ko && s.ko.indexOf(s.blankWord) >= 0);
  return shuffle(usable).slice(0, Math.min(4, usable.length)).map(s => ({
    kind: "blank",
    display: s.ko.replace(s.blankWord, "____"),
    prompt: s.en,
    answer: s.blankWord,
    en: s.en,
    romaji: s.romaji || "",
    fullKo: s.ko
  }));
}

// ---------- step bodies ----------
function grammarStep(host, body) {
  const g = body.grammar || {};
  const notes = (g.notes || []).filter(Boolean);
  const pitfalls = (body.pitfalls || []).filter(Boolean);
  const bridge = (body.bridge || []).filter(Boolean);
  host.innerHTML = `
    <div class="card">
      <h4>Grammar point</h4>
      <p class="lpoint ko big">${esc(body.point || "")}</p>
      ${g.summary ? `<p>${esc(g.summary)}</p>` : ""}
    </div>
    ${g.formation ? `
    <div class="card">
      <h4>Formation</h4>
      <p class="formation">${esc(g.formation)}</p>
    </div>` : ""}
    ${g.explanation ? `
    <div class="card">
      <h4>How it works</h4>
      <p>${esc(g.explanation)}</p>
      ${notes.length ? `<ul class="notes">${notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
    </div>` : ""}
    ${pitfalls.length ? `
    <div class="card">
      <h4>Common mistakes</h4>
      <ul class="notes pitfalls">${pitfalls.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
    </div>` : ""}
    ${bridge.length ? `
    <div class="card">
      <h4>You already know these</h4>
      <p class="muted small">Sentences from your Anki decks that lean on this pattern.</p>
      ${bridge.map(ko => {
        const en = enForKo(ko);
        return `<div class="bridge-item">
          <div class="grow">
            <div class="ko big">${esc(ko)}</div>
            ${en ? `<div class="muted small">${esc(en)}</div>` : ""}
          </div>
          ${spk(ko)}
        </div>`;
      }).join("")}
    </div>` : ""}`;
}

function vocabStep(host, body) {
  const vocab = body.vocab || [];
  host.innerHTML = `
    <p class="muted small">${vocab.length} new word${vocab.length === 1 ? "" : "s"} in this lesson.</p>
    ${vocab.map(v => `
      <div class="card vcard">
        <div class="vrow">
          <div class="grow">
            <div class="ko big">${esc(v.ko)}</div>
            <div class="muted small mono">${esc(v.romaji || "")}</div>
          </div>
          ${spk(v.ko)}
        </div>
        <div class="ven">${esc(v.en)}${v.pos ? ` <span class="tag">${esc(v.pos)}</span>` : ""}</div>
        ${v.note ? `<div class="muted small">${esc(v.note)}</div>` : ""}
      </div>`).join("")}`;
}

function examplesStep(host, body) {
  const sents = body.sentences || [];
  host.innerHTML = `
    <p class="muted small">Read each one out loud, then check the English.</p>
    ${sents.map(s => `
      <div class="card">
        <div class="vrow">
          <div class="grow">
            <div class="ko big">${esc(s.ko)}</div>
            <div class="muted small mono">${esc(s.romaji || "")}</div>
          </div>
          ${spk(s.ko)}
        </div>
        <div class="ven">${esc(s.en)}</div>
      </div>`).join("")}`;
}

// Shared one-item-at-a-time runner for the Quiz and Practice steps.
// cfg: { label, items, kind, onFinish(pct), retryLabel }
function runner(host, cfg) {
  const total = cfg.items.length;
  let idx = 0, right = 0, checked = false, finished = false;

  function drawScore() {
    const pct = total ? Math.round((right / total) * 100) : 0;
    if (!finished) { finished = true; if (cfg.onFinish) cfg.onFinish(pct); }
    host.innerHTML = `
      <div class="card center">
        <h4>${esc(cfg.label)} complete</h4>
        <div class="score">${pct}%</div>
        <p class="muted">${right} of ${total} correct</p>
        <button class="btn secondary" type="button" id="retry">${esc(cfg.retryLabel || "Try again")}</button>
      </div>`;
    host.querySelector("#retry").addEventListener("click", () => {
      cfg.items = shuffle(cfg.items);
      idx = 0; right = 0; checked = false; finished = false;
      draw();
    });
  }

  function draw() {
    if (idx >= total) return drawScore();
    const it = cfg.items[idx];
    checked = false;
    const promptHtml = it.kind === "listen"
      ? `<p class="muted small">Listen and type what you hear.</p>
         <div class="vrow">${spk(it.answer)}<span class="muted small grow">Tap to replay</span></div>`
      : it.kind === "blank"
        ? `<div class="ko big">${esc(it.display)}</div>
           <div class="muted small">${esc(it.prompt)}</div>`
        : `<div class="qprompt">${esc(it.prompt)}</div>
           <p class="muted small">Type it in Korean.</p>`;
    host.innerHTML = `
      <div class="card">
        <h4>${esc(cfg.label)} ${idx + 1} / ${total}${it.source === "sentence" ? " · sentence" : ""}</h4>
        ${promptHtml}
        <input class="tinput" id="qin" type="text" autocomplete="off" autocapitalize="off"
               spellcheck="false" enterkeyhint="go" aria-label="Your answer" />
        <div id="fb"></div>
        <div class="navrow"><button class="btn" type="button" id="act">Check</button></div>
      </div>`;
    const input = host.querySelector("#qin");
    const fb = host.querySelector("#fb");
    const act = host.querySelector("#act");
    if (it.kind === "listen") speak(it.answer, store.settings().ttsRate);
    input.focus();

    function advance() { idx++; draw(); }

    function check() {
      const typed = input.value;
      if (!typed.trim()) { input.focus(); return; }
      checked = true;
      const res = grade(it.answer, typed);
      if (res.ok) right++;
      logAnswer(res.ok, it.answer, it.en, cfg.kind);
      input.disabled = true;
      const extra = [
        it.romaji ? `<div class="muted small mono">${esc(it.romaji)}</div>` : "",
        it.kind !== "type" && it.en ? `<div class="muted small">${esc(it.en)}</div>` : "",
        it.kind === "blank" ? `<div class="ko">${esc(it.fullKo)}</div>` : ""
      ].join("");
      fb.innerHTML = res.ok
        ? `<div class="fb ok">✓ Correct</div>
           <div class="ans">Answer: <span class="ko">${esc(it.answer)}</span></div>${extra}`
        : `<div class="fb bad">✗ Not quite</div>${res.diffHtml}${extra}`;
      act.textContent = idx + 1 >= total ? "See score" : "Next question";
      act.focus();
    }

    act.addEventListener("click", () => (checked ? advance() : check()));
    input.addEventListener("keydown", e => {
      if (e.key !== "Enter" || e.isComposing) return;   // never submit mid-IME-composition
      e.preventDefault();
      checked ? advance() : check();
    });
  }

  draw();
}

// ---------- the player ----------
export function renderLesson(mount, id) {
  const meta = META.get(id) || null;
  const body = BODIES.get(id) || null;

  // status:"known" lessons (and typos in the hash) have no body to play.
  if (!meta || !body) {
    mount.innerHTML = `
      <h1>Learn</h1>
      <div class="card">
        <h4>No lesson here</h4>
        <p class="muted">${meta
          ? `Lesson ${esc(id)} is marked known from your Anki decks, so it has no player.`
          : `There is no lesson <code>${esc(id)}</code>.`}</p>
        <p><a href="#/learn">Back to the syllabus</a></p>
      </div>`;
    return () => cancelSpeech();
  }

  const steps = [{ key: "grammar", label: "Grammar", draw: h => grammarStep(h, body) }];
  if ((body.vocab || []).length) steps.push({ key: "vocab", label: "Vocab", draw: h => vocabStep(h, body) });
  if ((body.sentences || []).length) steps.push({ key: "examples", label: "Examples", draw: h => examplesStep(h, body) });
  steps.push({
    key: "quiz", label: "Quiz",
    draw: h => runner(h, {
      label: "Question", kind: "quiz", items: buildQuiz(body),
      retryLabel: "Retry the quiz",
      // "done" the moment a quiz run finishes, whatever the score.
      onFinish: pct => saveCompletion(id, pct)
    })
  });
  const practiceItems = buildPractice(body);
  if (practiceItems.length) steps.push({
    key: "practice", label: "Practice",
    draw: h => runner(h, {
      label: "Practice", kind: "practice", items: practiceItems,
      retryLabel: "Practice again"
    })
  });

  const saved = rec(id);
  let cur = Math.min(Math.max(0, typeof saved.step === "number" ? saved.step : 0), steps.length - 1);

  function show() {
    saveStep(id, cur);
    const step = steps[cur];
    const last = cur === steps.length - 1;
    mount.innerHTML = `
      <div class="crumb"><a href="#/learn">← Syllabus</a> <span class="muted small">${esc(meta.ttmik || "")}</span></div>
      <h1>${esc(body.title || meta.title || "")}</h1>
      <div class="stephead">
        <span class="stepno">Step ${cur + 1} / ${steps.length} · ${esc(step.label)}</span>
        <span class="dots" aria-hidden="true">${steps.map((s, k) => `<i class="${k <= cur ? "on" : ""}"></i>`).join("")}</span>
      </div>
      <div id="stepbody"></div>
      <div class="navrow">
        <button class="btn secondary" type="button" id="prev">${cur === 0 ? "← Syllabus" : "← Back"}</button>
        <button class="btn" type="button" id="next">${last ? "Finish ✓" : "Next →"}</button>
      </div>`;
    const host = mount.querySelector("#stepbody");
    wireSpeakers(host);
    step.draw(host);
    mount.querySelector("#prev").addEventListener("click", () => {
      cancelSpeech();
      if (cur === 0) return go("/learn");
      cur--; show();
    });
    mount.querySelector("#next").addEventListener("click", () => {
      cancelSpeech();
      if (last) return go("/learn");
      cur++; show();
    });
    window.scrollTo(0, 0);
  }

  show();
  // Router teardown: stop any utterance still playing when the user navigates.
  return () => cancelSpeech();
}
