document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  let subject = params.get("subject");
  let lessonId = params.get("lesson");

  // Auto-correct legacy format like ?lesson=css-intro
  if (!subject && lessonId && lessonId.includes("-")) {
    const [legacySubject, legacyLesson] = lessonId.split("-");
    subject = legacySubject;
    lessonId = legacyLesson;
    window.location.href = `lesson-template.html?subject=${subject}&lesson=${lessonId}`;
    return;
  }

  // Fallback to default if missing
  if (!subject || !lessonId) {
    window.location.href = `lesson-template.html?subject=html&lesson=intro`;
    return;
  }

  const normalized = subjectMap[subject];
  const validSubjects = Object.keys(modules);
  const validLessons = modules[normalized]?.map(m => m.id);

  // Redirect if subject or lesson is invalid
  if (!normalized || !validSubjects.includes(normalized) || !validLessons?.includes(lessonId)) {
    window.location.href = `lesson-template.html?subject=html&lesson=intro`;
    return;
  }

  const lessonKey = `${subject}Lesson_${lessonId}`;
  renderSidebar(subject, lessonId);
  loadLesson(subject, lessonId, lessonKey);
  document.body.setAttribute("data-lesson-id", `${subject}-${lessonId}`);
});

// Map subject aliases to actual folder names
const subjectMap = {
  html: "html",
  css: "css",
  js: "javascript",
  javascript: "javascript",
  java: "java",
  csharp: "csharp"
};

// Lesson modules
const modules = {
  html: [
    { id: "intro", title: "Introduction to HTML" },
    { id: "html-basic", title: "Basics" },
    { id: "headings", title: "Headings & Paragraphs" },
    { id: "text", title: "Text Formatting" },
    { id: "lists", title: "Lists" },
    { id: "links", title: "Links & Images" },
    { id: "tables", title: "Tables" },
    { id: "forms", title: "Forms & Inputs" },
    { id: "semantic", title: "Semantic Elements" },
    { id: "entities", title: "HTML Entities" },
    { id: "bestpractices", title: "Best Practices" }
  ],
  css: [
    { id: "intro", title: "Introduction to CSS" },
    { id: "selectors", title: "Selectors & Specificity" },
    { id: "boxmodel", title: "Box Model" },
    { id: "flexbox", title: "Flexbox" },
    { id: "grid", title: "CSS Grid" }
  ],
  javascript: [
    { id: "intro", title: "Introduction to JavaScript" },
    { id: "variables", title: "Variables & Data Types" },
    { id: "functions", title: "Functions" },
    { id: "events", title: "DOM Events" },
    { id: "loops", title: "Loops & Conditions" }
  ],
  java: [
    { id: "intro", title: "Introduction to Java" },
    { id: "syntax", title: "Java Syntax" },
    { id: "datatypes", title: "Data Types" },
    { id: "methods", title: "Methods" },
    { id: "oop", title: "Object-Oriented Programming" }
  ],
  csharp: [
    { id: "intro", title: "Introduction to C#" },
    { id: "variables", title: "Variables & Types" },
    { id: "methods", title: "Methods" },
    { id: "classes", title: "Classes & Objects" },
    { id: "dotnet", title: ".NET Basics" }
  ]
};

// Load lesson content dynamically
function loadLesson(subject, lessonId, lessonKey) {
  const container = document.getElementById("lessonContent");
  if (!container) return;

  showLoading(container);

  const folder = subjectMap[subject] || "html";

  fetch(`lessons/${folder}/${lessonId}.html`)
    .then(res => {
      if (!res.ok) throw new Error("Lesson not found");
      return res.text();
    })
    .then(html => {
      container.innerHTML = `<div class="prose max-w-none">${html}</div>`;
      restoreProgress(lessonKey);
    })
    .catch(() => {
      container.innerHTML = `
        <div class="text-center py-10 text-red-600">
          <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
          <p>⚠️ Unable to load lesson: ${lessonId}</p>
        </div>
      `;
    });
}

// Show loading animation
function showLoading(container) {
  container.innerHTML = `
    <div class="text-center py-10 text-gray-500 animate-pulse">
      <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
      <p>Loading lesson...</p>
    </div>
  `;
}

// Render sidebar links based on subject
function renderSidebar(subject, activeLesson) {
  const normalized = subjectMap[subject] || "html";
  const listContainer = document.getElementById("lessonList");
  if (!listContainer || !modules[normalized]) return;

  listContainer.innerHTML = "";

  modules[normalized].forEach(module => {
    const isActive = module.id === activeLesson;
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="lesson-template.html?subject=${subject}&lesson=${module.id}" 
         class="block px-3 py-2 rounded ${isActive ? 'bg-purple-100 font-bold text-purple-700' : 'hover:bg-gray-100'}">
        ${module.title}
      </a>
    `;
    listContainer.appendChild(li);
  });
}

// Restore progress from localStorage
function restoreProgress(lessonKey) {
  const completed = localStorage.getItem(lessonKey);
  if (completed) {
    console.log(`✅ Lesson completed on ${completed}`);
  }
}

// Mark lesson as complete
function markComplete() {
  const lessonKey = document.body.getAttribute("data-lesson-id").replace("-", "Lesson_");
  const now = new Date().toLocaleString();
  localStorage.setItem(lessonKey, now);
  showPopup();
}

// Show completion popup
function showPopup() {
  const popup = document.getElementById("completionPopup");
  if (popup) popup.classList.remove("hidden");
}

// Close popup
function closePopup() {
  const popup = document.getElementById("completionPopup");
  if (popup) popup.classList.add("hidden");
}