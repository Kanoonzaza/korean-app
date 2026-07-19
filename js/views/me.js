import { register as route } from "../router.js";

export function register() {
  route("/me", (mount) => {
    mount.innerHTML = `
      <h1>Me</h1>
      <div class="card">
        <h4>Me view</h4>
        <p class="muted">Placeholder — progress, settings and backup land in a later task.</p>
      </div>`;
  });
}
