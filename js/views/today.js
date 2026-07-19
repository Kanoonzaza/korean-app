import { register as route } from "../router.js";

export function register() {
  route("/today", (mount) => {
    mount.innerHTML = `
      <h1>Today</h1>
      <div class="card">
        <h4>Today view</h4>
        <p class="muted">Placeholder — the daily flow lands in a later task.</p>
      </div>`;
  });
}
