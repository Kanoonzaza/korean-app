import { register as route } from "../router.js";

export function register() {
  route("/practice/cards", (mount) => {
    mount.innerHTML = `
      <h1>Cards</h1>
      <div class="card">
        <h4>Cards view</h4>
        <p class="muted">Placeholder — the SRS card session lands in a later task.</p>
      </div>`;
  });
}
