// js/views/cards.js — Anki-style flashcards over the continuation deck
// (content/wordsnext.js), plus the words browser that replaces v1's Words tab.
//
// Ported from v1/js/cards.js (deck/queue/bury/undo) + v1/js/app.js
// renderCardsDeck/renderCardsStudy (UI). Two differences from v1:
//   1. schedule()/previews() come from js/srs.js — this file NEVER builds a
//      scheduler state by hand, it only persists what srs.js returned (plus the
//      `u` bookkeeping stamp below) and feeds stored states back in unchanged.
//   2. newPerDay is single-sourced from store.settings(); cardsMeta holds only
//      { day, introduced }. (v1 kept the cap in its meta.)
//
// Card model: every word makes TWO cards — "KE|<ko>" (Korean → English,
// recognition) and "EK|<ko>" (English → Korean, recall). New cards are
// introduced in word order with the recall card lagging LAG words behind its
// recognition card (the "lag200" reorder): queue position of KE for word i is
// i * 2, of EK is (i + LAG) * 2 + 1, so KE wins every tie.
//
// Stored state (store.cards()["KE|word"]) = the object srs.schedule() returned,
// plus `u` = the ms timestamp of that grade. `u` is cards.js bookkeeping — it is
// what makes sibling burying possible (a new card is not introduced on a day its
// partner direction was already studied) and srs.js ignores it. A card with no
// entry at all is "new".
import { register as route } from "../router.js";
import { WORDSNEXT } from "../../content/wordsnext.js";
import { store } from "../store.js";
import { schedule, previews } from "../srs.js";
import { speak, hasKorean, cancel as cancelSpeech } from "../tts.js";

const LAG = 200;          // EK card of word i unlocks LAG words after its KE card
const DEFAULT_NEW = 20;   // fallback when settings has no newPerDay
const MAX_NEW = 100;      // stepper ceiling (v1 parity)
const LIST_CAP = 100;     // words browser: rows rendered per SEARCH (browsing is banded)
const BAND = 100;         // words browser: words per collapsible band

// ---------------------------------------------------------------- deck engine

let cardList = null;      // built once: [{id, dir, w, pos}] in intro order

function deck() {
  if (cardList) return cardList;
  const out = [];
  WORDSNEXT.forEach((w, i) => {
    out.push({ id: "KE|" + w.ko, dir: "KE", w, pos: i * 2 });              // ties: KE first
    out.push({ id: "EK|" + w.ko, dir: "EK", w, pos: (i + LAG) * 2 + 1 });
  });
  out.sort((a, b) => a.pos - b.pos);
  cardList = out;
  return out;
}

let byId = null;
export function cardById(id) {
  if (!byId) byId = new Map(deck().map(c => [c.id, c]));
  return byId.get(id) || null;
}

function siblingId(id) {
  return (id.slice(0, 3) === "KE|" ? "EK|" : "KE|") + id.slice(3);
}

function dayKey(t) {
  const p = n => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
}
function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

// The daily new-card cap lives in settings, nowhere else.
export function newPerDay() {
  const n = store.settings().newPerDay;
  return typeof n === "number" && n >= 0 ? n : DEFAULT_NEW;
}
export function setNewPerDay(n) {
  const s = store.settings();
  s.newPerDay = Math.max(0, Math.min(MAX_NEW, Math.round(n)));
  store.setSettings(s);
}

// Today's meta, rolled over automatically when the calendar day changes. The
// rollover is NOT written back here — grade() persists it on the first grade of
// the new day, so merely opening the tab writes nothing.
function meta() {
  const m = store.cardsMeta();
  const today = dayKey(new Date());
  if (m.day !== today) return { day: today, introduced: 0 };
  return { day: today, introduced: m.introduced || 0 };
}

// A new card is buried for the day its partner direction was studied, so the two
// directions of one word are never introduced together. It unburies tomorrow.
function buriedBy(st, id, today) {
  const sib = st[siblingId(id)];
  return !!(sib && sib.u && dayKey(new Date(sib.u)) === today);
}

