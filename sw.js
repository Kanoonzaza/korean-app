/* sw.js — offline service worker for 한국어 Study (v2).
 *
 * Strategy: precache everything, then serve cache-first.
 * The app is a fixed set of static files (no API, no user-generated remote
 * data — progress lives in localStorage), so the whole thing fits in one
 * versioned cache and there is no runtime-cache tier to reason about.
 *
 * PRECACHE is the complete module graph, derived from the `import` statements
 * in js/ plus the shell assets:
 *   shell    index.html, manifest.webmanifest, css/style.css, 4 icons
 *   engines  js/main.js router store srs grader tts level update
 *   views    js/views/*.js  (10 — every one is imported by js/main.js)
 *   content  the content modules the views import, incl. lessons/index.js
 * content/known.js is deliberately NOT here: no app module imports it. It is a
 * generated artifact of tools/build_from_anki.py, read only by
 * tools/test_build_from_anki.py.
 *
 * ADDING A LEVEL: a new content/lessons/lN.js must be added to the list below
 * AND to LESSON_SETS in content/lessons/index.js, and CACHE bumped. The list is
 * deliberately static — see docs/EXTENDING.md.
 *
 * UPDATING: bump CACHE below whenever any precached file changes. Old caches
 * are deleted on activate, so the next load after the new worker takes over
 * serves the new files. (Browsers always revalidate sw.js itself, so a changed
 * CACHE string is enough to trigger the whole refresh.)
 *
 * A new worker does NOT take over on its own: install deliberately does not call
 * skipWaiting(). With cache-first serving, activating mid-session would leave the
 * running page holding old modules while the cache hands out new ones — the
 * "reload twice and it's fine" bug. The worker waits until the page asks, via the
 * message handler at the bottom; js/update.js owns that ask.
 */
const CACHE = "kov2-v3";

const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./css/style.css",

  "./js/main.js",
  "./js/router.js",
  "./js/store.js",
  "./js/srs.js",
  "./js/grader.js",
  "./js/tts.js",
  "./js/level.js",
  "./js/update.js",

  "./js/views/today.js",
  "./js/views/syllabus.js",
  "./js/views/lesson.js",
  "./js/views/practice.js",
  "./js/views/cards.js",
  "./js/views/dictation.js",
  "./js/views/reading.js",
  "./js/views/listening.js",
  "./js/views/weak.js",
  "./js/views/me.js",

  "./content/curriculum.js",
  "./content/wordsnext.js",
  "./content/ttmik-sentences.js",
  "./content/readings.js",
  "./content/podcasts.js",
  "./content/lessons/index.js",
  "./content/lessons/l4.js",
  "./content/lessons/l5.js",

  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // {cache: "reload"} so install never precaches a stale HTTP-cached copy.
    await cache.addAll(PRECACHE.map(u => new Request(u, { cache: "reload" })));
    // No skipWaiting() here on purpose — see the header. The worker waits.
  })());
});

// The page asking the waiting worker to take over. Only ever sent from the
// "Reload" button in js/update.js, so a session is never swapped underneath the
// user; controllerchange then reloads the page onto the new cache in one go.
self.addEventListener("message", event => {
  if (event.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Cross-origin (Spotify/YouTube embeds on the Podcasts page) goes straight to
  // the network: nothing to cache, and it must fail loudly-but-harmlessly offline.
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);

    // Any hash route ("#/practice/cards") is still a request for index.html, but
    // a deep path or a "?" query would miss — fall back to the cached shell so
    // every route boots offline.
    if (req.mode === "navigate") {
      return (await cache.match(req, { ignoreSearch: true })) ||
             (await cache.match("./index.html")) ||
             fetch(req);
    }

    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;

    try {
      const res = await fetch(req);
      // Same-origin extras (a newly added lesson file, say) join the cache so a
      // second visit has them offline. Opaque/error responses are not cached.
      if (res && res.ok && res.type === "basic") cache.put(req, res.clone());
      return res;
    } catch (err) {
      // Offline and not precached: let the caller see a real network failure.
      throw err;
    }
  })());
});
