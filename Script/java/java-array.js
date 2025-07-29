function runJavaArrayModule() {
  const code = document.getElementById("java-array-code").value;
  const output = simulateJavaOutput(code);
  document.getElementById("java-array-output").innerText = output.join("\n");
}

function simulateJavaOutput(code) {
  const lines = code.split('\n').map(line => line.trim()).filter(line => line);
  const vars = {};
  const output = [];

lines.forEach((line, idx) => {
  if (line.startsWith('int')) parseJavaDeclaration(line, vars);
  if (line.startsWith('int')) parseVariableInit(line, vars);
});

lines.forEach((line, idx) => {
  if (line.startsWith('for')) simulateForLoop(line, lines, vars, output);
  if (line.startsWith('while')) simulateWhileLoop(idx, lines, vars, output);
});

  return output;
}

function parseVariableInit(line, vars) {
  const match = line.match(/int\s+(\w+)\s*=\s*(-?\d+)\s*;/);
  if (match) {
    vars[match[1]] = parseInt(match[2]);
  }
}


function parseJavaDeclaration(line, vars) {
  const match = line.match(/int\s*\[\s*\]\s*(\w+)\s*=\s*\{([^}]*)\}\s*;?/);
  if (match) {
    const name = match[1];
    const raw = match[2].split(',').map(v => v.trim());
    const values = raw.map(v => parseInt(v));
    vars[name] = values;
  }
}

function simulateForLoop(forLine, lines, vars, output) {
  const match = forLine.match(/for\s*\(\s*int\s+(\w+)\s*=\s*(-?\d+);\s*\1\s*([<>=!]+)\s*(\w+\.length|\d+);\s*\1(\+\+|--)\s*\)/);
  if (!match) return;

  const varName = match[1];
  let current = parseInt(match[2]);
  const operator = match[3];
  const targetRaw = match[4];
  const update = match[5];

  let target = 0;
  if (targetRaw.endsWith('.length')) {
    const arrName = targetRaw.split('.')[0];
    target = Array.isArray(vars[arrName]) ? vars[arrName].length : 0;
  } else {
    target = parseInt(targetRaw);
  }

  // Find loop body
  const loopBody = [];
  let braceCount = 1;
  let i = lines.indexOf(forLine) + 1;
  while (i < lines.length && braceCount > 0) {
    const line = lines[i];
    if (line.includes("{")) braceCount++;
    if (line.includes("}")) braceCount--;
    if (braceCount > 0) loopBody.push(line.trim());
    i++;
  }

  vars[varName] = current;
  let guard = 0;
  while (guard++ < 100) {
    if (!compare(vars[varName], operator, target)) break;

    for (const bodyLine of loopBody) {
      const printMatch = bodyLine.match(/System\.out\.println\s*\((.+?)\);/);
      if (printMatch) {
        output.push(evalExpr(printMatch[1], vars));
      }
    }

    vars[varName] += update === '++' ? 1 : -1;
  }
}

function compare(a, op, b) {
  switch (op) {
    case '<': return a < b;
    case '>': return a > b;
    case '<=': return a <= b;
    case '>=': return a >= b;
    case '==': return a == b;
    case '!=': return a != b;
    default: return false;
  }
}

function evalExpr(expr, vars) {
  const stringLiterals = [];
  expr = expr.replace(/"([^"]*)"/g, (match) => {
    stringLiterals.push(match);
    return `__STR${stringLiterals.length - 1}__`;
  });

  expr = expr.replace(/(\w+)\[(\w+)\]/g, (_, arr, idx) => {
    const i = vars[idx];
    const array = vars[arr];
    return array && array[i] !== undefined ? array[i] : 'undefined';
  });

  expr = expr.replace(/\b(\w+)\b/g, (match) => {
    if (vars.hasOwnProperty(match)) {
      const val = vars[match];
      return typeof val === 'number' ? val : `"${val}"`;
    }
    return match;
  });

  expr = expr.replace(/__STR(\d+)__/g, (_, index) => stringLiterals[index]);

  try {
    return eval(expr);
  } catch (e) {
    return `Error evaluating expression: ${expr}`;
  }
}

function simulateWhileLoop(startIndex, lines, vars, output) {
  let i = startIndex;
  const conditionLine = lines[i];
  const conditionMatch = conditionLine.match(/while\s*\(\s*(\w+)\s*([<>=!]+)\s*(\w+\.length|\d+)\s*\)/);
  if (!conditionMatch) return;

  const left = conditionMatch[1];
  const operator = conditionMatch[2];
  const rightRaw = conditionMatch[3];

  let right = 0;
  if (rightRaw.endsWith('.length')) {
    const arrName = rightRaw.split('.')[0];
    right = Array.isArray(vars[arrName]) ? vars[arrName].length : 0;
  } else {
    right = parseInt(rightRaw);
  }

  // Find loop body
  const loopBody = [];
  let braceCount = 1;
  i++;
  while (i < lines.length && braceCount > 0) {
    const line = lines[i];
    if (line.includes("{")) braceCount++;
    if (line.includes("}")) braceCount--;
    if (braceCount > 0) loopBody.push(line.trim());
    i++;
  }

  let guard = 0;
  while (guard++ < 100) {
    if (!compare(vars[left], operator, right)) break;

    for (const bodyLine of loopBody) {
      const printMatch = bodyLine.match(/System\.out\.println\s*\((.+?)\);/);
      if (printMatch) {
        output.push(evalExpr(printMatch[1], vars));
      }

      const incMatch = bodyLine.match(new RegExp(`${left}\\s*\\+\\+`));
      if (incMatch) vars[left]++;
    }
  }
}