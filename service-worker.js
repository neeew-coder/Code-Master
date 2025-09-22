const CACHE_NAME = "codemaster-cache-v2";
const urlsToCache = [
  // Main pages
  "/Code-Master/",
  "/Code-Master/index.html",
  "/Code-Master/exercises.html",
  "/Code-Master/code-playground.html",
  "/Code-Master/lessons.html",
  "/Code-Master/lesson-html.html",
  "/Code-Master/lesson-css.html",
  "/Code-Master/lesson-js.html",
  "/Code-Master/lesson-java.html",
  "/Code-Master/lesson-csharp.html",

  // Styles and scripts
  "/Code-Master/style.css",
  "/Code-Master/DarkTheme.css",
  "/Code-Master/scripts/navToggle.js",
  "/Code-Master/scripts/session-check.js",
  "/Code-Master/scripts/searchBar.js",
  "/Code-Master/scripts/DarkTheme.js",
  "/Code-Master/scripts/badges.js",
  "/Code-Master/postcss.config.js",

  // Quiz pages
  "/Code-Master/quiz/mobileToggle.js",
  "/Code-Master/quiz/style.css",
  "/Code-Master/quiz/html/html.html",
  "/Code-Master/quiz/html/script.js",
  "/Code-Master/quiz/css/css.html",
  "/Code-Master/quiz/css/script.js",
  "/Code-Master/quiz/javascript/javascript.html",
  "/Code-Master/quiz/javascript/script.js",
  "/Code-Master/quiz/java/java.html",
  "/Code-Master/quiz/java/script.js",
  "/Code-Master/quiz/csharp/csharp.html",
  "/Code-Master/quiz/csharp/script.js",

  // Assets
  "/Code-Master/src/style.css",
  "/Code-Master/src/main.js",
  "/Code-Master/src/counter.js",
  "/Code-Master/src/javascript.svg"
];

// ✅ Install and cache assets
self.addEventListener("install", (event) => {
  console.log("📦 Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Caching:", urlsToCache);
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

// ✅ Serve cached content with safe fallback
self.addEventListener("fetch", (event) => {
  console.log("🔍 Fetching:", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request).catch((err) => {
        console.warn("❌ Fetch failed:", event.request.url, err);

        // Fallback for navigation requests
        if (event.request.mode === "navigate") {
          return caches.match("/Code-Master/index.html");
        }

        // Fallback for other requests
        return new Response("Offline or resource unavailable", {
          status: 503,
          statusText: "Service Unavailable"
        });
      });
    })
  );
});
