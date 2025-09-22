const CACHE_NAME = "codemaster-cache-v1";
const urlsToCache = [
  "/", // resolves to /Code-Master/
  "/index.html",
  "/auth.html",
  "/reset-password.html",
  "/forgot-password.html",
  "/exercises.html",
  "/code-playground.html",
  "/lesson.html",
  "/lesson-html.html",
  "/lesson-css.html",
  "/lesson-js.html",
  "/lesson-java.html",
  "/lesson-csharp.html",
  "/style.css",
  "/DarkTheme.js",

  // Profile section
  "/userprofile/profile.html",
  "/userprofile/style.css",
  "/userprofile/script.js",

  // Shared scripts
  "/scripts/navToggle.js",
  "/scripts/session-check.js",
  "/scripts/searchBar.js",
  "/scripts/DarkTheme.js",
  "/scripts/badge.js",

  // Vite/src assets
  "/src/style.css",
  "/src/main.js",
  "/src/counter.js",
  "/src/javascript.svg"
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
