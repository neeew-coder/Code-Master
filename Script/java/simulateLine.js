
function preprocessArrayDeclaration(line, vars) {
  const match = line.match(/int\[\]\s+(\w+)\s*=\s*\{([^}]+)\}/);
  if (match) {
    const name = match[1];
    const values = match[2].split(',').map(v => parseInt(v.trim()));
    vars[name] = values;
  }
}

function simulateLine(line, vars) {
  line = line.trim();
  let control = null;
  let outputLine = null;

  // Handle 'continue'
  const continueMatch = line.match(/if\s*\((.+)\)\s*continue;/);
  if (continueMatch) {
    const cond = continueMatch[1];
    if (evalExpr(cond, vars)) {
      control = "continue";
      return { control, output: null };
    }
  }

  // Handle 'break'
  const breakMatch = line.match(/if\s*\((.+)\)\s*break;/);
  if (breakMatch) {
    const cond = breakMatch[1];
    if (evalExpr(cond, vars)) {
      control = "break";
      return { control, output: null };
    }
  }

  // Handle array declaration
  if (line.includes("int[]")) {
    preprocessArrayDeclaration(line, vars);
    return { control, output: null };
  }

  // Handle print
  const printMatch = line.match(/System\.out\.println\((.+?)\);/);
  if (printMatch) {
    outputLine = evalExpr(printMatch[1].trim(), vars);
  }

  // Handle variable assignment
  const assignMatch = line.match(/^(\w+)\s*=\s*([^;]+);$/);
  if (assignMatch) {
    const v = assignMatch[1];
    const expr = assignMatch[2];
    vars[v] = evalExpr(expr.trim(), vars);
  }

  // Handle array element assignment
  const arrayAssignMatch = line.match(/^(\w+)\[(.+?)\]\s*=\s*(.+);$/);
  if (arrayAssignMatch) {
    const arrName = arrayAssignMatch[1];
    const indexExpr = arrayAssignMatch[2];
    const valueExpr = arrayAssignMatch[3];

    const index = evalExpr(indexExpr.trim(), vars);
    const value = evalExpr(valueExpr.trim(), vars);

    if (Array.isArray(vars[arrName]) && !isNaN(index)) {
      vars[arrName][index] = value;
    }
  }

  return { control, output: outputLine };
}

function simulateForLoop(initLine, conditionExpr, updateExpr, bodyLines, vars, output) {
  simulateLine(initLine, vars); // e.g., "int i = 0;"

  let loopGuard = 0;
  outer: while (evalExpr(conditionExpr, vars) && loopGuard < 100) {
    for (let line of bodyLines) {
      const result = simulateLine(line, vars);
      if (result.control === "break") break outer;
      if (result.control === "continue") break;
      if (result.output !== null) output.push(result.output);
    }

    simulateLine(updateExpr, vars); // e.g., "i++"
    loopGuard++;
  }
}

function simulateProgram(lines) {
  const vars = {};
  const output = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();

    // Handle for loop
    const forMatch = line.match(/^for\s*\(\s*int\s+(\w+)\s*=\s*(-?\d+);\s*(\w+)\s*([<>=!]+)\s*(-?\d+);\s*(\w+)(\+\+|--)\s*\)/);
    if (forMatch) {
      const varName = forMatch[1];
      const start = parseInt(forMatch[2]);
      const condVar = forMatch[3];
      const operator = forMatch[4];
      const end = parseInt(forMatch[5]);
      const updateVar = forMatch[6];
      const updateOp = forMatch[7];

      // Collect loop body
      i++; // move to loop body
      const loopBody = [];
      let braceDepth = 0;
      while (i < lines.length) {
        const innerLine = lines[i].trim();
        if (innerLine.includes("{")) braceDepth++;
        if (innerLine.includes("}")) {
          braceDepth--;
          if (braceDepth <= 0) break;
          i++;
          continue;
        }
        loopBody.push(innerLine);
        i++;
      }

      // Simulate loop
      const conditionExpr = `${condVar} ${operator} ${end}`;
      const updateExpr = `${updateVar}${updateOp}`;
      const initLine = `int ${varName} = ${start};`;
      simulateForLoop(initLine, conditionExpr, updateExpr, loopBody, vars, output);

      if (lines[i] && lines[i].trim() === "}") i++; // skip closing brace
      continue;
    }

    // Regular line
    const result = simulateLine(line, vars);
    if (result.output !== null) output.push(result.output);

    i++;
  }

  return output;
}