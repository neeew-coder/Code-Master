const subjects = ["Java", "CSharp", "HTML"];
const progressBars = document.getElementById("progressBars");
const badgeContainer = document.getElementById("badgeContainer");

window.addEventListener("DOMContentLoaded", () => {
  loadProfile();
  loadProgress();
});

async function loadProfile() {
  try {
    const res = await fetch("/api/user/me", { credentials: "include" });
    const { username, bio, badges, progress } = await res.json();

    document.getElementById("profileName").value = username || "";
    document.getElementById("profileTagline").value = bio || "";
    updateAvatar(username);
    renderBadges(badges);
  } catch (err) {
    console.error("Failed to load profile:", err);
  }
}

async function saveProfile() {
  const username = document.getElementById("profileName").value.trim();
  const bio = document.getElementById("profileTagline").value.trim();

  try {
    const res = await fetch("/api/user/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, bio })
    });

    const result = await res.json();
    if (res.ok) {
      updateAvatar(username);
      alert("Profile saved!");
    } else {
      alert(result.error || "Failed to save profile.");
    }
  } catch (err) {
    console.error("Save error:", err);
    alert("Error saving profile.");
  }
}

function updateAvatar(name) {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const avatar = document.getElementById("profileAvatar");
  avatar.textContent = initials || "👤";
  avatar.style.backgroundColor = "#6366F1";
}

function renderBadges(badges) {
  badgeContainer.innerHTML = "";
  badges.forEach(badge => {
    const badgeEl = document.createElement("div");
    badgeEl.className = "bg-yellow-300 text-center p-4 rounded shadow font-semibold";
    badgeEl.innerHTML = `<i class="fas fa-trophy text-xl mb-2 block"></i>${badge}`;
    badgeContainer.appendChild(badgeEl);
  });
}

async function loadProgress() {
  try {
    const res = await fetch("/api/user/me", { credentials: "include" });
    const { progress } = await res.json();

    subjects.forEach(subject => {
      const completed = progress?.[subject] || 0;
      const total = getTotalLessons(subject);
      renderProgressBar(subject, completed, total);
    });
  } catch (err) {
    console.error("Progress load error:", err);
  }
}

function renderProgressBar(subject, completed, total) {
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const bar = document.createElement("div");
  bar.innerHTML = `
    <div class="mb-2 text-gray-600 font-medium">${subject} (${completed}/${total})</div>
    <div class="w-full bg-gray-200 rounded-full h-4">
      <div class="bg-indigo-500 h-4 rounded-full transition-all" style="width: ${percent}%"></div>
    </div>
  `;
  progressBars.appendChild(bar);
}

function getTotalLessons(subject) {
  const totals = { Java: 12, CSharp: 8, HTML: 10 }; // Update as needed
  return totals[subject] || 0;
}

function signOut() {
  fetch("/api/user/signout", { method: "POST", credentials: "include" })
    .then(() => window.location.href = "../index.html")
    .catch(err => console.error("Sign out failed:", err));
}

document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});
