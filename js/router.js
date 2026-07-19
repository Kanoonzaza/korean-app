// Hash router. Routes are exact prefixes; longest match wins.
const routes = [];                     // [{prefix, render(params)}]
export function register(prefix, render) { routes.push({ prefix, render }); }
export function go(hash) { location.hash = hash; }
export function current() { return location.hash.replace(/^#/, "") || "/today"; }
export function start() {
  window.addEventListener("hashchange", renderCurrent);
  renderCurrent();
}
function renderCurrent() {
  const path = current();
  const r = [...routes].sort((a, b) => b.prefix.length - a.prefix.length)
    .find(r => path === r.prefix || path.startsWith(r.prefix + "/"));
  const mount = document.getElementById("view");
  mount.innerHTML = "";
  if (r) r.render(mount, path.slice(r.prefix.length).replace(/^\//, ""));
  document.querySelectorAll("nav a").forEach(a =>
    a.classList.toggle("active", path.startsWith(a.getAttribute("href").slice(1))));
}
