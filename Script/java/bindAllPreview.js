    function bindAllPreviews() {
      document.querySelectorAll("[data-preview]").forEach(block => {
        const runBtn = block.querySelector("button");
        const outputDiv = block.querySelector(".output");
        const codeBlock = block.querySelector("textarea, pre");

        if (!runBtn || !codeBlock || !outputDiv) return;

        runBtn.addEventListener("click", () => {
          const code = codeBlock.tagName === "TEXTAREA"
            ? codeBlock.value.trim()
            : codeBlock.textContent.trim();

          const lang = block.getAttribute("data-lang") || "java";

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
      });
    }