/* Service Worker — Which is Cheaper?
   Cache-first strategy for app shell, so the app works fully offline. */

const CACHE_NAME = "cheaper-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./LICENSE",
  "./manifest.json",
  "./favicon.ico",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png",
  "./icon-192.png",
  "./icon-512.png"
];

/* Install: pre-cache the app shell */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn("SW install: some assets failed to cache", err))
  );
});

/* Activate: clean up old cache versions */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k.startsWith('cheaper-v') && k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* Fetch: cache-first, network fallback, offline fallback */
self.addEventListener("fetch", (event) => {
  const licenseUrl = new URL('./LICENSE', self.registration.scope).href;
  if (event.request.method === 'GET' && event.request.url === licenseUrl) {
    event.respondWith(caches.open(CACHE_NAME).then(cache => cache.match(event.request)).then(cached => cached || fetch(event.request)));
    return;
  }
  const req = event.request;

  // Only handle GET requests
  if (req.method !== "GET") return;

  // Skip cross-origin (e.g. PayPal link, external images)
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((response) => {
        // Only cache successful, same-origin basic responses
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return response;
      }).catch(() => {
        // Offline fallback: serve index.html for navigation requests
        if (req.mode === "navigate") {
          return caches.match("./index.html");
        }
      });
    })
  );
});