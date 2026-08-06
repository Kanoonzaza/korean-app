// js/level.js — indicative Korean-proficiency estimate + the gauge that shows it.
//
// Ported from v1/js/level.js, but the estimate is rebuilt: v1 could only see
// lessons (its only progress signal), while v2 also owns a 2,480-word scheduled
// deck and a day-by-day right/wrong history. Judging proficiency from lessons
// alone here would ignore the bulk of the study.
//
// IMPORTANT: this is a self-study estimate from in-app performance, NOT a TOPIK
// result. It is deliberately bounded — see BASE/SPAN below.
//
// THE BAND IS FIXED BY THE CONTENT, NOT BY THE LEARNER.
//   BASE 2.0 = the floor the user already stands on before opening this app
//              (Anki: TTMIK 1–3 complete + the Core 5k deck in progress).
//   SPAN 2.0 = what finishing everything in here can add (TTMIK 4–5 ≈ TOPIK 4).
// So a perfect score reads 4.0, never 6.0. Claiming otherwise would be lying to
// the user. ADDING A LEVEL: raise SPAN when the curriculum genuinely reaches
// higher material — see docs/EXTENDING.md.
import { CURRICULUM } from "../content/curriculum.js";
import { WORDSNEXT } from "../content/wordsnext.js";
import { store } from "./store.js";

const MIN_L = 1, MAX_L = 6;        // the TOPIK scale the gauge is drawn on
const BASE = 2.0, SPAN = 2.0;      // mastery 0..1 maps onto level 2.0..4.0

const MATURE_D = 21;               // Anki's convention: ivl >= 21d is a "mature" card
const SEEN_CREDIT = 0.15;          // a card in learning/relearning is started, not known
const WINDOW = 30;                 // days of history the accuracy term reads
const MIN_ANSWERS = 20;            // below this, accuracy is noise — drop the term
const WEAK_PER = 0.005, WEAK_CAP = 0.10;   // weak-pile drag

// Component weights, renormalized over whichever components returned a value.
// In practice only `accuracy` is ever dropped (too few answers to read): grammar
// and vocab always have data, because the curriculum and the deck always exist —
// not having studied them is a real zero, not a missing measurement.
const W = { grammar: 0.45, vocab: 0.40, accuracy: 0.15 };

const DAY = 86400000;

function clamp01(x) { return Math.max(0, Math.min(1, x)); }

