// Hash router. Routes are exact prefixes; longest match wins.
//
// Teardown convention: a view's render(mount, params) may RETURN a cleanup
// function. The router stores it and calls it (try/catch-guarded) right
// before the next render. Later views use this to stop TTS, clear timers,
// and pause audio when the user navigates away. Returning undefined is fine.
const routes = [];                     // [{prefix, render(mount, params)}], longest prefix first
let cleanup = null;                    // teardown returned by the current view, if any
export function register(prefix, render) {
  routes.push({ prefix, render });
  routes.sort((a, b) => b.prefix.length - a.prefix.length); // sort once, at registration
}
export function go(hash) { location.hash = hash; }
export function current() { return location.hash.replace(/^#/, "") || "/today"; }
export function start() {
  window.addEventListener("hashchange", renderCurrent);
  renderCurrent();
}
function renderCurrent() {
  if (cleanup) { try { cleanup(); } catch { /* teardown must never break navigation */ } }
  cleanup = null;
  const path = current();
  const r = routes.find(r => path === r.prefix || path.startsWith(r.prefix + "/"));
  const mount = document.getElementById("view");
  mount.innerHTML = "";
  if (r) {
    const ret = r.render(mount, path.slice(r.prefix.length).replace(/^\//, ""));
    if (typeof ret === "function") cleanup = ret;
  } else {
    mount.innerHTML = `
      <h1>Not found</h1>
      <div class="card">
        <h4>Page not found</h4>
        <p class="muted">Nothing lives at <code>${path.replace(/[<>&"']/g, "")}</code>.</p>
        <p><a href="#/today">Go to Today</a></p>
      </div>`;
  }
  document.querySelectorAll("nav a").forEach(a => {
    const p = a.getAttribute("href").slice(1);
    const active = path === p || path.startsWith(p + "/");
    a.classList.toggle("active", active);
    if (active) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}
