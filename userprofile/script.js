const API_BASE = "https://code-master-kk2m.onrender.com/api";

// ─── Badge Definitions ─────────────────────────────────────────────────────────

function getBadgeInfo(subject, percent) {
  if (subject === "html") {
    if (percent === 100) return { label: "<html hero>", class: "bg-green-600", icon: "fa-code" };
    if (percent >= 75) return { label: "<form fluent>", class: "bg-purple-600", icon: "fa-code" };
    if (percent >= 50) return { label: "<article author>", class: "bg-blue-500", icon: "fa-code" };
    if (percent >= 25) return { label: "<section starter>", class: "bg-yellow-400", icon: "fa-code" };
    return { label: "<div dabbler>", class: "bg-gray-400", icon: "fa-code" };
  }

  if (subject === "css") {
    if (percent === 100) return { label: ".style sorcerer", class: "bg-green-600", icon: "fa-paint-brush" };
    if (percent >= 75) return { label: ".grid guru", class: "bg-purple-600", icon: "fa-border-style" };
    if (percent >= 50) return { label: ".flexbox fighter", class: "bg-blue-500", icon: "fa-layer-group" };
    if (percent >= 25) return { label: ".box-model builder", class: "bg-yellow-400", icon: "fa-ruler-combined" };
    return { label: ".selector scout", class: "bg-gray-400", icon: "fa-paint-brush" };
  }

  if (subject === "javascript") {
    if (percent === 100) return { label: "async overlord", class: "bg-green-600", icon: "fa-infinity" };
    if (percent >= 75) return { label: "promise pilot", class: "bg-purple-600", icon: "fa-rocket" };
    if (percent >= 50) return { label: "callback captain", class: "bg-blue-500", icon: "fa-sync-alt" };
    if (percent >= 25) return { label: "event wrangler", class: "bg-yellow-400", icon: "fa-mouse-pointer" };
    return { label: "function fledgling", class: "bg-gray-400", icon: "fa-bolt" };
  }

  if (subject === "java") {
    if (percent === 100) return { label: "runtime ruler", class: "bg-green-600", icon: "fa-cogs" };
    if (percent >= 75) return { label: "inheritance initiator", class: "bg-purple-600", icon: "fa-project-diagram" };
    if (percent >= 50) return { label: "object operator", class: "bg-blue-500", icon: "fa-object-group" };
    if (percent >= 25) return { label: "method mapper", class: "bg-yellow-400", icon: "fa-code-branch" };
    return { label: "class crawler", class: "bg-gray-400", icon: "fa-cube" };
  }

  if (subject === "csharp") {
    if (percent === 100) return { label: "runtime regent", class: "bg-green-600", icon: "fa-cogs" };
    if (percent >=  75) return { label: "LINQ luminary", class: "bg-purple-600", icon: "fa-filter" };
    if (percent >= 50) return { label: "delegate dominator", class: "bg-blue-500", icon: "fa-bolt" };
    if (percent >= 25) return { label: "interface initiator", class: "bg-yellow-400", icon: "fa-puzzle-piece" };
    return { label: "namespace newbie", class: "bg-gray-400", icon: "fa-cube" };
  }

  return { label: "Rookie", class: "bg-gray-300", icon: "fa-user" };
}

// ─── Profile UI ────────────────────────────────────────────────────────────────

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
  const avatar = document.getElementById("profileAvatar");

  document.getElementById("profileName").value = name;
  document.getElementById("profileTagline").value = tagline;

  avatar.textContent = name ? name.charAt(0).toUpperCase() : "?";
  avatar.className = `bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold`;
}

function loadProfileFromBackend() {
  return fetch(`${API_BASE}/profile/me`, { credentials: "include" })
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
  const button = document.getElementById("saveBtn");

  localStorage.setItem("codemasterUserName", name);
  localStorage.setItem("codemasterTagline", tagline);
  updateNavProfile();
  renderProfileUI();

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

function initProfileUI() {
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", saveProfile);
  }

  loadProfileFromBackend();
  updateNavProfile();
  renderProfileUI();
}

// ─── Navigation ────────────────────────────────────────────────────────────────

function initNavigation() {
  const toggleBtn = document.getElementById("menu-toggle");
  const menuIcon = document.getElementById("menu-icon");
  const mobileMenu = document.getElementById("mobile-menu");

  if (toggleBtn && menuIcon && mobileMenu) {
    toggleBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      menuIcon.classList.toggle("fa-bars");
      menuIcon.classList.toggle("fa-times");
    });
  }
}

// ─── Auth ──────────────────────────────────────────────────────────────────────

function signOut() {
  fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    credentials: "include"
  })
    .then(() => {
      localStorage.clear();
      window.location.href = "/Code-Master/index.html";
    })
    .catch(err => {
      console.error("❌ Logout failed:", err);
      alert("Could not log out. Try again.");
    });
}

// ─── Badge Gallery ─────────────────────────────────────────────────────────────

function renderBadgeGallery(allProgress) {
  const gallery = document.querySelector("#badgeGallery .space-y-2");
  if (!gallery || !allProgress?.completed) return;

  gallery.innerHTML = "";

  Object.entries(allProgress.completed).forEach(([subject, lessons]) => {
    const completedCount = Object.values(lessons).filter(Boolean).length;
    const totalModules = allProgress.totalModules?.[subject] || 1;
    const percent = Math.min(100, Math.round((completedCount / totalModules) * 100));

    const { label, class: badgeClass, icon } = getBadgeInfo(subject, percent);
    const escapedLabel = label.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const badgeHTML = `
      <div>
        <span class="inline-flex items-center gap-2 px-4 py-1 text-xs font-mono font-bold text-white rounded-full shadow ring-2 ring-offset-1 ring-white ${badgeClass}" title="${subject.toUpperCase()} mastery level">
          <i class="fas ${icon} text-white opacity-80"></i>
          ${escapedLabel}
        </span>
      </div>
    `;
    gallery.insertAdjacentHTML("beforeend", badgeHTML);
  });
}

// ─── Progress UI ───────────────────────────────────────────────────────────────

const allProgressData = { completed: {}, totalModules: {} };
let subjectsLoaded = 0;

function updateUIWithProgress({ completed, totalModules, subject }) {
  const percent = totalModules >= 0
    ? Math.min(100, Math.round((completed.length / totalModules) * 100))
    : 0;

  const container = document.querySelector(`[data-subject="${subject}"]`);
  if (!container) return;

  const bar = container.querySelector(".progress-bar");
  const label = container.querySelector(".progress-label");

    if (bar) bar.style.width = `${percent}%`;
  if (label) label.textContent = `${percent}% Completed`;
}

// ─── Progress Fetch and Update ─────────────────────────────────────────────────

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

      allProgressData.completed[subject] = subjectProgress;
      allProgressData.totalModules[subject] = totalModules;

      subjectsLoaded++;
      if (subjectsLoaded === 5) {
        renderBadgeGallery(allProgressData);
      }
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

      allProgressData.completed[subject] = subjectProgress;
      allProgressData.totalModules[subject] = totalModules;

      renderBadgeGallery(allProgressData);
    })
    .catch(err => {
      console.warn("Progress update error:", err.message);
    });
}

// ─── Initialization ───────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initProfileUI();
  ["html", "css", "javascript", "java", "csharp"].forEach(loadProgressFor);
});
