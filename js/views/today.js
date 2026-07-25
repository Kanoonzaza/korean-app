// js/views/today.js — the Today tab: the daily plan, and the shared day math
// (leg derivation + streak) that me.js reads too.
//
// The plan has three legs — Lesson, Cards, Dictation — and the day's ring closes
// when all three are done. Every other view already records its own progress
// (lesson.js writes `lessons`, cards.js writes `cards`/`cardsMeta`,
// dictation.js pushes sentence indexes into `days[key].dict`), and NONE of them
// write `days[key].done`. So this module DERIVES each leg's done-state from the
// evidence those views leave behind and appends the leg key to `done` when it is
// satisfied. Deriving happens on every render: it is idempotent (a key already
// in `done` is never appended twice) and it means a leg finished in another view
// shows up the moment Today is opened, with no cooperation from that view.
//
// Two rules this file exists to enforce:
//   1. The streak is COMPUTED from days{}, never stored. There is no streak
//      counter anywhere in storage — `streak()` walks days{} backwards.
//   2. `done` is only ever APPENDED to, and the whole day record is written back
//      unchanged apart from that (dictation's `dict` array and the right/wrong
//      counters must survive).
//
// me.js imports syncToday()/streak()/dayKey()/LEGS from here so the leg and
// streak definitions live in exactly one place.
import { register as route } from "../router.js";
import { CURRICULUM } from "../../content/curriculum.js";
import { store } from "../store.js";
import { counts } from "./cards.js";
import { hasBody } from "./lesson.js";
import { hasKorean } from "../tts.js";

// The three leg keys, in plan order. Also the completeness test for a day.
export const LEGS = ["lesson", "cards", "dict"];

const CARDS_FOR_LEG = 20;      // cards graded today that count as "did the cards"
const MIN = 60000, DAY = 86400000;
const STREAK_CAP = 3650;       // walking days{} backwards can never run away

const META = new Map(CURRICULUM.map(c => [c.id, c]));

// Local YYYY-MM-DD, the key shape every view already uses for days{}.
export function dayKey(t) {
  const d = t || new Date();
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.getTime();
}

