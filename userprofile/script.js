const API_BASE = "https://code-master-kk2m.onrender.com/api";

function updateNavProfile() {
  const name = localStorage.getItem("codemasterUserName");
  if (name) {
    document.getElementById("navProfile")?.classList.remove("hidden");
    document.getElementById("navName").textContent = name;
    document.getElementById("navAvatar").textContent = name.charAt(0).toUpperCase();
  }
}

function renderProfileUI() {
  const name = localStorage.getItem("codemasterUserName") || "";
  const tagline = localStorage.getItem("codemasterTagline") || "";
  const color = "bg-indigo-600";

  document.getElementById("profileName").value = name;
  document.getElementById("profileTagline").value = tagline;

  const avatar = document.getElementById("profileAvatar");
  avatar.textContent = name ? name.charAt(0).toUpperCase() : "?";
  avatar.className = `${color} text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold`;
}

function loadProfileFromBackend() {
  fetch(`${API_BASE}/profile/me`, { credentials: "include" })
    .then(res => {
      if (res.status === 401) {
        alert("Session expired. Redirecting to login...");
        window.location.href = "/auth/login";
        return;
      }
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data?.username) {
        localStorage.setItem("codemasterUserName", data.username);
        localStorage.setItem("codemasterTagline", data.bio || "");
        updateNavProfile();
        renderProfileUI();
      }
    })
    .catch(err => {
      console.warn("⚠️ Failed to load profile:", err);
      alert("Unable to load profile. Please sign in again.");
      window.location.href = "/auth/login";
    });
}

function saveProfile() {
  const name = document.getElementById("profileName").value.trim();
  const tagline = document.getElementById("profileTagline").value.trim();

  localStorage.setItem("codemasterUserName", name);
  localStorage.setItem("codemasterTagline", tagline);
  updateNavProfile();
  renderProfileUI();

  const button = document.getElementById("saveBtn");
  button.disabled = true;
  button.textContent = "Saving...";

  fetch(`${API_BASE}/profile/me`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username: name, bio: tagline })
  })
    .then(res => {
      if (!res.ok) throw new Error(`Server responded with ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log("✅ Profile synced:", data);
      alert("Profile saved and synced!");
    })
    .catch(err => {
      console.error("❌ Sync failed:", err);
      alert("Failed to sync profile.");
    })
    .finally(() => {
      button.disabled = false;
      button.textContent = "Save Profile";
    });
}

function updateUIWithProgress({ completed, totalModules, subject }) {
  const percent = totalModules > 0
    ? Math.min(100, Math.round((completed.length / totalModules) * 100))
    : 0;

  const container = document.querySelector(`[data-subject="${subject}"]`);
  if (!container) return;

  const bar = container.querySelector(".progress-bar");
  const label = container.querySelector(".progress-label");

  if (bar) bar.style.width = `${percent}%`;
  if (label) label.textContent = `${percent}% Completed`;
}

function loadProgressFor(subject) {
  fetch(`${API_BASE}/progress/${subject}`, {
    method: "GET",
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      const subjectProgress = data?.progress?.completed?.[subject] || {};
      const completed = Object.entries(subjectProgress)
        .filter(([_, isDone]) => isDone)
        .map(([lessonId]) => lessonId);

      const totalModules = data?.progress?.totalModules;
      if (typeof totalModules !== "number" || totalModules <= 0) {
        console.warn(`⚠️ Invalid totalModules for ${subject}.`);
        return;
      }

      updateUIWithProgress({ completed, totalModules, subject });
    })
    .catch(err => {
      console.warn(`Progress fetch error for ${subject}:`, err.message);
    });
}

function updateProgress(subject, lessonId) {
  fetch(`${API_BASE}/progress/update`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, lesson: lessonId })
  })
    .then(res => res.json())
    .then(data => {
      const subjectProgress = data?.progress?.completed?.[subject] || {};
      const completed = Object.entries(subjectProgress)
        .filter(([_, isDone]) => isDone)
        .map(([lessonId]) => lessonId);

      const totalModules = data?.progress?.totalModules;
      if (typeof totalModules !== "number" || totalModules <= 0) {
        console.warn(`⚠️ Invalid totalModules for ${subject}.`);
        return;
      }

      updateUIWithProgress({ completed, totalModules, subject });
    })
    .catch(err => {
      console.warn("Progress update error:", err.message);
    });
}

function signOut() {
  fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include"
  })
    .then(() => {
      localStorage.clear();
      window.location.href = "/index.html";
    })
    .catch(err => {
      console.error("❌ Logout failed:", err);
      alert("Could not log out. Try again.");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  toggleBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    menuIcon.classList.toggle("fa-bars");
    menuIcon.classList.toggle("fa-times");
  });
});

window.addEventListener("load", () => {
  loadProfileFromBackend();
  updateNavProfile();
  renderProfileUI();

  ["html", "css", "javascript", "java", "csharp"].forEach(loadProgressFor);
});