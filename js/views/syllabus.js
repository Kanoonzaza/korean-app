// js/views/syllabus.js — the Learn tab: the 60-lesson curriculum list.
//
// The router matches STATIC prefixes only, so this module registers exactly ONE
// prefix ("/learn") and dispatches on the params tail: empty → the list, any
// other value → that lesson id, handed to the player in lesson.js. There is no
// "/learn/<id>" route to register.
//
// Unlock chain: lesson N is tappable iff every EARLIER non-"known" lesson is
// done. status:"known" lessons came from the user's Anki decks — they have no
// body, are never tappable, and never gate the lesson after them.
import { register as route } from "../router.js";
import { CURRICULUM } from "../../content/curriculum.js";
import { store } from "../store.js";
import { renderLesson, renderReview, hasBody } from "./lesson.js";

export function register() {
  route("/learn", (mount, params) => {
    if (!params) return renderSyllabus(mount);
    // "4.01" → the 5-step player; "4.01/review" → the spaced-review session.
    const slash = params.indexOf("/");
    if (slash < 0) return renderLesson(mount, params);
    const id = params.slice(0, slash);
    if (params.slice(slash + 1) === "review") return renderReview(mount, id);
    return renderLesson(mount, id);
  });
}

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// One pass over CURRICULUM in order → { id: {kind, rec} }.
// kind: "known" | "done" | "current" | "locked".
// A "known" lesson is skipped entirely by the gate, so it can never block.
// A done lesson stays tappable even if an earlier one somehow isn't (hand-edited
// storage, or a lesson finished before this rule existed).
function states() {
  const saved = store.lessons();
  const out = new Map();
  let earlierAllDone = true;
  for (const c of CURRICULUM) {
    if (c.status === "known") { out.set(c.id, { kind: "known", rec: null }); continue; }
    const rec = saved[c.id] || null;
    const done = !!(rec && rec.done);
    if (done) out.set(c.id, { kind: "done", rec });
    else if (earlierAllDone) { out.set(c.id, { kind: "current", rec }); earlierAllDone = false; }
    else out.set(c.id, { kind: "locked", rec });
    if (!done) earlierAllDone = false;
  }
  return out;
}

// True when a lesson is further down the chain than the learner has reached.
// The syllabus never links these; a hand-typed hash still can, so lesson.js
// shows a "not there yet" card first rather than silently starting it.
export function isLocked(id) {
  const st = states().get(id);
  return !!st && st.kind === "locked";
}

// Row glyph per state. "known" rows use a plain "·" hardcoded in the template
// (they are dimmed and unclickable), so they need no entry here.
const MARK = { done: "✓", current: "▶", locked: "🔒" };