// The stored day record, verbatim (fresh parse), so writing it back preserves
// every field this module does not touch.
function rawDay(key) {
  const d = store.days()[key];
  return (d && typeof d === "object") ? d : { right: 0, wrong: 0, done: [] };
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// ------------------------------------------------------- lesson-leg evidence
//
// A lesson record carries no completion date — but every srs.js state is
// `{ due: <the moment it was written> + <the interval the state itself encodes> }`,
// so the write time is recoverable from the state alone: learning steps are 1 and
// 10 minutes (a Hard grade re-uses the same step at 5), relearning is 10 minutes,
// a review is `ivl` whole days. That write time is exactly when the lesson was
// finished (lesson.js seeds `srs` on first completion) or last reviewed, which is
// the evidence the "lesson" leg needs. Worst-case error is the 5-vs-10-minute
// Hard/Good ambiguity on a learning step, which can only matter within five
// minutes of midnight.
function srsStamp(s) {
  if (!s || typeof s.due !== "number") return null;
  if (s.st === "rev") return s.due - (s.ivl || 1) * DAY;
  if (s.st === "relearn") return s.due - 10 * MIN;
  return s.due - (s.step ? 10 : 1) * MIN;          // "learn"
}

// Cards graded today, counted off the `u` stamp cards.js writes with every grade.
// A card graded twice today counts once — 20 distinct cards is the threshold the
// ruling asks for, and this is the only per-card timestamp that exists.
function cardsGradedToday() {
  const st = store.cards();
  const today = dayKey();
  let n = 0;
  Object.keys(st).forEach(id => {
    const s = st[id];
    if (s && typeof s.u === "number" && dayKey(new Date(s.u)) === today) n++;
  });
  return n;
}

// --------------------------------------------------------------------- legs
//
// Each leg: { key, glyph, title, state, badge, href, done }. `recorded` is the
// set already in today's done[] — a leg that was satisfied EARLIER today stays
// ✓ even if the live evidence has moved on (the card queue refilling with
// learning cards is the case that matters).

function lessonLeg(recorded) {
  const saved = store.lessons();
  const eod = endOfToday();
  const today = dayKey();

  const due = [];
  let workedToday = false;
  Object.keys(saved).forEach(id => {
    const r = saved[id];
    const s = r && r.srs;
    if (!s || typeof s.due !== "number") return;
    // Only a lesson with a body can be reviewed (status:"known" ids have none).
    if (s.due <= eod && hasBody(id)) due.push({ id, due: s.due });
    const t = srsStamp(s);
    if (t !== null && dayKey(new Date(t)) === today) workedToday = true;
  });
  due.sort((a, b) => a.due - b.due || (a.id < b.id ? -1 : 1));   // most overdue first

  // The unlock chain, minus the "known" lessons that never gate anything.
  const pending = CURRICULUM.filter(c =>
    c.status !== "known" && !(saved[c.id] && saved[c.id].done));
  const next = pending.find(c => hasBody(c.id)) || null;

  const leg = {
    key: "lesson", glyph: "📚", title: "Lesson",
    done: recorded.has("lesson") || workedToday || (pending.length === 0 && due.length === 0),
    href: null, state: "", badge: ""
  };

  if (due.length) {
    const d = due[0], m = META.get(d.id);
    leg.title = "Lesson review";
    leg.href = `#/learn/${d.id}`;
    leg.state = `${d.id} · ${m ? m.title : ""}${due.length > 1 ? ` (+${due.length - 1} more due)` : ""}`;
    leg.badge = `<span class="badge">${due.length} due</span>`;
  } else if (next) {
    leg.href = `#/learn/${next.id}`;
    leg.state = `${next.id} · ${next.title}`;
    leg.badge = `<span class="tag">up next</span>`;
  } else {
    leg.state = "All caught up — every lesson done and nothing due.";
    leg.badge = `<span class="tag">nothing due</span>`;
  }
  // The next new lesson, shown as a second link when a review is holding the row.
  leg.also = (due.length && next) ? next : null;
  return leg;
}

function cardsLeg(recorded) {
  const c = counts();
  const avail = c.nw + c.learn + c.due;
  const graded = cardsGradedToday();
  const leg = {
    key: "cards", glyph: "🃏", title: "Cards",
    href: "#/practice/cards",
    done: recorded.has("cards") || avail === 0 || graded >= CARDS_FOR_LEG,
    state: `${c.due} due · ${c.nw} new${c.learn ? ` · ${c.learn} learning` : ""}`,
    badge: avail ? `<span class="badge">${avail}</span>` : `<span class="tag">empty</span>`
  };
  if (avail === 0) leg.state = "Queue empty for today.";
  else if (graded) leg.state += ` — ${graded} graded today, ${Math.max(0, CARDS_FOR_LEG - graded)} to go`;
  return leg;
}

function dictLeg(day, recorded) {
  const voice = hasKorean();
  const n = Array.isArray(day.dict) ? day.dict.length : 0;
  const leg = {
    key: "dict", glyph: "🎧", title: "Dictation",
    href: "#/practice/dictation",
    // A missing Korean voice makes dictation impossible, so it must not hold the
    // streak hostage: the leg counts as done and says why.
    done: recorded.has("dict") || n > 0 || !voice,
    state: "One round of 5 sentences.",
    badge: `<span class="tag">5</span>`
  };
  if (!voice) {
    leg.state = "Needs a Korean text-to-speech voice — counted as done so a missing voice can't break your streak.";
    leg.badge = `<span class="tag">no voice</span>`;
  } else if (n) {
    leg.state = `${n} sentence${n === 1 ? "" : "s"} dictated today.`;
  }
  return leg;
}

// ------------------------------------------------------------- plan + streak

// The three legs as they stand right now, plus today's raw day record.
export function plan() {
  const key = dayKey();
  const day = rawDay(key);
  const recorded = new Set(Array.isArray(day.done) ? day.done : []);
  const legs = [lessonLeg(recorded), cardsLeg(recorded), dictLeg(day, recorded)];
  return { key, day, legs, done: legs.filter(l => l.done).length };
}

// Derive today's legs and record the satisfied ones into days[today].done.
// Idempotent — appends only keys that are missing, writes only when something
// changed, and never touches right/wrong/dict. Both Today and Me call this, so
// the day is recorded wherever the user happens to look.
export function syncToday() {
  const p = plan();
  const day = p.day;
  if (!Array.isArray(day.done)) day.done = [];
  let changed = false;
  p.legs.forEach(l => {
    if (l.done && day.done.indexOf(l.key) < 0) { day.done.push(l.key); changed = true; }
  });
  if (changed) store.setDay(p.key, day);
  return p;
}

// Consecutive days whose done[] holds all three legs, counting back from today —
// or from yesterday when today is not complete yet, so an unfinished morning
// never reads as a broken streak. Computed from days{} on every call; nothing
// about the streak is ever stored.
export function streak() {
  const days = store.days();
  const full = key => {
    const d = days[key];
    return !!d && Array.isArray(d.done) && LEGS.every(l => d.done.indexOf(l) >= 0);
  };
  const now = new Date();
  const start = full(dayKey(now)) ? 0 : 1;
  let n = 0;
  for (let i = start; i < STREAK_CAP; i++) {
    const t = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    if (!full(dayKey(t))) break;
    n++;
  }
  return n;
}

// --------------------------------------------------------------------- view

// Progress ring: an SVG arc whose dash length is the completed fraction of the
// circumference. Rotated -90° so it starts at 12 o'clock.
function ring(done, total) {
  const R = 34, C = 2 * Math.PI * R;
  const arc = total ? (C * done) / total : 0;
  return `
    <svg class="ring${done >= total ? " full" : ""}" viewBox="0 0 80 80" width="80" height="80"
         role="img" aria-label="${done} of ${total} parts of today's plan done">
      <circle class="ringtrack" cx="40" cy="40" r="${R}" />
      <circle class="ringarc" cx="40" cy="40" r="${R}" transform="rotate(-90 40 40)"
              stroke-dasharray="${arc.toFixed(1)} ${C.toFixed(1)}" />
      <text class="ringtext" x="40" y="41" text-anchor="middle" dominant-baseline="central">${done}/${total}</text>
    </svg>`;
}

function legRow(l) {
  const inner = `
    <span class="hubglyph legmark" aria-hidden="true">${l.done ? "✓" : l.glyph}</span>
    <span class="grow">
      <span class="hubhead"><span class="hubtitle">${esc(l.title)}</span>${l.badge}</span>
      <span class="muted small hubdesc">${esc(l.state)}</span>
    </span>
    <span class="hubchev" aria-hidden="true">${l.href ? "›" : ""}</span>`;
  const cls = `hubcard legcard${l.done ? " done" : ""}`;
  return l.href
    ? `<a class="${cls}" href="${esc(l.href)}">${inner}</a>`
    : `<div class="${cls}">${inner}</div>`;
}

export function register() {
  route("/today", mount => renderToday(mount));
}

function renderToday(mount) {
  function draw() {
    const p = syncToday();
    const n = p.legs.filter(l => l.done).length;
    const s = streak();
    const also = p.legs[0].also;
    const date = new Date().toLocaleDateString(undefined,
      { weekday: "long", month: "short", day: "numeric" });

    mount.innerHTML = `
      <h1>Today</h1>
      <div class="card todayhead">
        ${ring(n, LEGS.length)}
        <div class="grow">
          <div class="muted small">${esc(date)}</div>
          <div class="streakline">
            <span class="streaknum">${s}</span>
            <span class="streaklab">day${s === 1 ? "" : "s"} in a row</span>
          </div>
          <div class="muted small">${n === LEGS.length
            ? "Day complete. Anything more is a bonus."
            : `${LEGS.length - n} of ${LEGS.length} left${s ? "" : " — finish all three to start a streak"}.`}</div>
        </div>
      </div>
      <div class="hubgrid">${p.legs.map(legRow).join("")}</div>
      ${also ? `<p class="muted small alsorow">Next new lesson:
        <a href="#/learn/${esc(also.id)}">${esc(also.id)} · ${esc(also.title)}</a></p>` : ""}
      <p class="muted small">Each part ticks itself off from the work you actually did —
        a lesson or a due review, ${CARDS_FOR_LEG} cards (or an empty queue), and one dictation round.</p>`;
  }

  // A PWA left open across midnight would otherwise show yesterday's plan.
  function onVisible() { if (!document.hidden) draw(); }
  document.addEventListener("visibilitychange", onVisible);

  draw();
  return () => document.removeEventListener("visibilitychange", onVisible);
}
