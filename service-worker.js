const CACHE_NAME = "codemaster-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/auth.html",
  "/reset-password.html",
  "/style.css",
  "/script.js",
  "https://cdn.tailwindcss.com"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
