document.addEventListener("DOMContentLoaded", () => {
  const searchInputs = [
    document.getElementById("search-input"),
    document.getElementById("mobile-search")
  ].filter(Boolean);

  searchInputs.forEach(input => {
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        const query = input.value.trim();
        if (query) {
          console.log("Search triggered:", query);
          // Example: redirect to a search results page
          // window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
        }
      }
    });
  });
});
