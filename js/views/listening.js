// js/views/listening.js — the podcast library (content/podcasts.js).
//
// Ported from v1/js/listening.js. Nothing is stored or hosted here: shows with a
// known Spotify id get the official embed, everything else links out. The
// players are iframes, so this is the one view in the app that genuinely needs a
// connection — the copy says so, and the rest of the app stays offline-capable.
//
// No store writes: listening isn't graded, so it never touches days/weak.
import { register as route } from "../router.js";
import { PODCASTS } from "../../content/podcasts.js";

function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function card(p) {
  // Buttons, not inline links: an 18px-tall text link is not a phone tap target.
  const links = [];
  if (p.youtube) links.push(`<a class="btn ghost" href="${esc(p.youtube)}" target="_blank" rel="noopener">YouTube ↗</a>`);
  if (p.site) links.push(`<a class="btn ghost" href="${esc(p.site)}" target="_blank" rel="noopener">Website ↗</a>`);

  const embed = p.spotifyEmbed
    ? `<div class="embedwrap"><iframe loading="lazy" src="${esc(p.spotifyEmbed)}"
         width="100%" height="152" frameborder="0" title="${esc(p.name)} player"
         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
         allowfullscreen></iframe></div>`
    : `<p class="muted small">Open on YouTube or the website below to listen.</p>`;

  return `
    <div class="card">
      <div class="crumb">
        <h3>${esc(p.name)}</h3>
        <span class="tag">${esc(p.level)}</span>
      </div>
      <p class="muted small">${esc(p.blurb)}</p>
      ${embed}
      ${links.length ? `<div class="navrow plinks">${links.join("")}</div>` : ""}
    </div>`;
}

export function register() {
  route("/practice/podcasts", mount => {
    mount.innerHTML = `
      <h1>Podcasts</h1>
      <p class="muted small">Free Korean podcasts for immersion — ${PODCASTS.length} shows.
        The players stream from Spotify and YouTube, so this page needs an internet
        connection; everything else in the app works offline.</p>
      ${PODCASTS.map(card).join("") || `<div class="card"><p class="muted">No podcasts configured.</p></div>`}
      <div class="navrow"><a class="btn secondary" href="#/practice">← Practice</a></div>`;
  });
}
