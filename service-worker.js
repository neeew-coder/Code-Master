const CACHE_NAME = "codemaster-cache-v1";
const urlsToCache = [
  "/Code-Master/",
  "/Code-Master/index.html",
  "/Code-Master/auth.html",
  "/Code-Master/reset-password.html",
  "/Code-Master/excercises.html",
  "/Code-Master/lessons.html",
  "/Code-Master/lesson-html.html",
  "/Code-Master/lesson-css.html",
  "/Code-Master/lesson-java.html",
  "/Code-Master/lesson-js.html",
  "/Code-Master/lesson-csharp.html",
  "/Code-Master/about.html",
  "/Code-Master/code-playground.html",
  "/Code-Master/styles.css",
  "/Code-Master/DarkTheme.css",
  "/Code-Master/scripts/badges.js",
  "/Code-Master/scripts/DarkTheme.js",
  "/Code-Master/scripts/session-check.js",
  "/Code-Master/scripts/searchBar.js",
  "/Code-Master/scripts/navToggle.js",
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
