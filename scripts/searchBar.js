document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = [
    document.getElementById("search-input"),
    document.getElementById("mobile-search")
  ].filter(Boolean);

  searchInputs.forEach(input => {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        const query = input.value.trim().toLowerCase();
        if (!query) return;

        console.log("Search triggered:", query);

        // Match query to lesson keywords
        if (query.includes("html lessons") || query.includes("html tutorial") ) {
          window.location.href = `lesson-html.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("css lessons") || query.includes("css tutorial")) {
          window.location.href = `lesson-css.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("javascript lessons") || query.includes("javascript tutorial") || query.includes("js lessons") || query.includes("js tutorial")) {
          window.location.href = `lesson-js.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("java lessons") || query.includes("java tutorial")) {
          window.location.href = `lesson-java.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("c# lessons") || query.includes("csharp lessons") || query.includes("c# tutorial") || query.includes("csharp tutorial")) {
        window.location.href = `lesson-csharp.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("c# quizzes") || query.includes("csharp quiz") || query.includes("c# quiz") || query.includes("csharp quizzes")) {
          window.location.href = `quiz/csharp/csharp.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("html quizzes") || query.includes("html quiz")) {
        window.location.href = `quiz/html/html.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("css quizzes") || query.includes("css quiz")) {
        window.location.href = `quiz/css/css.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("javascript quizzes") || query.includes("javascript quiz") || query.includes("js quizzes") || query.includes("js quiz")) {
        window.location.href = `quiz/javascript/javascript.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("java quizzes") || query.includes("java quiz")) {
        window.location.href = `quiz/java/java.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("lessons") || query.includes("lesson") || query.includes("tutorials") || query.includes("tutorial")) {
        window.location.href = `lessons.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("exercises") || query.includes("exercise") || query.includes("quizzes") || query.includes("quiz")) {
        window.location.href = `exercises.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("profile") || query.includes("user profile") || query.includes("my profile") || query.includes("account") || query.includes("my account")
        || query.includes("badges") || query.includes("my badges") || query.includes("achievements") || query.includes("my achievements") || query.includes("progress") || query.includes("my progress")) {
        window.location.href = `userprofile/profile.html?q=${encodeURIComponent(query)}`;
        } else if (query.includes("code playground") || query.includes("playground") || query.includes("code editor") || query.includes("editor") || query.includes("sandbox") || query.includes("code sandbox")) {
        window.location.href = `code-playground.html?q=${encodeURIComponent(query)}`;
        }else {
          alert("No matching lesson found or quiz available. Please try a different query and use small letters.");
        }
      }
    });
  });
});
