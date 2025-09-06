// 🔄 Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  toggleBtn?.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden");
    menuIcon?.classList.toggle("fa-bars");
    menuIcon?.classList.toggle("fa-times");
  });
});

// 🚀 Dashboard Initialization
window.addEventListener("load", async () => {
  await checkSession();
  await loadProfile();
  await loadProgress();
  renderBadges();
});

// 🧠 Load Profile from Backend
async function loadProfile() {
  try {
    const res = await fetch("/profile/me");
    const data = await res.json();

    document.getElementById("username").value = data.username || "";
    document.getElementById("tagline").value = data.tagline || "";

    updateNavProfile(data.username);
  } catch (err) {
    console.error("Failed to load profile:", err);
  }
}

// 💾 Save Profile
document.getElementById("saveBtn")?.addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const tagline = document.getElementById("tagline").value;

  try {
    await fetch("/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, tagline })
    });
    updateNavProfile(username);
  } catch (err) {
    console.error("Failed to save profile:", err);
  }
});

// 🧩 Update Nav Profile UI
function updateNavProfile(name = "User") {
  const initial = name.charAt(0).toUpperCase();
  document.getElementById("navAvatar").textContent = initial;
  document.getElementById("navName").textContent = name;
  document.getElementById("navAvatarMobile").textContent = initial;
  document.getElementById("navNameMobile").textContent = name;
}

// 📊 Load Progress
async function loadProgress() {
  try {
    const res = await fetch("/progress/me");
    const progress = await res.json();

    document.querySelectorAll("[data-lesson]").forEach(card => {
      const lesson = card.dataset.lesson;
      const percent = progress[lesson] || 0;

      const bar = card.querySelector(".progress-bar");
      const text = card.querySelector(".progress-text");

      if (bar) bar.style.width = `${percent}%`;
      if (text) text.textContent = `${percent}% Completed`;
    });
  } catch (err) {
    console.error("Failed to load progress:", err);
  }
}

// 🏅 Render Badges
function renderBadges() {
  const badgeContainer = document.querySelector(".badges");
  if (!badgeContainer) return;

  // Example: Replace with real badge logic
  badgeContainer.innerHTML = `
    <div class="flex gap-4 flex-wrap justify-center">
      <div class="bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold shadow">HTML Novice</div>
      <div class="bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow">CSS Explorer</div>
    </div>
  `;
}

// 🚪 Sign Out
function signOut() {
  fetch("/auth/logout", { method: "POST" })
    .then(() => window.location.href = "/auth.html")
    .catch(err => console.error("Logout failed:", err));
}

// 🔐 Session Check
async function checkSession() {
  try {
    const res = await fetch("/auth/me");
    if (!res.ok) throw new Error("Session invalid");
  } catch (err) {
    window.location.href = "/auth.html";
  }
}
