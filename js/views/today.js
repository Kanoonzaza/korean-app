import { register as route } from "../router.js";

export function register() {
  route("/today", (mount) => {
    mount.innerHTML = `
      <h1>Today</h1>
      <div class="card">
        <h4>Today view</h4>
        <p class="muted">Placeholder — the daily flow lands in a later task.</p>
      </div>`;
    // Teardown convention: return a cleanup function and the router calls it
    // before the next view renders (stop TTS, clear timers, pause audio).
    // This stub has nothing to tear down — returning undefined is fine too.
    return () => { /* nothing to clean up yet */ };
  });
}
