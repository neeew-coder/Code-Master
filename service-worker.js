const CACHE_NAME = "codemaster-cache-v1";
const urlsToCache = [
  "/Code-Master/",
  "/Code-Master/index.html",
  "/Code-Master/auth.html",
  "/Code-Master/reset-password.html",
  "https://cdn.tailwindcss.com"
];

// ✅ Install and cache assets
self.addEventListener("install", (event) => {
  console.log("📦 Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`⚠️ Failed to cache ${url}:`, err);
          })
        )
      );
    })
  );
});

// ✅ Activate and clean old caches
self.addEventListener("activate", (event) => {
  console.log("🚀 Service Worker activated");
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Removing old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// ✅ Serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
