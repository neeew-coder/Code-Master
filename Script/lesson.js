// lesson.js

let progress = 0;

// Update progress and handle completion
function updateProgress(amount) {
  progress = Math.min(progress + amount, 100);
  document.getElementById("progress-bar").style.width = progress + "%";
  document.getElementById("progress-label").textContent = progress + "% Completed";
  localStorage.setItem(lessonKey, progress);

  if (progress === 100 && !localStorage.getItem(lessonKey.replace("Progress", "CompletedAt"))) {
    const now = new Date().toLocaleString();
    localStorage.setItem(lessonKey.replace("Progress", "CompletedAt"), now);
    showPopup();
  }
}

// Simulate code output dynamically based on lesson type
function simulateLesson() {
  const outputElement = document.getElementById("lessonOutput");
  const codeInput = document.querySelector("textarea");

  if (!outputElement || !codeInput) return;

  const code = codeInput.value.trim();

  switch (lessonKey) {
    case "htmlLessonProgress": {
      // Extract <style> block
      const styleMatch = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      let scopedHTML = code;
      if (styleMatch) {
        const rawCSS = styleMatch[1];
        const scopedCSS = rawCSS.replace(/(^|\n)([^\{\}]+)\{/g, (match, newline, selector) => {
          const scopedSelector = selector
            .split(",")
            .map(s => `.simulation-box ${s.trim()}`)
            .join(", ");
          return `${newline}${scopedSelector} {`;
        });

        const styleTag = document.createElement("style");
        styleTag.textContent = scopedCSS;
        document.head.appendChild(styleTag);

        scopedHTML = code.replace(/<style[^>]*>[\s\S]*?<\/style>/i, "");
      }

      outputElement.innerHTML = `<div class="simulation-box">${scopedHTML}</div>`;
      break;
    }

    case "cssLessonProgress": {
      const scopedCSS = code.replace(/(^|\n)([^\{\}]+)\{/g, (match, newline, selector) => {
        const scopedSelector = selector
          .split(",")
          .map(s => `.simulation-box ${s.trim()}`)
          .join(", ");
        return `${newline}${scopedSelector} {`;
      });

      const cssTag = document.createElement("style");
      cssTag.textContent = scopedCSS;
      document.head.appendChild(cssTag);

      outputElement.innerHTML = `<div class="simulation-box"><h1>Hello, CodeMaster!</h1></div>`;
      break;
    }

    case "jsLessonProgress":
      try {
        const demoSpan = document.getElementById("demo");
        eval(code); // Use with caution
      } catch (err) {
        outputElement.textContent = "⚠️ Error: " + err.message;
      }
      break;

    case "javaLessonProgress":
    case "csharpLessonProgress":
      outputElement.textContent = code;
      break;

    default:
      outputElement.textContent = code;
  }

  updateProgress(40);
}

// Reset lesson progress
function resetLesson() {
  progress = 0;
  document.getElementById("progress-bar").style.width = "0%";
  document.getElementById("progress-label").textContent = "0% Completed";
  localStorage.removeItem(lessonKey);
  localStorage.removeItem(lessonKey.replace("Progress", "CompletedAt"));

  const outputElement = document.getElementById("lessonOutput");
  if (outputElement) {
    outputElement.textContent = "Output will appear here...";
  }

  const feedback = document.getElementById("quiz-feedback");
  if (feedback) {
    feedback.textContent = "";
    feedback.classList.remove("text-green-600", "text-red-600");
  }

  // Optional: remove previously injected styles
  const injectedStyles = document.querySelectorAll("head style");
  injectedStyles.forEach(style => {
    if (style.textContent.includes(".simulation-box")) {
      style.remove();
    }
  });
}

// Check quiz answer
function checkAnswer(choice) {
  const feedback = document.getElementById("quiz-feedback");
  if (!feedback) return;

  feedback.classList.remove("text-green-600", "text-red-600");
  if (choice === correctAnswer) {
    feedback.textContent = "✅ Correct!";
    feedback.classList.add("text-green-600");
    updateProgress(60);
  } else {
    feedback.textContent = "❌ Not quite. Try again!";
    feedback.classList.add("text-red-600");
  }
}

// Completion popup
function showPopup() {
  const popup = document.getElementById("completionPopup");
  if (popup) popup.classList.remove("hidden");
}

function closePopup() {
  const popup = document.getElementById("completionPopup");
  if (popup) popup.classList.add("hidden");
}

// Initialize on load
window.addEventListener("load", () => {
  const saved = localStorage.getItem(lessonKey);
  if (saved) {
    progress = parseInt(saved);
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("progress-label").textContent = progress + "% Completed";
  }
});