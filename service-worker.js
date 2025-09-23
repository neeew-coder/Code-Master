const CACHE_VERSION = "v5"; // 🔄 bump this to force reactivation
const CACHE_NAME = `codemaster-cache-${CACHE_VERSION}`;

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

// ✅ Install and cache static assets
self.addEventListener("install", (event) => {
  console.log("📦 Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Caching static assets:", urlsToCache.length, "files");
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
  console.log("🚀 Activating Service Worker...");
  event.waitUntil(
    caches.keys().then((keys) => {
      console.log("🧠 Existing caches:", keys);
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("🧹 Removing old cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// ✅ Fetch handler with profile-safe logic
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = request.url;

  // Skip caching for dynamic/profile-related requests
  if (
    url.includes("/profile") ||
    url.includes("/session") ||
    url.includes("/user") ||
    url.includes("/api")
  ) {
    console.log("🚫 Skipping cache for dynamic request:", url);
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("✅ Serving from cache:", url);
        return cachedResponse;
      }

      console.log("🌐 Fetching from network:", url);
      return fetch(request).catch((err) => {
        console.warn("❌ Network fetch failed:", url, err);

        // Fallback for navigation
        if (request.mode === "navigate") {
          console.log("📄 Fallback to cached index.html");
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