// Rows are deliberately TIGHT: 61 of them stacked at full height ran to seven
// phone screens, which is not a list anyone scrolls. Two lines each — id+title,
// then the grammar point — and `canDo` (the third line, and the tallest) is
// shown ONLY on the lesson you are actually about to do, where it is a prompt
// rather than noise. It is still shown in full inside the lesson itself.
function row(c, st) {
  const id = esc(c.id), title = esc(c.title), point = esc(c.point);

  // A row you have SETTLED — already known from Anki, or finished — collapses to
  // one line: its grammar point is on the row you tapped to get here, and these
  // are the rows that accumulate, so leaving them two lines tall would make the
  // list grow longer the more progress you make.
  const oneLine = st.kind === "known" || st.kind === "done";

  // The "Anki" tag is not decoration: a known row is dimmed and unclickable, and
  // without it there is nothing on the row to distinguish "you already know this"
  // from "this is locked" — which is the whole premise of the app.
  if (st.kind === "known") {
    return `<div class="lrow known oneline">
      <span class="mark" aria-hidden="true">·</span>
      <div class="lrow-body">
        <div class="lhead"><span class="lid">${id}</span> <span class="ltitle">${title}</span>
          <span class="lpoint ko">${point}</span>
          <span class="tag ankitag" title="Already covered by your Anki decks">Anki</span></div>
      </div>
    </div>`;
  }

  const tappable = (st.kind === "done" || st.kind === "current") && hasBody(c.id);
  const best = st.rec && typeof st.rec.best === "number" ? st.rec.best : null;
  const inner = `
    <span class="mark" aria-hidden="true">${MARK[st.kind]}</span>
    <div class="lrow-body">
      <div class="lhead"><span class="lid">${id}</span> <span class="ltitle">${title}</span>${
        st.kind === "current" ? ` <span class="badge">up next</span>` : ""
      }${best !== null ? ` <span class="lbest" title="Best quiz score">best ${best}%</span>` : ""}</div>
      ${oneLine ? "" : `<div class="lmeta"><span class="lpoint ko">${point}</span></div>`}
      ${st.kind === "current" && tappable && c.canDo ? `<div class="lcando">${esc(c.canDo)}</div>` : ""}
    </div>`;

  // A "done" lesson with no body cannot be opened, so it is rendered as a plain
  // div — but it keeps its `done` class, because it IS done. `locked` is added
  // for the dimmed look without overwriting that.
  const cls = `lrow ${st.kind}${oneLine ? " oneline" : ""}${
    !tappable && st.kind !== "locked" ? " locked" : ""}`;
  if (!tappable) return `<div class="${cls}" aria-disabled="true">${inner}</div>`;
  return `<a class="${cls}" href="#/learn/${id}">${inner}</a>`;
}

// One level as a collapsible group. `open` is decided by the caller — exactly the
// level holding the current lesson — so opening Learn lands you on the row you
// are meant to tap, not on 5,900px of everything.
function levelBlock(level, st, open) {
  // Curriculum entries carry no level field — the id prefix ("4.07") is the level.
  const rows = CURRICULUM.filter(c => c.id.startsWith(level + "."));
  const gates = rows.filter(c => c.status !== "known");
  const done = gates.filter(c => st.get(c.id).kind === "done").length;
  const frac = gates.length ? done / gates.length : 0;
  return `
    <details class="lvl-group"${open ? " open" : ""}>
      <summary class="lvl-head">
        <span class="lvl-chev" aria-hidden="true">›</span>
        <h2>Level ${level}</h2>
        <span class="lvl-bar" aria-hidden="true"><i style="width:${Math.round(frac * 100)}%"></i></span>
        <span class="lvl-count">${done} / ${gates.length}</span>
      </summary>
      <div class="lvl-body">${rows.map(c => row(c, st.get(c.id))).join("")}</div>
    </details>`;
}

// Levels present in the curriculum, in order — derived from the ids, so adding
// a Level 6 curriculum block makes it appear here with no code change.
function levels() {
  return [...new Set(CURRICULUM.map(c => c.id.split(".")[0]))]
    .sort((a, b) => Number(a) - Number(b));
}

function renderSyllabus(mount) {
  const st = states();
  const gates = CURRICULUM.filter(c => c.status !== "known");
  const done = gates.filter(c => st.get(c.id).kind === "done").length;
  const known = CURRICULUM.length - gates.length;
  const lv = levels();
  const span = lv.length === 1 ? `Level ${lv[0]}` : `Levels ${lv[0]}–${lv[lv.length - 1]}`;

  // The level to open: the one holding the "current" lesson. When every lesson
  // is done there is no current row, so fall back to the last level rather than
  // opening nothing and showing a screen of bare headings.
  const cur = CURRICULUM.find(c => st.get(c.id).kind === "current");
  const openLv = cur ? cur.id.split(".")[0] : lv[lv.length - 1];

  mount.innerHTML = `
    <h1>Learn</h1>
    <p class="muted small">TTMIK ${span} · ${done} of ${gates.length} lessons done · ${known} already known from Anki</p>
    ${lv.map(l => levelBlock(l, st, l === openLv)).join("")}`;
}