function dayKey(t) {
  const p = n => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${p(t.getMonth() + 1)}-${p(t.getDate())}`;
}

// ------------------------------------------------------------- the components

// Share of the gateable curriculum completed, each lesson weighted by how well
// it was answered. status:"known" lessons are excluded from BOTH sides: they came
// from the Anki decks, so they are already priced into BASE and would otherwise
// hand out free credit for work not done in this app.
// A lesson finished before best-score tracking gets 0.6 — the same middling
// assumption v1 made.
function grammar() {
  const saved = store.lessons();
  const gates = CURRICULUM.filter(c => c.status !== "known");
  if (!gates.length) return null;
  let sum = 0, done = 0;
  gates.forEach(c => {
    const r = saved[c.id];
    if (!r || !r.done) return;
    done++;
    sum += (typeof r.best === "number" ? r.best / 100 : 0.6);
  });
  return { v: clamp01(sum / gates.length), done, total: gates.length };
}

// Share of the continuation deck actually known, with partial credit so early
// progress is visible instead of being rounded to zero.
//
// Per WORD, not per card: a word counts once, scored as the MEAN of its two
// directions (recognition KE and recall EK). Recognition alone is not knowing a
// word, and the deck introduces EK 200 words behind KE, so a per-card average
// would permanently understate the learner by that lag.
//   never graded      -> 0
//   learning/relearn  -> SEEN_CREDIT
//   review            -> ivl / MATURE_D, capped at 1
function vocab() {
  const st = store.cards();
  if (!WORDSNEXT.length) return null;
  let sum = 0, mature = 0, seen = 0;
  const credit = id => {
    const s = st[id];
    if (!s) return 0;
    if (s.st !== "rev") return SEEN_CREDIT;
    return clamp01((s.ivl || 0) / MATURE_D);
  };
  WORDSNEXT.forEach(w => {
    const a = credit("KE|" + w.ko), b = credit("EK|" + w.ko);
    if (a || b) seen++;
    if (a >= 1 && b >= 1) mature++;
    sum += (a + b) / 2;
  });
  return { v: clamp01(sum / WORDSNEXT.length), mature, seen, total: WORDSNEXT.length };
}

// Answer accuracy over the last WINDOW days, from the right/wrong counters every
// drill already writes. Returns null below MIN_ANSWERS so a handful of lucky
// answers cannot move the needle.
//
// Rescaled, not used raw: graded recall sits well above 50% even when guessing
// blind, so 50% is treated as the floor and 95% as full marks. Feeding the raw
// ratio in would gift roughly half this component to someone who knows nothing.
function accuracy() {
  const days = store.days();
  const now = new Date();
  let right = 0, wrong = 0;
  for (let d = 0; d < WINDOW; d++) {
    const rec = days[dayKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - d))];
    if (!rec) continue;
    right += rec.right || 0;
    wrong += rec.wrong || 0;
  }
  const n = right + wrong;
  if (n < MIN_ANSWERS) return null;
  const raw = right / n;
  return { v: clamp01((raw - 0.5) / 0.45), raw, n };
}

// ---------------------------------------------------------------- the estimate

export function estimate() {
  const g = grammar(), v = vocab(), a = accuracy();

  // Weighted mean over the components that have data, renormalized.
  const parts = [];
  if (g) parts.push([W.grammar, g.v]);
  if (v) parts.push([W.vocab, v.v]);
  if (a) parts.push([W.accuracy, a.v]);
  const wsum = parts.reduce((s, p) => s + p[0], 0);
  const scored = wsum ? parts.reduce((s, p) => s + p[0] * p[1], 0) / wsum : 0;

  const weak = Object.keys(store.weak()).length;
  const penalty = Math.min(weak * WEAK_PER, WEAK_CAP);
  const mastery = clamp01(scored - penalty);
  const level = BASE + mastery * SPAN;

  return {
    level, mastery, weak, penalty,
    grammar: g, vocab: v, accuracy: a,
    // Any study at all — the gauge stays honest ("no data yet") until then.
    hasData: !!(g && g.done) || !!(v && v.seen) || !!a,
    band: band(level),
    floor: BASE, ceiling: BASE + SPAN,
  };
}

export function band(level) {
  if (level < 2.5) return "High beginner · TOPIK I";
  if (level < 3.0) return "Low intermediate · TOPIK II";
  if (level < 3.5) return "Intermediate · TOPIK II";
  if (level < 4.5) return "Upper-intermediate · TOPIK II";
  return "Advanced · TOPIK II";
}

// ------------------------------------------------------------ gauge geometry
//
// Top semicircle: level MIN_L sits at 180°, MAX_L at 0°.

const cx = 140, cy = 140, R = 108;

function ang(v) { return Math.PI * (1 - (v - MIN_L) / (MAX_L - MIN_L)); }
function pt(v, r) { const a = ang(v); return [cx + r * Math.cos(a), cy - r * Math.sin(a)]; }
function arc(fromV, toV, r) {
  const p0 = pt(fromV, r), p1 = pt(toV, r);
  return `M ${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A ${r} ${r} 0 0 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`;
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function pct(x) { return Math.round(x * 100) + "%"; }

// The full gauge — the Me tab. `uid` keeps the gradient's id unique so two
// gauges on one page cannot collide.
export function gaugeHTML(uid = "g1") {
  const e = estimate();
  let ticks = "";
  for (let v = MIN_L; v <= MAX_L; v++) {
    const a = pt(v, R + 6), b = pt(v, R - 8), lp = pt(v, R - 24);
    ticks += `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" class="g-tick"/>`;
    ticks += `<text x="${lp[0].toFixed(1)}" y="${(lp[1] + 4).toFixed(1)}" class="g-tnum">${v}</text>`;
  }
  // The slice of the dial this app's content can actually reach, marked so the
  // ceiling reads as a property of the curriculum rather than of the learner.
  const reach = `<path d="${arc(e.floor, e.ceiling, R + 14)}" class="g-reach"/>`;
  const needle = pt(e.level, R - 16);

  const svg = `
    <svg viewBox="0 0 280 176" class="gauge" role="img"
         aria-label="Estimated level ${e.level.toFixed(1)} of 6 on the TOPIK scale">
      <defs>
        <linearGradient id="${esc(uid)}" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="var(--c-lesson)"/>
          <stop offset="0.55" stop-color="var(--c-cards)"/>
          <stop offset="1" stop-color="var(--warm)"/>
        </linearGradient>
      </defs>
      ${reach}
      <path d="${arc(MIN_L, MAX_L, R)}" class="g-track"/>
      <path d="${arc(MIN_L, e.level, R)}" class="g-val" stroke="url(#${esc(uid)})"/>
      ${ticks}
      <line x1="${cx}" y1="${cy}" x2="${needle[0].toFixed(1)}" y2="${needle[1].toFixed(1)}" class="g-needle"/>
      <circle cx="${cx}" cy="${cy}" r="6" class="g-hub"/>
      <text x="${cx}" y="104" class="g-big">${e.level.toFixed(1)}</text>
      <text x="${cx}" y="124" class="g-sub">≈ TOPIK level</text>
    </svg>`;

  const bars = [
    ["Grammar", e.grammar && e.grammar.v, "c-lesson",
      e.grammar ? `${e.grammar.done} of ${e.grammar.total} lessons` : ""],
    ["Vocabulary", e.vocab && e.vocab.v, "c-cards",
      e.vocab ? `${e.vocab.mature} mature · ${e.vocab.seen} started of ${e.vocab.total}` : ""],
    ["Accuracy", e.accuracy && e.accuracy.v, "c-dict",
      e.accuracy ? `${pct(e.accuracy.raw)} right over ${e.accuracy.n} answers (30d)`
                 : `needs ${MIN_ANSWERS}+ answers in 30 days`],
  ].map(([label, v, cls, note]) => `
    <div class="lvbar">
      <div class="lvbar-head">
        <span class="lvbar-dot ${cls}"></span>
        <span class="grow">${esc(label)}</span>
        <span class="muted small">${v == null ? "—" : pct(v)}</span>
      </div>
      <div class="lvbar-track"><i class="${cls}" style="width:${v == null ? 0 : Math.round(v * 100)}%"></i></div>
      <div class="muted small">${esc(note)}</div>
    </div>`).join("");

  return `
    <div class="card gauge-card">
      <h4>Estimated level</h4>
      ${svg}
      <div class="g-band">${esc(e.hasData ? e.band : "No data yet")}</div>
      <div class="muted small g-note">${esc(e.hasData
        ? "Moves as you finish lessons, mature cards, and answer accurately."
        : "Finish a lesson or study some cards to start the estimate.")}</div>
      <div class="lvbars">${bars}</div>
      ${e.weak ? `<div class="muted small g-note">−${e.penalty.toFixed(2)} for ${e.weak} unresolved weak item${e.weak === 1 ? "" : "s"} — clear them in Practice to lift it back.</div>` : ""}
      <details class="callout g-how">
        <summary>How is this estimated?</summary>
        <p class="small">A rough self-study estimate from your own in-app performance —
        <strong>not an official TOPIK result</strong>. It weighs lessons finished and how well you
        answered them (45%), how much of the ${e.vocab ? e.vocab.total : ""}-word deck has matured
        (40%), and your recent answer accuracy (15%), minus a small drag for unresolved weak items.
        Accuracy is left out entirely until you have answered enough for it to mean anything;
        lessons and vocabulary you simply have not done yet do count as not done.</p>
        <p class="small">It starts at <strong>${e.floor.toFixed(1)}</strong> because that is roughly
        where your Anki decks (TTMIK 1–3 and the Core 5k) already put you, and it tops out near
        <strong>${e.ceiling.toFixed(1)}</strong> because this app's lessons cover TTMIK 4–5. Going
        higher needs more advanced material, not a better score in here.</p>
      </details>
    </div>`;
}

