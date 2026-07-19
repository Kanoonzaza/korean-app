import { register as route } from "../router.js";

export function register() {
  route("/practice", (mount) => {
    mount.innerHTML = `
      <h1>Practice</h1>
      <div class="card">
        <h4>Practice hub</h4>
        <p class="muted">Placeholder hub. Links to cards, dictation, reading and podcasts.</p>
        <p>
          <a href="#/practice/cards">Cards</a> ·
          <a href="#/practice/dictation">Dictation</a> ·
          <a href="#/practice/reading">Reading</a> ·
          <a href="#/practice/podcasts">Podcasts</a>
        </p>
      </div>`;
  });
}
