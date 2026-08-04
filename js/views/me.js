// js/views/me.js — the Me tab: streak, last-30-days history, totals, settings,
// backup.
//
// This view owns NO numbers of its own. Everything is read from the module that
// owns it, so nothing is computed twice:
//   streak()/syncToday()/dayKey()/LEGS  → js/views/today.js  (the day math)
//   counts()/newPerDay()/setNewPerDay() → js/views/cards.js  (deck + new-card cap)
//   store.exportAll()/importAll()       → js/store.js        (backup)
// syncToday() is called before rendering for the same reason Today calls it: the
// legs finished elsewhere must be recorded before the streak is read, whichever
// tab the user opens first.
import { register as route } from "../router.js";
import { CURRICULUM } from "../../content/curriculum.js";
import { store } from "../store.js";
import { streak, syncToday, dayKey, LEGS } from "./today.js";
import { counts, newPerDay, setNewPerDay } from "./cards.js";
import { speak, hasKorean, cancel as cancelSpeech } from "../tts.js";

const WINDOW = 30;             // days in the calendar + retention strip
const RATE_MIN = 0.5, RATE_MAX = 1.2, RATE_STEP = 0.05;
const SAMPLE = "안녕하세요, 오늘도 공부해요.";   // TTS-rate audition line

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function ttsRate() {
  const r = store.settings().ttsRate;
  return typeof r === "number" && r >= RATE_MIN && r <= RATE_MAX ? r : 1;
}
function setTtsRate(r) {
  const s = store.settings();
  s.ttsRate = Math.round(Math.min(RATE_MAX, Math.max(RATE_MIN, r)) * 100) / 100;
  store.setSettings(s);
}

// The last WINDOW days, oldest first: { key, label, legs, right, wrong, acc }.
// `acc` is null when the day has no graded answers at all — the retention strip
// must render those as GAPS, not as 0%.
function history() {
  const days = store.days();
  const now = new Date();
  const out = [];
  for (let i = WINDOW - 1; i >= 0; i--) {
    const t = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = dayKey(t);
    const d = days[key] || null;
    const done = d && Array.isArray(d.done) ? d.done : [];
    const right = d && typeof d.right === "number" ? d.right : 0;
    const wrong = d && typeof d.wrong === "number" ? d.wrong : 0;
    const n = right + wrong;
    out.push({
      key,
      label: t.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      legs: LEGS.filter(l => done.indexOf(l) >= 0).length,
      right, wrong,
      acc: n ? Math.round((right / n) * 100) : null,
      touched: n > 0 || done.length > 0
    });
  }
  return out;
}