// The compact form — a linear strip for the Today screen, tappable through to
// the full gauge on Me. Same estimate, no second source of truth.
export function stripHTML() {
  const e = estimate();
  const at = ((e.level - MIN_L) / (MAX_L - MIN_L)) * 100;
  const from = ((e.floor - MIN_L) / (MAX_L - MIN_L)) * 100;
  const to = ((e.ceiling - MIN_L) / (MAX_L - MIN_L)) * 100;
  return `
    <a class="card lvstrip" href="#/me">
      <div class="lvstrip-head">
        <span class="lvnum">${e.level.toFixed(1)}</span>
        <span class="grow">
          <span class="lvband">${esc(e.hasData ? e.band : "No data yet")}</span>
          <span class="muted small">≈ TOPIK level · tap for the breakdown</span>
        </span>
        <span class="hubchev" aria-hidden="true">›</span>
      </div>
      <div class="lvtrack" role="img" aria-label="Estimated level ${e.level.toFixed(1)} of 6">
        <i class="lvreach" style="left:${from}%;width:${to - from}%"></i>
        <i class="lvfill" style="width:${at}%"></i>
        <i class="lvmark" style="left:${at}%"></i>
      </div>
      <div class="lvscale" aria-hidden="true">
        ${[1, 2, 3, 4, 5, 6].map(n => `<span>${n}</span>`).join("")}
      </div>
    </a>`;
}
