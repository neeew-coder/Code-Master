document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const icon = document.getElementById("themeIcon");
  const body = document.body;

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  } else {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  // Toggle theme and icon
  toggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    icon.classList.remove("fa-moon", "fa-sun");
    icon.classList.add(isDark ? "fa-moon" : "fa-sun");
  });
});
