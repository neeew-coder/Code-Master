const CACHE_VERSION = "v8"; // 🔄 bump this to force reactivation
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
  "/Code-Master/lessons/javascript/arithmetic.html",
  "/Code-Master/lessons/javascript/arrayaccess.html",
  "/Code-Master/lessons/javascript/arrayconst.html",
  "/Code-Master/lessons/javascript/arraycopy.html",
  "/Code-Master/lessons/javascript/arrayiteration.html",
  "/Code-Master/lessons/javascript/arraymethods.html",
  "/Code-Master/lessons/javascript/arraymutations.html",
  "/Code-Master/lessons/javascript/arrayreference.html",
  "/Code-Master/lessons/javascript/arrays.html",
  "/Code-Master/lessons/javascript/arraysearch.html",
  "/Code-Master/lessons/javascript/arraysort.html",
  "/Code-Master/lessons/javascript/arraytransform.html",
  "/Code-Master/lessons/javascript/arraytransform.html",
  "/Code-Master/lessons/javascript/arrowfunction.html",
  "/Code-Master/lessons/javascript/assignments.html",
  "/Code-Master/lessons/javascript/bestpractices.html",
  "/Code-Master/lessons/javascript/booleans.html",
  "/Code-Master/lessons/javascript/biginit.html",
  "/Code-Master/lessons/javascript/bitwise.html",
  "/Code-Master/lessons/javascript/break.html",
  "/Code-Master/lessons/javascript/classes.html",
  "/Code-Master/lessons/javascript/comments.html",
  "/Code-Master/lessons/javascript/comparisons.html",
  "/Code-Master/lessons/javascript/const.html",
  "/Code-Master/lessons/javascript/datatypes.html",
  "/Code-Master/lessons/javascript/dateformat.html",
  "/Code-Master/lessons/javascript/dategetmethods.html",
  "/Code-Master/lessons/javascript/dates.html",
  "/Code-Master/lessons/javascript/datesetmethods.html",
  "/Code-Master/lessons/javascript/debugging.html",
  "/Code-Master/lessons/javascript/destructuring.html",
  "/Code-Master/lessons/javascript/errors.html",
  "/Code-Master/lessons/javascript/events.html",
  "/Code-Master/lessons/javascript/functions.html",
  "/Code-Master/lessons/javascript/hoisting.html",
  "/Code-Master/lessons/javascript/ifelse.html",
  "/Code-Master/lessons/javascript/intro.html",
  "/Code-Master/lessons/javascript/iterables.html",
  "/Code-Master/lessons/javascript/iterators.html",
  "/Code-Master/lessons/javascript/JSON.html",
  "/Code-Master/lessons/javascript/loopfor.html",
  "/Code-Master/lessons/javascript/loopforin.html",
  "/Code-Master/lessons/javascript/loops.html",
  "/Code-Master/lessons/javascript/loopforof.html",
  "/Code-Master/lessons/javascript/loopwhile.html",
  "/Code-Master/lessons/javascript/mapmethods.html",
  "/Code-Master/lessons/javascript/mapreference.html",
  "/Code-Master/lessons/javascript/maps.html",
  "/Code-Master/lessons/javascript/math.html",
  "/Code-Master/lessons/javascript/mathreference.html",
  "/Code-Master/lessons/javascript/mistake.html",
  "/Code-Master/lessons/javascript/modules.html",
  "/Code-Master/lessons/javascript/numbermethods.html",
  "/Code-Master/lessons/javascript/numberproperties.html",
  "/Code-Master/lessons/javascript/numberreference.html",
  "/Code-Master/lessons/javascript/numbers.html",
  "/Code-Master/lessons/javascript/objectconstruction.html",
  "/Code-Master/lessons/javascript/objectdisplay.html",
  "/Code-Master/lessons/javascript/objectmethods.html",
  "/Code-Master/lessons/javascript/objectproperties.html",
  "/Code-Master/lessons/javascript/objects.html",
  "/Code-Master/lessons/javascript/operators.html",
  "/Code-Master/lessons/javascript/output.html",
  "/Code-Master/lessons/javascript/performance.html",
  "/Code-Master/lessons/javascript/precedence.html",
  "/Code-Master/lessons/javascript/random.html",
  "/Code-Master/lessons/javascript/regexp.html",
  "/Code-Master/lessons/javascript/regexpmethods.html",
  "/Code-Master/lessons/javascript/regexpobjects.html",
  "/Code-Master/lessons/javascript/regexppatterns.html",
  "/Code-Master/lessons/javascript/reservedwords.html",
  "/Code-Master/lessons/javascript/scope.html",
  "/Code-Master/lessons/javascript/setlogic.html",
  "/Code-Master/lessons/javascript/setmethods.html",
  "/Code-Master/lessons/javascript/setreference.html",
  "/Code-Master/lessons/javascript/sets.html",
  "/Code-Master/lessons/javascript/statements.html",
  "/Code-Master/lessons/javascript/strictmode.html",
  "/Code-Master/lessons/javascript/stringmethods.html",
  "/Code-Master/lessons/javascript/stringmethods.html",
  "/Code-Master/lessons/javascript/stringreference.html",
  "/Code-Master/lessons/javascript/strings.html",
  "/Code-Master/lessons/javascript/stringsearch.html",
  "/Code-Master/lessons/javascript/stringtemplate.html",
  "/Code-Master/lessons/javascript/styles.html",
  "/Code-Master/lessons/javascript/switch.html",
  "/Code-Master/lessons/javascript/syntax.html",
  "/Code-Master/lessons/javascript/thiskeyword.html",
  "/Code-Master/lessons/javascript/tostring.html",
  "/Code-Master/lessons/javascript/typeconversion.html",
  "/Code-Master/lessons/javascript/typedarrays.html",
  "/Code-Master/lessons/javascript/typedmethods.html",
  "/Code-Master/lessons/javascript/typedreference.html",
  "/Code-Master/lessons/javascript/typeof.html",
  "/Code-Master/lessons/javascript/variables.html",
  "/Code-Master/lessons/javascript/wheretoadd.html",

  //java
  "/Code-Master/lessons/java/abstraction.html",
  "/Code-Master/lessons/java/arraylist.html",
  "/Code-Master/lessons/java/arrays.html",
  "/Code-Master/lessons/java/booleans.html",
  "/Code-Master/lessons/java/breakorcontinue.html",
  "/Code-Master/lessons/java/classattributes.html",
  "/Code-Master/lessons/java/classes.html",
  "/Code-Master/lessons/java/classmethods.html",
  "/Code-Master/lessons/java/collections.html",
  "/Code-Master/lessons/java/comments.html",
  "/Code-Master/lessons/java/constructors.html",
  "/Code-Master/lessons/java/create.html",
  "/Code-Master/lessons/java/datastructures.html",
  "/Code-Master/lessons/java/datatypes.html",
  "/Code-Master/lessons/java/date.html",
  "/Code-Master/lessons/java/debugging.html",
  "/Code-Master/lessons/java/delete.html",
  "/Code-Master/lessons/java/encapsulation.html",
  "/Code-Master/lessons/java/enums.html",
  "/Code-Master/lessons/java/errors.html",
  "/Code-Master/lessons/java/exceptions.html",
  "/Code-Master/lessons/java/files.html",
  "/Code-Master/lessons/java/forloop.html",
  "/Code-Master/lessons/java/getstarted.html",
  "/Code-Master/lessons/java/hashmap.html",
  "/Code-Master/lessons/java/hashset.html",
  "/Code-Master/lessons/java/ifelse.html",
  "/Code-Master/lessons/java/inheritance.html",
  "/Code-Master/lessons/java/innerclasses.html",
  "/Code-Master/lessons/java/interface.html",
  "/Code-Master/lessons/java/intro.html",
  "/Code-Master/lessons/java/iterator.html",
  "/Code-Master/lessons/java/linkedhashmap.html",
  "/Code-Master/lessons/java/linkedhashset.html",
  "/Code-Master/lessons/java/linkedlist.html",
  "/Code-Master/lessons/java/lists.html",
  "/Code-Master/lessons/java/listsorting.html",
  "/Code-Master/lessons/java/map.html",
  "/Code-Master/lessons/java/math.html",
  "/Code-Master/lessons/java/methodoverloading.html",
  "/Code-Master/lessons/java/methodparameters.html",
  "/Code-Master/lessons/java/methods.html",
  "/Code-Master/lessons/java/modifiers.html",
  "/Code-Master/lessons/java/oop.html",
  "/Code-Master/lessons/java/operators.html",
  "/Code-Master/lessons/java/output.html",
  "/Code-Master/lessons/java/package.html",
  "/Code-Master/lessons/java/polymorphism.html",
  "/Code-Master/lessons/java/readfiles.html",
  "/Code-Master/lessons/java/recursion.html",
  "/Code-Master/lessons/java/scope.html",
  "/Code-Master/lessons/java/set.html",
  "/Code-Master/lessons/java/strings.html",
  "/Code-Master/lessons/java/superkeyword.html",
  "/Code-Master/lessons/java/switch.html",
  "/Code-Master/lessons/java/syntax.html",
  "/Code-Master/lessons/java/thiskeyword.html",
  "/Code-Master/lessons/java/treemap.html",
  "/Code-Master/lessons/java/treeset.html",
  "/Code-Master/lessons/java/typecasting.html",
  "/Code-Master/lessons/java/userinput.html",
  "/Code-Master/lessons/java/variables.html",
  "/Code-Master/lessons/java/whileloop.html",
  
  //c#
  "/Code-Master/lessons/csharp/abstraction.html",
  "/Code-Master/lessons/csharp/accessmodifiers.html",
  "/Code-Master/lessons/csharp/arrays.html",
  "/Code-Master/lessons/csharp/addtonumbers.html",
  "/Code-Master/lessons/csharp/classes.html",
  "/Code-Master/lessons/csharp/booleans.html",
  "/Code-Master/lessons/csharp/break.html",
  "/Code-Master/lessons/csharp/classmembers.html",
  "/Code-Master/lessons/csharp/comments.html",
  "/Code-Master/lessons/csharp/constructors.html",
  "/Code-Master/lessons/csharp/datatypes.html",
  "/Code-Master/lessons/csharp/debugging.html",
  "/Code-Master/lessons/csharp/encapsulation.html",
  "/Code-Master/lessons/csharp/enums.html",
  "/Code-Master/lessons/csharp/exceptions.html",
  "/Code-Master/lessons/csharp/files.html",
  "/Code-Master/lessons/csharp/forloop.html",
  "/Code-Master/lessons/csharp/getstarted.html",
  "/Code-Master/lessons/csharp/ifelse.html",
  "/Code-Master/lessons/csharp/inheritance.html",
  "/Code-Master/lessons/csharp/interfaces.html",
  "/Code-Master/lessons/csharp/intro.html",
  "/Code-Master/lessons/csharp/math.html",
  "/Code-Master/lessons/csharp/methodoverloading.html",
  "/Code-Master/lessons/csharp/methodparameters.html",
  "/Code-Master/lessons/csharp/methods.html",
  "/Code-Master/lessons/csharp/oop.html",
  "/Code-Master/lessons/csharp/operators.html",
  "/Code-Master/lessons/csharp/output.html",
  "/Code-Master/lessons/csharp/polymorphism.html",
  "/Code-Master/lessons/csharp/properties.html",
  "/Code-Master/lessons/csharp/strings.html",
  "/Code-Master/lessons/csharp/switch.html",
  "/Code-Master/lessons/csharp/syntax.html",
  "/Code-Master/lessons/csharp/typecasting.html",
  "/Code-Master/lessons/csharp/userinput.html",
  "/Code-Master/lessons/csharp/variables.html",
  "/Code-Master/lessons/csharp/whileloop.html",

  // Assets
  "/Code-Master/src/style.css",
  "/Code-Master/src/main.js",
  "/Code-Master/src/counter.js",
  "/Code-Master/src/javascript.svg"
];

// ✅ Install and cache static + external assets
self.addEventListener("install", (event) => {
  console.log("📦 Service Worker installing...");

  const externalAssets = [
    "https://cdn.tailwindcss.com?plugins=typography"
  ];

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Caching assets:", urlsToCache.length + externalAssets.length, "files");

      return Promise.all([
        ...urlsToCache.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`⚠️ Failed to cache ${url}:`, err);
          })
        ),
        ...externalAssets.map((url) =>
          cache.add(url).catch((err) => {
            console.warn(`⚠️ Failed to cache external asset: ${url}`, err);
          })
        )
      ]);
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
