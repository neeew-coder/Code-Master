// JavaScript module loader for lesson content
function loadModule(lessonId) {
  const container = document.getElementById("moduleContent");
  if (!container) return;

  // Reset sidebar button styles
  document.querySelectorAll("aside button").forEach(btn => {
    btn.classList.remove("bg-red-100", "font-semibold", "text-red-700");
    btn.classList.add("text-red-600");
  });

  // Highlight active button
  const activeBtn = document.querySelector(`button[onclick="loadModule('${lessonId}')"]`);
  if (activeBtn) {
    activeBtn.classList.add("bg-red-100", "font-semibold", "text-red-700");
    activeBtn.classList.remove("text-red-600");
  }

  // Show loading spinner
  container.innerHTML = `
    <div class="text-center py-10 text-gray-500 animate-pulse">
      <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
      <p>Loading module...</p>
    </div>
  `;

  // Fetch module content
  fetch(`lessons/java/${lessonId}.html`)
    .then(res => {
      if (!res.ok) throw new Error("Module not found");
      return res.text();
    })
    .then(html => {
      container.innerHTML = `
        <div class="bg-white p-6 rounded-lg shadow-md prose max-w-none text-gray-800">
          ${html}
        </div>
      `;
      bindAllPreviews();       // Attach run logic
      updateProgress(lessonId); // Track progress
      scrollToTop();            // UX polish
    })
    .catch(() => {
      container.innerHTML = `
        <div class="text-center py-10 text-red-500">
          <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
          <p>⚠️ Unable to load module: ${lessonId}</p>
        </div>
      `;
    });
}

function bindAllPreviews() {
  document.querySelectorAll("[data-preview]").forEach(block => {
    const mode = block.getAttribute("data-mode") || "inline";
    const lang = block.getAttribute("data-lang") || "java";

    if (mode === "jdoodle") {
      // JDoodle redirect mode
      const form = block.querySelector("form");
      const codeInput = form?.querySelector(".code-input");
      const hiddenField = form?.querySelector('textarea[name="initScript"]');

      if (form && codeInput && hiddenField) {
        form.addEventListener("submit", () => {
          hiddenField.value = codeInput.value;
        });
      }
    } else {
      // Inline execution mode
      const runBtn = block.querySelector("button");
      const outputDiv = block.querySelector(".output");
      const codeBlock = block.querySelector("textarea, pre");

      if (!runBtn || !codeBlock || !outputDiv) return;

      runBtn.addEventListener("click", () => {
        const code = codeBlock.tagName === "TEXTAREA"
          ? codeBlock.value.trim()
          : codeBlock.textContent.trim();

        runBtn.disabled = true;
        runBtn.innerText = "Running...";

        fetch(`http://127.0.0.1:3000/run-${lang}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ script: code })
        })
        .then(res => res.text())
        .then(text => {
          let output = "";
          try {
            const data = JSON.parse(text);
            output = data.output?.trim();
          } catch {
            output = null;
          }
          outputDiv.innerText = output || simulateOutput(code, lang);
        })
        .catch(() => {
          outputDiv.innerText = simulateOutput(code, lang);
        })
        .finally(() => {
          runBtn.disabled = false;
          runBtn.innerText = "Run";
        });
      });
    }
  });
}

// Optional fallback output simulator
function simulateOutput(code, lang) {
  return `⚠️ Simulation not available for ${lang}.`;
}

// Optional scroll helper
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Stub for progress tracking
function updateProgress(lessonId) {
  console.log(`Progress updated for: ${lessonId}`);
}