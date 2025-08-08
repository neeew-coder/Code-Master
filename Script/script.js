// 🌐 API base configuration
const API_BASE = 'http://localhost:3000';

// 🔄 Async: Fetch user from MongoDB via API
async function getCurrentUser() {
  try {
    const token = localStorage.getItem('codemasterToken');
    if (!token) return null;

    const response = await fetch(`${API_BASE}/api/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) throw new Error("Failed to fetch user");

    const data = await response.json();
    return {
      Token: token,
      Username: data.name || "User",
      Tagline: data.tagline || "",
      Avatar: data.avatar || data.name?.charAt(0).toUpperCase() || "U",
      LessonProgress: data.lessonProgress || {}
    };
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

// 📱 Mobile menu toggle
document.getElementById('mobile-menu-button')?.addEventListener('click', function () {
  const menu = document.getElementById('mobile-menu');
  menu?.classList.toggle('hidden');
});

// 👤 Personalized navigation
async function updateNavProfile() {
  const user = await getCurrentUser();
  if (user) {
    const navProfile = document.getElementById("navProfile");
    if (navProfile) {
      navProfile.classList.remove("hidden");
      document.getElementById("navName").textContent = user.Username;
      document.getElementById("navAvatar").textContent = user.Avatar;
    }
  }
}

// 📊 Dynamic overall progress bar
async function calculateOverallProgress() {
  const user = await getCurrentUser();
  if (!user || !user.LessonProgress) return;

  const keys = ["lesson-html", "lesson-css", "lesson-java", "lesson-csharp", "lesson-js"];
  let total = 0;
  keys.forEach(key => {
    total += parseInt(user.LessonProgress[key]) || 0;
  });
  const average = Math.round(total / keys.length);
  const progressBar = document.querySelector(".bg-purple-600");
  const progressLabel = document.querySelector(".text-sm.font-medium.text-gray-600");
  if (progressBar && progressLabel) {
    progressBar.style.width = average + "%";
    progressLabel.textContent = `${average}% Completed`;
  }
}

// 🧭 Learning Journey progress tracker
async function updateLearningJourneyProgress() {
  const user = await getCurrentUser();
  if (!user || !user.LessonProgress) return;

  const modules = ["lesson-html", "lesson-css", "lesson-js", "lesson-java", "lesson-csharp"];
  let completedModules = 0;
  modules.forEach(key => {
    const progress = parseInt(user.LessonProgress[key]) || 0;
    if (progress === 100) completedModules++;
  });

  const percent = Math.round((completedModules / modules.length) * 100);
  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-label").textContent = `${percent}% Completed`;
  document.getElementById("module-label").textContent = `Module ${completedModules} of ${modules.length}`;
}

// 🌀 Progress ring helper
function animateProgressRing(circle, circumference, percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

// 📌 Optional: Show progress summary in nav
async function showLessonProgressSummary() {
  const user = await getCurrentUser();
  if (!user || !user.LessonProgress) return;

  const completed = Object.values(user.LessonProgress).filter(v => v === 100).length;
  const total = Object.keys(user.LessonProgress).length;
  const summary = document.getElementById("navProgress");
  if (summary) {
    summary.textContent = `${completed}/${total} lessons completed`;
  }
}

// 🐞 Debug log
getCurrentUser().then(user => {
  if (user) console.log("Welcome,", user.Username);
});

// 🚀 Initialize dashboard components
async function initializeDashboard() {
  await updateNavProfile();
  await calculateOverallProgress();
  await updateLearningJourneyProgress();
  await showLessonProgressSummary();
}

initializeDashboard();