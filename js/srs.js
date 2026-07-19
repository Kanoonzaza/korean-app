// srs.js — the ONE shared SM-2 scheduler for flashcards (Task 8) and lesson
// reviews (Task 7). Ported verbatim in behavior from v1/js/cards.js:146-226.
//
// The ONLY change from v1: `now` (ms timestamp) is passed IN to every function
// instead of calling Date.now() internally, so scheduling is deterministic and
// testable. Pure functions — no storage, no DOM, no imports.
//
// State shape: { st: "learn"|"relearn"|"rev", step?, ivl?, ef, due }
// Grades:      0 = Again, 1 = Hard, 2 = Good, 3 = Easy

const MIN = 60000, DAY = 86400000;
const LEARN_STEPS = [1, 10];      // minutes
const HARD_LEARN_MIN = 5;         // "Hard" on a learning card: retry in 5 min
const RELEARN_MIN = 10;           // relearning step
const GRAD_IVL = 1, EASY_IVL = 4; // graduation intervals (days)

function graduate(ivl, ef, now) {
  return { st: "rev", ivl: ivl, ef: ef, due: now + ivl * DAY };
}
function learning(step, minutes, ef, now) {
  return { st: "learn", step: step, ef: ef, due: now + minutes * MIN };
}

// g: 0 = Again, 1 = Hard, 2 = Good, 3 = Easy.
export function schedule(cur, g, now) {
  var ef = (cur && cur.ef) || 2.5;

  if (!cur || cur.st === "learn") {
    var step = cur ? (cur.step || 0) : 0;
    if (g === 0) return learning(0, LEARN_STEPS[0], ef, now);
    if (g === 1) return learning(step, HARD_LEARN_MIN, ef, now);
    if (g === 3) return graduate(EASY_IVL, ef, now);
    var nxt = step + 1;
    if (nxt >= LEARN_STEPS.length) return graduate(GRAD_IVL, ef, now);
    return learning(nxt, LEARN_STEPS[nxt], ef, now);
  }

  if (cur.st === "relearn") {
    var ivl = cur.ivl || 1;
    if (g <= 1) return { st: "relearn", ivl: ivl, ef: ef, due: now + RELEARN_MIN * MIN };
    return graduate(g === 3 ? ivl + 1 : ivl, ef, now);
  }

  // Review card.
  var i = cur.ivl || 1;
  if (g === 0) {
    return {
      st: "relearn",
      ivl: Math.max(1, Math.floor(i * 0.25)),
      ef: Math.max(1.3, ef - 0.2),
      due: now + RELEARN_MIN * MIN
    };
  }
  if (g === 1) return graduate(Math.max(i + 1, Math.round(i * 1.2)), Math.max(1.3, ef - 0.15), now);
  if (g === 3) return graduate(Math.max(i + 2, Math.round(i * ef * 1.3)), ef + 0.15, now);
  return graduate(Math.max(i + 1, Math.round(i * ef)), ef, now);
}

// Interval label shown above the grade buttons (and for review-card previews).
export function fmtIvl(days) {
  if (days < 30) return days + "d";
  if (days < 365) return (Math.round(days / 3) / 10) + "mo";
  return (Math.round(days / 36.5) / 10) + "y";
}

function fmtSched(s, now) {
  if (s.st === "rev") return fmtIvl(s.ivl);
  var min = Math.round((s.due - now) / MIN);
  return "<" + Math.max(1, min) + "m";
}

// Four formatted interval previews, one per grade g = 0..3, for `cur`.
export function previews(cur, now) {
  return [0, 1, 2, 3].map(function (g) { return fmtSched(schedule(cur, g, now), now); });
}
