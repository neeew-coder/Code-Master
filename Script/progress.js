    function updateProgress(lessonId) {
      const progressBar = document.getElementById("progress-bar");
      const completedModules = JSON.parse(localStorage.getItem("javaCompleted") || "[]");

      if (!completedModules.includes(lessonId)) {
        completedModules.push(lessonId);
        localStorage.setItem("javaCompleted", JSON.stringify(completedModules));
      }

      const total = 5; // Update this if you add more modules
      const percent = Math.round((completedModules.length / total) * 100);
      progressBar.style.width = `${percent}%`;

      const label = document.querySelector(".progress-label");
      if (label) label.textContent = `${percent}% Completed`;
    }