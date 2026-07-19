import { register as route } from "../router.js";

export function register() {
  route("/practice/podcasts", (mount) => {
    mount.innerHTML = `
      <h1>Podcasts</h1>
      <div class="card">
        <h4>Listening view</h4>
        <p class="muted">Placeholder — podcast listening lands in a later task.</p>
      </div>`;
  });
}
