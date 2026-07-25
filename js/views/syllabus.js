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

// Row glyph per state. "known" rows use a plain "·" hardcoded in the template
// (they are dimmed and unclickable), so they need no entry here.
const MARK = { done: "✓", current: "▶", locked: "🔒" };

function row(c, st) {
  const id = esc(c.id), title = esc(c.title), point = esc(c.point);

  if (st.kind === "known") {
    return `<div class="lrow known">
      <span class="mark" aria-hidden="true">·</span>
      <div class="lrow-body">
        <div class="lhead"><span class="lid">${id}</span> <span class="ltitle">${title}</span></div>
        <div class="lmeta"><span class="lpoint ko">${point}</span> <span class="muted small">known from Anki</span></div>
      </div>
    </div>`;
  }

  const tappable = (st.kind === "done" || st.kind === "current") && hasBody(c.id);
  const best = st.rec && typeof st.rec.best === "number" ? st.rec.best : null;
  const inner = `
    <span class="mark" aria-hidden="true">${MARK[st.kind]}</span>
    <div class="lrow-body">
      <div class="lhead"><span class="lid">${id}</span> <span class="ltitle">${title}</span></div>
      <div class="lmeta"><span class="lpoint ko">${point}</span>${
        st.kind === "current" ? ` <span class="badge">up next</span>` : ""
      }${best !== null ? ` <span class="lbest">best ${best}%</span>` : ""}</div>
      ${tappable && c.canDo ? `<div class="lcando">${esc(c.canDo)}</div>` : ""}
    </div>`;

  if (!tappable) {
    return `<div class="lrow locked" aria-disabled="true">${inner}</div>`;
  }
  return `<a class="lrow ${st.kind}" href="#/learn/${id}">${inner}</a>`;
}

function levelBlock(level, st) {
  // Curriculum entries carry no level field — the id prefix ("4.07") is the level.
  const rows = CURRICULUM.filter(c => c.id.startsWith(level + "."));
  const gates = rows.filter(c => c.status !== "known");
  const done = gates.filter(c => st.get(c.id).kind === "done").length;
  return `
    <div class="lvl-head">
      <h2>Level ${level}</h2>
      <span class="lvl-count">${done} / ${gates.length} done</span>
    </div>
    ${rows.map(c => row(c, st.get(c.id))).join("")}`;
}

function renderSyllabus(mount) {
  const st = states();
  const gates = CURRICULUM.filter(c => c.status !== "known");
  const done = gates.filter(c => st.get(c.id).kind === "done").length;
  const known = CURRICULUM.length - gates.length;
  mount.innerHTML = `
    <h1>Learn</h1>
    <p class="muted small">TTMIK Levels 4–5 · ${done} of ${gates.length} lessons done · ${known} already known from Anki</p>
    ${levelBlock(4, st)}
    ${levelBlock(5, st)}`;
}
