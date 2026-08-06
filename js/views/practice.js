// js/views/practice.js — the Practice hub.
//
// Five entries, each a tappable card: Cards, Dictation, Weak items, Reading,
// Podcasts. The hub owns no drill logic of its own; every count comes from the
// view that owns the data (counts() from cards.js, poolFor() from dictation.js,
// weakCount() from weak.js, the content arrays for reading/podcasts) so no
// number is computed in two places.
//
// The badges are read at render time, not cached — coming back from a round with
// the bottom nav re-renders the hub and the numbers move.
import { register as route } from "../router.js";
import { counts } from "./cards.js";
import { poolFor } from "./dictation.js";
import { weakCount } from "./weak.js";
import { READINGS } from "../../content/readings.js";
import { PODCASTS } from "../../content/podcasts.js";
import { store } from "../store.js";

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// Passages finished at least once — a soft "how far in are you" for the row.
function readDone() {
  const saved = store.reading();
  return READINGS.filter(r => saved[r.id] && typeof saved[r.id].best === "number").length;
}

export function register() {
  route("/practice", mount => {
    const c = counts();
    const due = c.nw + c.learn + c.due;
    const weak = weakCount();
    const done = readDone();

    // [href, glyph, title, one-line description, badge html, tone]
    // `tone` is the per-activity colour class defined in css/style.css — the same
    // one Today's legs use, so Cards is the same violet in both places.
    const rows = [
      ["#/practice/cards", "🃏", "Cards",
        "Anki-style flashcards beyond your Core 5k deck.",
        due ? `<span class="badge">${due} due</span>` : `<span class="tag">all done</span>`, "cards"],
      ["#/practice/dictation", "🎧", "Dictation",
        "Hear a sentence you already know, type what you heard.",
        `<span class="tag">${poolFor("all").length} sentences</span>`, "dict"],
      ["#/practice/weak", "🩹", "Weak items",
        "Everything you have missed, until you get it right.",
        weak ? `<span class="badge">${weak}</span>` : `<span class="tag">empty</span>`, "weak"],
      ["#/practice/reading", "📖", "Reading",
        "Graded passages with tap-to-gloss words and questions.",
        `<span class="tag">${done} / ${READINGS.length}</span>`, "read"],
      ["#/practice/podcasts", "📡", "Podcasts",
        "Free Korean shows for immersion (needs a connection).",
        `<span class="tag">${PODCASTS.length} shows</span>`, "pod"],
    ];

    mount.innerHTML = `
      <h1>Practice</h1>
      <p class="muted small">Everything that isn't a lesson. Pick whatever the day has room for.</p>
      <div class="hubgrid">
        ${rows.map(([href, glyph, title, desc, badge, tone]) => `
          <a class="hubcard tone-${esc(tone)}" href="${esc(href)}">
            <span class="hubglyph" aria-hidden="true">${glyph}</span>
            <span class="grow">
              <span class="hubhead"><span class="hubtitle">${esc(title)}</span>${badge}</span>
              <span class="muted small hubdesc">${esc(desc)}</span>
            </span>
            <span class="hubchev" aria-hidden="true">›</span>
          </a>`).join("")}
      </div>`;
  });
}
