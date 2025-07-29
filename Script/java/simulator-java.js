window.CodeMasterJavaSim = (function () {
  return {
    simulate: function (code, outputElement) {
      const lines = code.split("\n").map(l => l.trim()).filter(l => l && !l.startsWith("//"));
      const vars = {};
      const output = [];

      function evalExpr(expr) {
        expr = expr.replace(/\b\w+\b/g, (token) => {
          if (vars.hasOwnProperty(token)) {
            const val = vars[token];
            return typeof val === "string" ? `"${val}"` : val;
          }
          return token;
        });
        try {
          return eval(expr);
        } catch (e) {
          return `Error: ${e.message}`;
        }
      }

      let i = 0;
      while (i < lines.length) {
        const line = lines[i];

        // Variable declaration
        if (/int\s+\w+\s*=\s*\d+;/.test(line)) {
          const [_, name, value] = line.match(/int\s+(\w+)\s*=\s*(\d+);/);
          vars[name] = parseInt(value);
          i++;
          continue;
        }

        // While loop
        if (/while\s*\((.+)\)/.test(line)) {
          const cond = line.match(/while\s*\((.+)\)/)[1];
          i++;
          const loopBody = [];
          while (lines[i] !== "}") {
            loopBody.push(lines[i++]);
          }
          i++;

          while (eval(cond.replace(/(\w+)/g, m => `vars.${m}`))) {
            let skip = false;
            for (let l of loopBody) {
              if (l.includes("++")) {
                const v = l.match(/(\w+)\+\+/)[1];
                vars[v]++;
                continue;
              }

              if (/if\s*\((.+)\)\s*continue;/.test(l)) {
                const c = l.match(/if\s*\((.+)\)\s*continue;/)[1];
                if (eval(c.replace(/(\w+)/g, m => `vars.${m}`))) {
                  skip = true;
                  break;
                }
              }

              if (/if\s*\((.+)\)\s*break;/.test(l)) {
                const c = l.match(/if\s*\((.+)\)\s*break;/)[1];
                if (eval(c.replace(/(\w+)/g, m => `vars.${m}`))) {
                  outputElement.textContent = "🔄 Simulated Output:\n" + output.join("\n");
                  return;
                }
              }

              if (/System\.out\.println\((.+)\);/.test(l) && !skip) {
                const expr = l.match(/System\.out\.println\((.+)\);/)[1];
                const val = eval(expr.replace(/(\w+)/g, m => `vars.${m}`));
                output.push(val);
              }
            }
          }
          continue;
        }

        // Post-loop println
        if (/System\.out\.println\((.+)\);/.test(line)) {
          const expr = line.match(/System\.out\.println\((.+)\);/)[1];
          const val = eval(expr.replace(/(\w+)/g, m => `vars.${m}`));
          output.push(val);
        }

        i++;
      }

      outputElement.textContent = output.length
        ? "🔄 Simulated Output:\n" + output.join("\n")
        : "❌ Error: Unable to simulate output.";
    }
  };
})();