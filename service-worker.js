const CACHE_NAME = "codemaster-cache-v1";
const urlsToCache = [
  //main function or files
  "/Code-Master/",
  "/Code-Master/index.html",
  "/Code-Master/auth.html",
  "/Code-Master/reset-password.html",
  "/Code-Master/forgot-password.html",
  "/Code-Master/exercises.html",
  "/Code-Master/code-playground.html",
  "/Code-Master/lesson.html",
  "/Code-Master/lesson-html.html",
  "/Code-Master/lesson-css.html",
  "/Code-Master/lesson-js.html",
  "/Code-Master/lesson-java.html",
  "/Code-Master/lesson-csharp.html",
  "/Code-Master/style.css",
  "/Code-Master/DarkTheme.js",

  "/Code-Master/userprofile/profile.html",
  "/Code-Master/userprofile/style.css",
  "/Code-Master/userprofile/script.js",

  //needed script
  "/Code-Master/scripts/navToggle.js",
  "/Code-Master/scripts/session-check.js",
  "/Code-Master/scripts/searchBar.js",
  "/Code-Master/scripts/DarkTheme.js",
  "/Code-Master/scripts/badge.js",
  "/Code-Master/quiz/mobileToggle.js",

  //design
  "/Code-Master/src/style.css",
  "/Code-Master/src/main.js",
  "/Code-Master/src/counter.js",
  "/Code-Master/src/javascript.svg",
  "/Code-Master/quiz/style.css",

  //quiz
  "/Code-Master/quiz/html/html.html",
  "/Code-Master/quiz/html/script.js",
  "/Code-Master/quiz/css/css.html",
  "/Code-Master/quiz/css/script.js",
  "/Code-Master/quiz/javascript/javascript.html",
  "/Code-Master/quiz/javascript/script.js",
  "/Code-Master/quiz/java/java.html",
  "/Code-Master/quiz/java/script.js",
  "/Code-Master/quiz/csharp/csharp.html",
  "/Code-Master/quiz/csharp/script.js"
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
