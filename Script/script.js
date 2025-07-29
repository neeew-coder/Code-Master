// Run on page load
window.addEventListener("load", () => {
  updateNavProfile();
  calculateOverallProgress();
  updateLearningJourneyProgress();
});

// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function () {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// Personalized navigation
function updateNavProfile() {
  const name = localStorage.getItem("codemasterUserName");
  if (name) {
    const navProfile = document.getElementById("navProfile");
    if (navProfile) {
      navProfile.classList.remove("hidden");
      document.getElementById("navName").textContent = name;
      document.getElementById("navAvatar").textContent = name.charAt(0).toUpperCase();
    }
  }
}

// Dynamic overall progress bar
function calculateOverallProgress() {
  const keys = ["htmlLessonProgress", "cssLessonProgress", "javaLessonProgress", "csharpLessonProgress"];
  let total = 0;
  keys.forEach(key => {
    total += parseInt(localStorage.getItem(key)) || 0;
  });
  const average = Math.round(total / keys.length);
  const progressBar = document.querySelector(".bg-purple-600");
  const progressLabel = document.querySelector(".text-sm.font-medium.text-gray-600");
  if (progressBar && progressLabel) {
    progressBar.style.width = average + "%";
    progressLabel.textContent = `${average}% Completed`;
  }
}

// Learning Journey progress tracker
function updateLearningJourneyProgress() {
  const modules = [
    "htmlLessonProgress",
    "cssLessonProgress",
    "jsLessonProgress",
    "javaLessonProgress",
    "csharpLessonProgress"
  ];
  
  let completedModules = 0;
  modules.forEach(key => {
    const progress = parseInt(localStorage.getItem(key)) || 0;
    if (progress === 100) completedModules++;
  });

  const percent = Math.round((completedModules / modules.length) * 100);
  document.getElementById("progress-bar").style.width = percent + "%";
  document.getElementById("progress-label").textContent = `${percent}% Completed`;
  document.getElementById("module-label").textContent = `Module ${completedModules} of ${modules.length}`;
}

// Tab switching logic
const tabButtons = document.querySelectorAll('.tab-button');
tabButtons.forEach(button => {
  button.addEventListener('click', function () {
    tabButtons.forEach(btn => {
      btn.classList.remove('text-purple-600', 'border-purple-600');
      btn.classList.add('text-gray-500');
    });

    this.classList.add('text-purple-600', 'border-purple-600');
    this.classList.remove('text-gray-500');

    const tabId = this.getAttribute('data-tab') + '-tab';
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
      tab.classList.add('hidden');
    });
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.classList.add('active');
      activeTab.classList.remove('hidden');
    }
  });
});

// Interactive IDE simulation
document.getElementById('demoButton').addEventListener('click', function () {
  const output = document.createElement('p');
  output.textContent = '✅ Button clicked! Code executed.';
  output.className = 'mt-4 text-green-600 font-semibold';
  this.parentElement.appendChild(output);
});

// Progress ring animation (if used)
function animateProgressRing(circle, circumference, percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

document.addEventListener('DOMContentLoaded', function () {
  const progressRings = document.querySelectorAll('.progress-ring');
  if (progressRings.length > 0) {
    progressRings.forEach(ring => {
      const circle = ring.querySelector('.progress-ring__circle');
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const percent = parseInt(ring.getAttribute('data-percent'));

      circle.style.strokeDasharray = circumference + ' ' + circumference;
      circle.style.strokeDashoffset = circumference;

      animateProgressRing(circle, circumference, percent);
    });
  }
});