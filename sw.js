// Placeholder service worker. Task 12 replaces this with the real
// offline-caching worker (precache + runtime cache + update flow).
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("fetch", () => {});