// { nw, learn, due, seen, total, words } — the deck screen and study header.
export function counts() {
  const st = store.cards();
  const eod = endOfToday();
  const today = dayKey(new Date());
  let learn = 0, due = 0, seen = 0, unseen = 0;
  deck().forEach(c => {
    const s = st[c.id];
    if (!s) {
      if (!buriedBy(st, c.id, today)) unseen++;   // buried siblings aren't available
      return;
    }
    seen++;
    if ((s.due || 0) > eod) return;
    if (s.st === "rev") due++; else learn++;
  });
  const m = meta();
  const fresh = Math.max(0, newPerDay() - m.introduced);
  return {
    nw: Math.min(fresh, unseen),
    learn,
    due,
    seen,
    total: deck().length,
    words: WORDSNEXT.length
  };
}

export function available() {
  const c = counts();
  return c.nw + c.learn + c.due;
}

// Next card to show: learning due now → reviews due today → a new card in intro
// order (within today's allotment) → learn-ahead on the earliest learning card
// still due today. Null when the session is finished.
export function next() {
  const st = store.cards();
  const now = Date.now(), eod = endOfToday();
  const today = dayKey(new Date());
  let learnNow = null, revDue = null, learnToday = null, firstNew = null;

  deck().forEach(c => {
    const s = st[c.id];
    if (!s) { if (!firstNew && !buriedBy(st, c.id, today)) firstNew = c; return; }
    if ((s.due || 0) > eod) return;
    if (s.st === "rev") {
      if (!revDue || s.due < st[revDue.id].due) revDue = c;
    } else if (s.due <= now) {
      if (!learnNow || s.due < st[learnNow.id].due) learnNow = c;
    } else {
      if (!learnToday || s.due < st[learnToday.id].due) learnToday = c;
    }
  });
  if (learnNow) return learnNow;
  if (revDue) return revDue;
  const m = meta();
  if (firstNew && m.introduced < newPerDay()) return firstNew;
  return learnToday;
}

// Every grade feeds today's retention counters: Again = miss, Hard/Good/Easy =
// pass. Like v1 (and lesson.js), undo does not un-count an answer — the day
// counters are a record of what you did, not of what survived.
function logGrade(ok) {
  const key = dayKey(new Date());
  const day = store.days()[key] || { right: 0, wrong: 0, done: [] };
  if (!Array.isArray(day.done)) day.done = [];
  if (ok) day.right = (day.right || 0) + 1;
  else day.wrong = (day.wrong || 0) + 1;
  store.setDay(key, day);
}

// g: 0 = Again, 1 = Hard, 2 = Good, 3 = Easy. Returns a one-step undo token.
export function grade(id, g) {
  const st = store.cards();
  const cur = st[id] || null;
  if (!cur) {                                   // first sight: spends today's allotment
    const m = meta();
    store.setCardsMeta({ day: m.day, introduced: m.introduced + 1 });
  }
  const now = Date.now();
  store.setCard(id, { ...schedule(cur, g, now), u: now });
  logGrade(g > 0);
  return { id, prev: cur, wasNew: !cur };
}

export function undo(tok) {
  if (!tok) return;
  if (tok.wasNew) {
    const m = meta();
    store.setCardsMeta({ day: m.day, introduced: Math.max(0, m.introduced - 1) });
  }
  if (tok.prev) store.setCard(tok.id, tok.prev);   // restored verbatim, `u` included
  else store.removeCard(tok.id);
}

// Four interval labels for the grade buttons, from the card's stored state.
function previewsFor(id) {
  return previews(store.cards()[id] || null, Date.now());
}

// ---------------------------------------------------------------------- view

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// Gated on hasKorean(): speak() falls back to a default voice, so the UI decides
// whether a 🔊 control is honest.
function spk(ko) {
  if (!hasKorean() || !ko) return "";
  return `<button class="btn ghost spk" type="button" data-ko="${esc(ko)}" aria-label="Play Korean audio">🔊</button>`;
}
function say(ko) {
  if (!hasKorean()) return;
  speak(ko, store.settings().ttsRate);
}

