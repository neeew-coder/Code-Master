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

  //Lessons
  //html
  "/Code-Master/lessons/html/block and inline.html",
  "/Code-Master/lessons/html/classes.html",
  "/Code-Master/lessons/html/colspan and rowspan.html",
  "/Code-Master/lessons/html/comments.html",
  "/Code-Master/lessons/html/computercode.html",
  "/Code-Master/lessons/html/elements.html",
  "/Code-Master/lessons/html/entities.html",
  "/Code-Master/lessons/html/form.html",
  "/Code-Master/lessons/html/headings.html",
  "/Code-Master/lessons/html/filepath.html",
  "/Code-Master/lessons/html/formattributes.html",
  "/Code-Master/lessons/html/formelements.html",
  "/Code-Master/lessons/html/head.html",
  "/Code-Master/lessons/html/html-basic.html",
  "/Code-Master/lessons/html/Id.html",
  "/Code-Master/lessons/html/Idattributes.html",
  "/Code-Master/lessons/html/image.html",
  "/Code-Master/lessons/html/iframe.html",
  "/Code-Master/lessons/html/inputattributes.html",
  "/Code-Master/lessons/html/inputtypes.html",
  "/Code-Master/lessons/html/intro.html",
  "/Code-Master/lessons/html/javascript.html",
  "/Code-Master/lessons/html/links.html",
  "/Code-Master/lessons/html/lists.html",
  "/Code-Master/lessons/html/layout.html",
  "/Code-Master/lessons/html/padding and spacing.html",
  "/Code-Master/lessons/html/paragraph.html",
  "/Code-Master/lessons/html/pagetitle.html",
  "/Code-Master/lessons/html/quotation.html",
  "/Code-Master/lessons/html/responsive.html",
  "/Code-Master/lessons/html/semantic.html",
  "/Code-Master/lessons/html/styles.html",
  "/Code-Master/lessons/html/table.html",
  "/Code-Master/lessons/html/tableorders.html",
  "/Code-Master/lessons/html/tablecolgroup.html",
  "/Code-Master/lessons/html/tableheaders.html",
  "/Code-Master/lessons/html/tablesizes.html",
  "/Code-Master/lessons/html/tablestyling.html",
  "/Code-Master/lessons/html/text.html",

  //css
  "/Code-Master/lessons/css/!important.html",
  "/Code-Master/lessons/css/accessibility.html",
  "/Code-Master/lessons/css/align.html",
  "/Code-Master/lessons/css/attributeselectors.html",
  "/Code-Master/lessons/css/backgrounds.html",
  "/Code-Master/lessons/css/borders.html",
  "/Code-Master/lessons/css/boxmodel.html",
  "/Code-Master/lessons/css/combinators.html",
  "/Code-Master/lessons/css/colors.html",
  "/Code-Master/lessons/css/comments.html",
  "/Code-Master/lessons/css/counters.html",
  "/Code-Master/lessons/css/display.html",
  "/Code-Master/lessons/css/dropdowns.html",
  "/Code-Master/lessons/css/errors.html",
  "/Code-Master/lessons/css/float.html",
  "/Code-Master/lessons/css/flexbox.html",
  "/Code-Master/lessons/css/fonts.html",
  "/Code-Master/lessons/css/forms.html",
  "/Code-Master/lessons/css/grid.html",
  "/Code-Master/lessons/css/heightandwidth.html",
  "/Code-Master/lessons/css/howto.html",
  "/Code-Master/lessons/css/icons.html",
  "/Code-Master/lessons/css/imagegallery.html",
  "/Code-Master/lessons/css/imagesprites.html",
  "/Code-Master/lessons/css/inline-block.html",
  "/Code-Master/lessons/css/intro.html",
  "/Code-Master/lessons/css/links.html",
  "/Code-Master/lessons/css/lists.html",
  "/Code-Master/lessons/css/margins.html",
  "/Code-Master/lessons/css/mathfunctions.html",
  "/Code-Master/lessons/css/max-width.html",
  "/Code-Master/lessons/css/navigationbar.html",
  "/Code-Master/lessons/css/opacity.html",
  "/Code-Master/lessons/css/outline.html",
  "/Code-Master/lessons/css/overflow.html",
  "/Code-Master/lessons/css/paddings.html",
  "/Code-Master/lessons/css/performance.html",
  "/Code-Master/lessons/css/pseudo-classes.html",
  "/Code-Master/lessons/css/pseudo-elements.html",
  "/Code-Master/lessons/css/responsive.html",
  "/Code-Master/lessons/css/positioning.html",
  "/Code-Master/lessons/css/selectors.html",
  "/Code-Master/lessons/css/specificity.html",
  "/Code-Master/lessons/css/syntax.html",
  "/Code-Master/lessons/css/tables.html",
  "/Code-Master/lessons/css/text.html",
  "/Code-Master/lessons/css/units.html",
  "/Code-Master/lessons/css/websitelayout.html",
  "/Code-Master/lessons/css/z-index.html",

  //js
  

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
