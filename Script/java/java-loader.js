function loadModule(lessonId) {
      const container = document.getElementById("moduleContent");
      if (!container) return;

      document.querySelectorAll("aside button").forEach(btn => {
        btn.classList.remove("bg-red-100", "font-semibold", "text-red-700");
        btn.classList.add("text-red-600");
      });
      const activeBtn = document.querySelector(`button[onclick="loadModule('${lessonId}')"]`);
      if (activeBtn) {
        activeBtn.classList.add("bg-red-100", "font-semibold", "text-red-700");
        activeBtn.classList.remove("text-red-600");
      }

      container.innerHTML = `
        <div class="text-center py-10 text-gray-500 animate-pulse">
          <i class="fas fa-spinner fa-spin text-2xl mb-2"></i>
          <p>Loading module...</p>
        </div>
      `;

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
          bindAllPreviews();
          updateProgress(lessonId);
          scrollToTop();
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