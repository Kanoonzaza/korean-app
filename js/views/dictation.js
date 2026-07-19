import { register as route } from "../router.js";

export function register() {
  route("/practice/dictation", (mount) => {
    mount.innerHTML = `
      <h1>Dictation</h1>
      <div class="card">
        <h4>Dictation view</h4>
        <p class="muted">Placeholder — the dictation drill lands in a later task.</p>
      </div>`;
  });
}
