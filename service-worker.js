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

// ✅ Activate and clean old caches
self.addEventListener("activate", (event) => {
  console.log("🚀 Activating Service Worker...");
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

// ✅ Fetch handler with profile-safe logic
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip caching for profile or session-related requests
  if (
    request.url.includes("/profile") ||
    request.url.includes("/session") ||
    request.url.includes("/user") ||
    request.url.includes("/api")
  ) {
    console.log("🚫 Skipping cache for:", request.url);
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).catch((err) => {
        console.warn("❌ Fetch failed:", request.url, err);

        // Fallback for navigation
        if (request.mode === "navigate") {
          return caches.match("/Code-Master/index.html");
        }

        return new Response("Offline or resource unavailable", {
          status: 503,
          statusText: "Service Unavailable"
        });
      });
    })
  );
});
