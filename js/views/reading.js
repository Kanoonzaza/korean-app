import { register as route } from "../router.js";

export function register() {
  route("/practice/reading", (mount) => {
    mount.innerHTML = `
      <h1>Reading</h1>
      <div class="card">
        <h4>Reading view</h4>
        <p class="muted">Placeholder — reading passages land in a later task.</p>
      </div>`;
  });
}
