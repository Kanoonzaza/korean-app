/* sw.js — offline support for the Korean app.
 * Strategy: NETWORK-FIRST for same-origin files (so editing lessons.js and
 * refreshing always shows fresh content when online), with a cache fallback
 * when offline. Cross-origin requests (fonts, podcast embeds) are left to the
 * network and simply fail gracefully offline.
 */
var CACHE = "korean-app-v2";
var ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./icon.svg",
  "./manifest.webmanifest",
  "./content/lessons.js",
  "./content/podcasts.js",
  "./js/storage.js",
  "./js/tts.js",
  "./js/quiz.js",
  "./js/practice.js",
  "./js/review.js",
  "./js/listening.js",
  "./js/app.js"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var sameOrigin = new URL(e.request.url).origin === self.location.origin;
  if (!sameOrigin) return; // let cross-origin (fonts, Spotify) hit the network directly

  e.respondWith(
    fetch(e.request).then(function (res) {
      var copy = res.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy); }).catch(function () {});
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (r) {
        return r || caches.match("./index.html");
      });
    })
  );
});