// One dot per day, filled by how much of the plan was done. A day with activity
// but no completed leg still gets a faint dot — it happened, it just didn't count.
function dotCal(hist) {
  return `<div class="dotcal" role="img" aria-label="Plan parts completed on each of the last ${WINDOW} days">
    ${hist.map(h => {
      const cls = h.legs ? `l${h.legs}` : (h.touched ? "some" : "");
      return `<i class="dot ${cls}" title="${esc(h.label)}: ${h.legs} of ${LEGS.length} done${
        h.acc === null ? "" : ` · ${h.acc}% right`}"></i>`;
    }).join("")}
  </div>`;
}

// Per-day accuracy bar. Days with no graded answers render as a gap column with a
// baseline tick — never a zero-height bar, which would read as 0% accuracy.
function retention(hist) {
  const graded = hist.filter(h => h.acc !== null);
  const right = graded.reduce((a, h) => a + h.right, 0);
  const wrong = graded.reduce((a, h) => a + h.wrong, 0);
  const avg = right + wrong ? Math.round((right / (right + wrong)) * 100) : null;
  return `
    <div class="retstrip" role="img" aria-label="Accuracy per day over the last ${WINDOW} days">
      ${hist.map(h => h.acc === null
        ? `<span class="rcol gap" title="${esc(h.label)}: no answers"><i class="nodata"></i></span>`
        : `<span class="rcol" title="${esc(h.label)}: ${h.acc}% (${h.right} right, ${h.wrong} wrong)">
             <i class="rbar" style="height:${Math.max(3, h.acc)}%"></i></span>`).join("")}
    </div>
    <div class="retfoot muted small">
      <span>${esc(hist[0].label)}</span>
      <span>${graded.length ? `${graded.length} active day${graded.length === 1 ? "" : "s"} · ${avg}% overall` : "no answers yet"}</span>
      <span>${esc(hist[hist.length - 1].label)}</span>
    </div>`;
}

export function register() {
  route("/me", mount => renderMe(mount));
}

function renderMe(mount) {
  let pending = null;          // { name, text, keys } waiting for import confirmation
  let error = "";              // import validation message
  let revoke = null;           // pending object-URL revoke timer

  const gates = CURRICULUM.filter(c => c.status !== "known");

  function draw() {
    syncToday();                       // record today's legs before reading the streak
    const hist = history();
    const s = streak();
    const c = counts();
    const saved = store.lessons();
    const lessonsDone = gates.filter(g => saved[g.id] && saved[g.id].done).length;
    const rate = ttsRate();

    mount.innerHTML = `
      <h1>Me</h1>

      <div class="card">
        <h4>Streak</h4>
        <div class="streakline">
          <span class="streaknum">${s}</span>
          <span class="streaklab">day${s === 1 ? "" : "s"} with all three parts done</span>
        </div>
        ${dotCal(hist)}
        <p class="muted small">Last ${WINDOW} days, oldest first. A full dot is a day
          you finished the lesson, the cards and a dictation round.</p>
      </div>

      <div class="card">
        <h4>Retention</h4>
        ${retention(hist)}
        <p class="muted small">Share of typed answers you got right each day, across
          lessons, cards and dictation. Days you did nothing are gaps, not zeros.</p>
      </div>

      <div class="card">
        <h4>Totals</h4>
        <div class="deckcounts">
          <div class="dc due"><b>${lessonsDone}</b><span>of ${gates.length} lessons</span></div>
          <div class="dc new"><b>${c.seen}</b><span>cards seen</span></div>
          <div class="dc learn"><b>${c.words}</b><span>words in deck</span></div>
        </div>
      </div>

      <div class="card">
        <h4>Settings</h4>
        <div class="optrow">
          <span class="grow muted small">Speech rate</span>
          <span class="npdval" id="rateval">${rate.toFixed(2)}×</span>
        </div>
        <input class="slider" id="rate" type="range" min="${RATE_MIN}" max="${RATE_MAX}"
               step="${RATE_STEP}" value="${rate}" aria-label="Korean speech rate" />
        ${hasKorean()
          ? `<button class="btn secondary wide" type="button" id="test">🔊 Hear this rate</button>`
          : `<p class="muted small">No Korean voice is installed, so nothing will play — the rate is still saved for later.</p>`}
        <div class="optrow spacedrow">
          <span class="grow muted small">New cards per day</span>
          <button class="btn ghost stepbtn" type="button" id="npdm" aria-label="Fewer new cards per day">−</button>
          <span class="npdval" id="npdval">${newPerDay()}</span>
          <button class="btn ghost stepbtn" type="button" id="npdp" aria-label="More new cards per day">+</button>
        </div>
        <p class="muted small">Both settings are shared with the rest of the app — the
          Cards deck screen shows the same limit.</p>
      </div>

      <div class="card">
        <h4>Backup</h4>
        <p class="muted small">Everything lives in this browser only. A backup is a single
          JSON file of every <code>kov2.</code> key — lessons, cards, days, weak items,
          settings.</p>
        <button class="btn wide" type="button" id="dl">⤓ Download backup</button>
        <div class="navrow">
          <input class="filein" id="imp" type="file" accept="application/json,.json"
                 aria-label="Choose a backup file to import" />
          <label class="btn secondary grow" for="imp">↥ Import a backup…</label>
        </div>
        ${error ? `<p class="fb bad">${esc(error)}</p>` : ""}
        ${pending ? `
          <div class="confirmbox">
            <b>Import ${esc(pending.name)}?</b>
            <p class="muted small">${pending.keys} key${pending.keys === 1 ? "" : "s"} in the file.
              Importing REPLACES every matching key in this browser — lessons, cards,
              days, settings — and keeps any key the file does not mention. This cannot
              be undone.</p>
            <div class="navrow">
              <button class="btn" type="button" id="impgo">Replace my data</button>
              <button class="btn secondary" type="button" id="impno">Cancel</button>
            </div>
          </div>` : ""}
      </div>`;

    wire();
  }

  function wire() {
    const slider = mount.querySelector("#rate");
    const rateval = mount.querySelector("#rateval");
    slider.addEventListener("input", () => {
      const v = parseFloat(slider.value);
      setTtsRate(v);
      rateval.textContent = ttsRate().toFixed(2) + "×";
    });
    const test = mount.querySelector("#test");
    if (test) test.addEventListener("click", () => speak(SAMPLE, ttsRate()));

    mount.querySelector("#npdm").addEventListener("click", () => { setNewPerDay(newPerDay() - 5); draw(); });
    mount.querySelector("#npdp").addEventListener("click", () => { setNewPerDay(newPerDay() + 5); draw(); });

    mount.querySelector("#dl").addEventListener("click", download);
    mount.querySelector("#imp").addEventListener("change", e => {
      const f = e.target.files && e.target.files[0];
      if (f) read(f);
    });

    const go = mount.querySelector("#impgo");
    if (go) go.addEventListener("click", doImport);
    const no = mount.querySelector("#impno");
    if (no) no.addEventListener("click", () => { pending = null; error = ""; draw(); });
  }

  // Blob + object URL, filename kov2-backup-YYYY-MM-DD.json (dayKey() is the
  // same local date the day records use).
  function download() {
    const url = URL.createObjectURL(new Blob([store.exportAll()], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `kov2-backup-${dayKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoked on a timer: some browsers still need the URL alive when the click
    // returns. Cleared by the router teardown if the user navigates first.
    if (revoke) clearTimeout(revoke);
    revoke = setTimeout(() => { revoke = null; URL.revokeObjectURL(url); }, 2000);
  }

  // Read + validate the chosen file. Nothing is written until the confirm card
  // is answered.
  function read(file) {
    const fr = new FileReader();
    fr.onload = () => {
      pending = null;
      error = "";
      try {
        const o = JSON.parse(String(fr.result));
        const keys = Object.keys(o).filter(k => k.indexOf("kov2.") === 0);
        if (!keys.length) error = "That file has no kov2. keys — it is not a backup of this app.";
        else pending = { name: file.name, text: String(fr.result), keys: keys.length };
      } catch {
        error = "That file is not valid JSON.";
      }
      draw();
    };
    fr.onerror = () => { pending = null; error = "Could not read that file."; draw(); };
    fr.readAsText(file);
  }

  function doImport() {
    if (!pending) return;
    try {
      store.importAll(pending.text);
      pending = null;
      error = "";
    } catch {
      error = "Import failed — the file could not be applied.";
    }
    draw();                    // re-read everything from the restored storage
    window.scrollTo(0, 0);
  }

  draw();
  // Router teardown: stop the audition utterance and drop the pending revoke.
  return () => {
    cancelSpeech();
    if (revoke) { clearTimeout(revoke); revoke = null; }
  };
}
