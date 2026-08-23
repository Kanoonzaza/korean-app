// js/update.js — registers the service worker and surfaces "a new version is ready".
//
// sw.js installs a new worker but leaves it WAITING (no skipWaiting there). This
// module is the only thing that ever asks it to take over, and it only asks after
// the user taps Reload. The reason is cache-first serving: if a new worker
// activated mid-session, the running page would keep its already-imported old
// modules while the cache started handing out new ones — mismatched halves of two
// versions, which shows up as "my change only appears after reloading twice".
//
// The handshake:
//   new worker reaches `installed` (and a controller already exists → it is an
//   UPDATE, not the first install)  → show the bar
//   user taps Reload → postMessage("skipWaiting") → worker activates
//   → `controllerchange` fires → reload once, so every module comes up together.

const BAR_ID = "updatebar";

export function watchForUpdates() {
  if (!location.protocol.startsWith("http") || !("serviceWorker" in navigator)) return;

  navigator.serviceWorker.register("sw.js").then(reg => {
    // A worker that finished installing during an earlier visit and is still
    // waiting. Guarded on `controller` for the same first-install reason below.
    if (reg.waiting && navigator.serviceWorker.controller) show(reg.waiting);

    reg.addEventListener("updatefound", () => {
      const sw = reg.installing;
      if (!sw) return;
      sw.addEventListener("statechange", () => {
        // `installed` with NO existing controller is the very first install on
        // this device — the page is already the newest thing there is, so the
        // bar would be nonsense. Only an update has a controller to replace.
        if (sw.state === "installed" && navigator.serviceWorker.controller) show(sw);
      });
    });
  }).catch(() => { /* no SW (private mode, unsupported) — the app still works online */ });

  // The new worker has taken over. Reload once so the document and every module
  // come from the new cache together. The flag stops the loop some browsers cause
  // by firing this more than once.
  let reloading = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloading) return;
    reloading = true;
    location.reload();
  });
}

function show(worker) {
  const bar = document.getElementById(BAR_ID);
  if (!bar || !bar.hidden) return;          // missing, or already showing
  const btn = bar.querySelector("button");
  bar.hidden = false;
  btn.addEventListener("click", () => {
    btn.disabled = true;
    btn.textContent = "Updating…";
    worker.postMessage("skipWaiting");
  }, { once: true });
}
