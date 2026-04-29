const fs = require('fs');

const code = fs.readFileSync('js/vr-experience.js', 'utf8');
const lines = code.split('\n');

// Track all variable declarations
const declarations = new Map();
const globalScope = [];

lines.forEach((line, index) => {
  // Check for const, let, var declarations
  const match = line.match(/^\s*(const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)/);
  if (match) {
    const type = match[1];
    const name = match[2];
    const lineNum = index + 1;

    // Check if this is likely at global scope (no indentation or minimal)
    const indentMatch = line.match(/^(\s*)/);
    const indent = indentMatch ? indentMatch[1].length : 0;

    if (indent === 0) {  // Global scope
      if (declarations.has(name)) {
        const prev = declarations.get(name);
        if (prev.scope === 'global') {
          console.log(`❌ DUPLICATE GLOBAL: ${type} ${name} at line ${lineNum} (previously at line ${prev.line})`);
        }
      } else {
        declarations.set(name, { line: lineNum, type, scope: 'global' });
        globalScope.push({ name, line: lineNum, type });
      }
    }
  }
});

console.log('\n✅ Global scope variables found:');
globalScope.forEach(v => {
  console.log(`  ${v.type} ${v.name} (line ${v.line})`);
});

console.log(`\nTotal global variables: ${globalScope.length}`);