const GRADES = [["again", "Again"], ["hard", "Hard"], ["good", "Good"], ["easy", "Easy"]];

export function register() {
  route("/practice/cards", mount => renderCards(mount));
}

// One route, two screens (deck / study) held in closure state — navigating
// between them must not push a hash, or the browser Back button would walk back
// through every card.
function renderCards(mount) {
  let screen = "deck";
  let cur = null;          // the card being studied
  let revealed = false;
  let studied = 0;         // cards graded this session
  let tok = null;          // one-step undo token
  let term = "";           // words-browser search

  // ---- deck screen
  function drawDeck() {
    const c = counts();
    const avail = c.nw + c.learn + c.due;
    mount.innerHTML = `
      <h1>Cards</h1>
      <p class="muted small">Anki-style flashcards continuing past your Core 5k deck — every word here is new.</p>
      <div class="card">
        <h4>Beyond Core 5k</h4>
        <p class="muted small">${c.words} words · ${c.total} cards (KO→EN + EN→KO, recall lags ${LAG} words) · ${c.seen} seen</p>
        <div class="deckcounts">
          <div class="dc new"><b>${c.nw}</b><span>New</span></div>
          <div class="dc learn"><b>${c.learn}</b><span>Learning</span></div>
          <div class="dc due"><b>${c.due}</b><span>Due</span></div>
        </div>
        ${avail
          ? `<button class="btn wide" type="button" id="study">Study now</button>`
          : `<p class="muted small">All done for today — come back tomorrow, or raise the new-card limit below.</p>`}
      </div>
      <div class="card">
        <h4>Deck options</h4>
        <div class="optrow">
          <span class="grow muted small">New cards per day</span>
          <button class="btn ghost stepbtn" type="button" id="npdm" aria-label="Fewer new cards per day">−</button>
          <span class="npdval" id="npdval">${newPerDay()}</span>
          <button class="btn ghost stepbtn" type="button" id="npdp" aria-label="More new cards per day">+</button>
        </div>
        <p class="muted small">Graded cards come back on an Anki-like schedule: 1 min → 10 min while learning, then growing day intervals. The two directions of a word are never introduced on the same day.</p>
      </div>
      <div class="card">
        <h4>Words</h4>
        <input class="tinput" id="wsearch" type="search" autocomplete="off" autocapitalize="off"
               spellcheck="false" placeholder="Search 한글 or English…" aria-label="Search the deck"
               value="${esc(term)}" />
        <div id="wlist"></div>
      </div>`;

    const study = mount.querySelector("#study");
    if (study) study.addEventListener("click", () => {
      screen = "study"; cur = null; revealed = false; draw();
    });
    mount.querySelector("#npdm").addEventListener("click", () => { setNewPerDay(newPerDay() - 5); drawDeck(); });
    mount.querySelector("#npdp").addEventListener("click", () => { setNewPerDay(newPerDay() + 5); drawDeck(); });

    const box = mount.querySelector("#wsearch");
    const list = mount.querySelector("#wlist");
    drawList(list);
    // Redraw only the list so the search box keeps its value and focus.
    box.addEventListener("input", () => { term = box.value; drawList(list); });
    list.addEventListener("click", e => {
      // A band opening: fill it the first time, then let <details> do the rest.
      const sum = e.target.closest("summary[data-band]");
      if (sum && list.contains(sum)) {
        const body = sum.parentElement.querySelector(".band-body");
        if (body && !body.childElementCount) body.innerHTML = bandHTML(+sum.getAttribute("data-band"));
        return;
      }
      const row = e.target.closest(".wrow");
      if (!row || !list.contains(row)) return;
      const audio = e.target.closest("[data-ko]");
      if (audio) { row.classList.add("on"); say(audio.getAttribute("data-ko")); return; }
      row.classList.toggle("on");
    });
  }

  function wordRow(w) {
    return `
      <div class="wrow">
        <div class="whead">
          <span class="ko big grow">${esc(w.ko)}</span>
          <span class="muted small">#${esc(w.r)}</span>
          ${spk(w.ko)}
        </div>
        <div class="wmean">${esc(w.en)}${w.pos ? ` <span class="tag">${esc(w.pos)}</span>` : ""}${w.hj ? ` <span class="muted small">${esc(w.hj)}</span>` : ""}</div>
      </div>`;
  }

  // One band's rows, built on demand — see drawList.
  function bandHTML(i) {
    return WORDSNEXT.slice(i * BAND, (i + 1) * BAND).map(wordRow).join("");
  }

  // Two modes, because browsing and searching want opposite things.
  //
  // BROWSING (no search term) is banded: the whole deck rendered flat is ~25
  // phone screens, and the old LIST_CAP fix made it worse than long — it
  // silently truncated at 100, so the other ~2,380 words could not be reached at
  // all unless you already knew the word well enough to type it. Bands make
  // every word reachable and cost one collapsed summary row each; a band's rows
  // are built the first time it is opened, so a cold list builds 0 rows.
  //
  // SEARCHING is flat and still capped: a search that matches half the deck is a
  // search that needs narrowing, not 1,200 rendered rows. The count says so.
  function drawList(host) {
    const t = term.trim(), tl = t.toLowerCase();

    if (!t) {
      const n = Math.ceil(WORDSNEXT.length / BAND);
      let bands = "";
      for (let i = 0; i < n; i++) {
        const from = i * BAND, to = Math.min(from + BAND, WORDSNEXT.length);
        bands += `
          <details class="wband">
            <summary data-band="${i}">
              <span class="wband-chev" aria-hidden="true">›</span>
              <span class="grow">Words ${from + 1}–${to}</span>
              <span class="muted small">#${esc(WORDSNEXT[from].r)}–${esc(WORDSNEXT[to - 1].r)}</span>
            </summary>
            <div class="band-body"></div>
          </details>`;
      }
      host.innerHTML =
        `<p class="muted small">All ${WORDSNEXT.length} words, most frequent first. Open a band, then tap a word to reveal its meaning.</p>` +
        bands;
      return;
    }

    const hits = WORDSNEXT.filter(w =>
      w.ko.indexOf(t) > -1 || (w.en || "").toLowerCase().indexOf(tl) > -1);
    if (!hits.length) {
      host.innerHTML = `<p class="muted small">No words match your search.</p>`;
      return;
    }
    const shown = hits.slice(0, LIST_CAP);
    host.innerHTML =
      `<p class="muted small">${hits.length > shown.length
        ? `Showing the first ${shown.length} of ${hits.length} matches — narrow the search to see the rest.`
        : `${hits.length} match${hits.length === 1 ? "" : "es"} — tap a word to reveal its meaning.`}</p>` +
      shown.map(wordRow).join("");
  }

  // ---- study screen
  function drawStudy() {
    if (!cur) { cur = next(); revealed = false; }
    const c = counts();
    const back = `<div class="navrow"><button class="btn secondary" type="button" id="back">← Deck</button></div>`;

    if (!cur) {
      mount.innerHTML = `
        <h1>Cards</h1>
        <div class="card center">
          <div class="score">🎉</div>
          <p>Session finished — ${studied} card${studied === 1 ? "" : "s"} studied.</p>
          <p class="muted small">${c.nw} new · ${c.learn} learning · ${c.due} due left today.
            Learning cards return in a few minutes; reviews come back on their day.</p>
          <button class="btn secondary" type="button" id="undo" ${tok ? "" : "disabled"}>↶ Undo last grade</button>
        </div>
        ${back}`;
      wireStudy();
      return;
    }

    const w = cur.w, ke = cur.dir === "KE";
    const koBlock = `<div class="ankiko"><span class="ko">${esc(w.ko)}</span>${spk(w.ko)}</div>`;
    const enBlock = `<div class="ankien">${esc(w.en)}</div>`;
    const extras = `${w.pos ? `<span class="tag">${esc(w.pos)}</span>` : ""}${w.hj ? ` <span class="muted small">${esc(w.hj)}</span>` : ""}`;

    let body;
    if (!revealed) {
      // KE shows the Korean, EK the English — the same fronts as the Anki deck.
      body = `<div class="ankifront">${ke ? koBlock : enBlock}</div>
        <button class="btn wide" type="button" id="show">Show answer</button>`;
    } else {
      const pv = previewsFor(cur.id);
      const grades = GRADES.map((g, i) => `
        <button class="gradebtn ${g[0]}" type="button" data-g="${i}">
          <span class="ivl">${esc(pv[i])}</span>${g[1]}
        </button>`).join("");
      body = `
        <div class="ankifront small">${ke ? koBlock : enBlock}</div>
        <hr class="ankihr" />
        <div class="ankiback">${ke ? enBlock : koBlock}${extras ? `<div class="ankiextra">${extras}</div>` : ""}</div>
        <div class="graderow">${grades}</div>`;
    }

    mount.innerHTML = `
      <h1>Cards</h1>
      <div class="cbar">
        <span class="cc new">${c.nw}</span><span class="csep">·</span>
        <span class="cc learn">${c.learn}</span><span class="csep">·</span>
        <span class="cc due">${c.due}</span>
        <span class="tag">${ke ? "KO → EN" : "EN → KO"}</span>
        <span class="grow"></span>
        <span class="muted small">#${esc(w.r)}</span>
        <button class="btn ghost stepbtn" type="button" id="undo" ${tok ? "" : "disabled"}
                aria-label="Undo last grade">↶</button>
      </div>
      <div class="card anki${revealed ? "" : " tappable"}" id="anki">${body}</div>
      <p class="muted small center">${revealed ? "Keys: 1 Again · 2 Hard · 3 Good · 4 Easy" : "Tap the card, space or enter to show the answer"}</p>
      ${back}`;
    wireStudy();
  }

  function wireStudy() {
    const undoBtn = mount.querySelector("#undo");
    if (undoBtn) undoBtn.addEventListener("click", doUndo);
    mount.querySelector("#back").addEventListener("click", () => {
      cancelSpeech();
      screen = "deck"; cur = null; revealed = false; draw();
    });
    const show = mount.querySelector("#show");
    if (show) show.addEventListener("click", reveal);
    const anki = mount.querySelector("#anki");
    if (anki) anki.addEventListener("click", e => {
      const audio = e.target.closest("[data-ko]");
      if (audio) { say(audio.getAttribute("data-ko")); return; }
      const g = e.target.closest("[data-g]");
      if (g) { doGrade(parseInt(g.getAttribute("data-g"), 10) || 0); return; }
      if (!revealed) reveal();
    });
  }

  function reveal() {
    if (!cur || revealed) return;
    revealed = true;
    drawStudy();
    // EK hides the Korean until now, so this is the first chance to hear it.
    // (KE already showed the Korean with its own 🔊 on the front.)
    if (cur.dir === "EK") say(cur.w.ko);
  }

  function doGrade(g) {
    if (!cur || !revealed) return;
    cancelSpeech();
    tok = grade(cur.id, g);
    studied++;
    cur = null; revealed = false;
    drawStudy();
  }

  function doUndo() {
    if (!tok) return;
    cancelSpeech();
    undo(tok);
    cur = cardById(tok.id);      // bring the card back, already revealed
    revealed = true;
    studied = Math.max(0, studied - 1);
    tok = null;
    screen = "study";
    drawStudy();
  }

  function onKey(e) {
    if (screen !== "study" || e.metaKey || e.ctrlKey || e.altKey) return;
    if (!revealed && (e.key === " " || e.key === "Enter")) { e.preventDefault(); reveal(); return; }
    if (revealed && e.key >= "1" && e.key <= "4") { e.preventDefault(); doGrade(Number(e.key) - 1); }
  }

  function draw() {
    (screen === "study" ? drawStudy : drawDeck)();
    window.scrollTo(0, 0);
  }

  document.addEventListener("keydown", onKey);
  draw();
  // Router teardown: drop the key handler and stop any utterance still playing.
  return () => { document.removeEventListener("keydown", onKey); cancelSpeech(); };
}
