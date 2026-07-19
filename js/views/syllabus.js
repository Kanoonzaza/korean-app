import { register as route } from "../router.js";

export function register() {
  route("/learn", (mount, params) => {
    // Task 7 will split this into a syllabus list + lesson player.
    // For now the same stub covers /learn and any /learn/<id> sub-path.
    mount.innerHTML = `
      <h1>Learn</h1>
      <div class="card">
        <h4>Syllabus view</h4>
        <p class="muted">Placeholder${params ? ` — lesson "${params}"` : ""}. Lessons land in a later task.</p>
      </div>`;
  });
}
