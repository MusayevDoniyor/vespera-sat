const fs = require('fs');
const path = require('path');

const scriptsDir = path.resolve('scripts');
const files = fs.readdirSync(scriptsDir).filter(f => f.endsWith('.mjs') || f.endsWith('.js'));

console.log("Analyzing seed files in scripts/ and src/lib/:");
let allIds = new Set();
let filesWithQs = [];

for (const f of files) {
  const fullPath = path.join(scriptsDir, f);
  const content = fs.readFileSync(fullPath, 'utf8');
  const matches = content.match(/id:\s*"([a-zA-Z0-9_\-]+)"/g);
  if (matches && matches.length > 0) {
    const ids = matches.map(m => m.replace(/id:\s*"/, '').replace(/"/, ''));
    console.log(`- ${f}: ${ids.length} questions`);
    ids.forEach(id => allIds.add(id));
    filesWithQs.push(f);
  }
}

// Check src/lib files
const libFiles = ['curriculum-data.ts', 'satashkent-data.ts', 'bluebook-tests.ts'];
for (const f of libFiles) {
  const p = path.resolve('src/lib', f);
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    const matches = content.match(/id:\s*"([a-zA-Z0-9_\-]+)"/g);
    if (matches && matches.length > 0) {
      const ids = matches.map(m => m.replace(/id:\s*"/, '').replace(/"/, ''));
      console.log(`- src/lib/${f}: ${ids.length} questions`);
      ids.forEach(id => allIds.add(id));
    }
  }
}

console.log(`\nTOTAL UNIQUE QUESTION IDs DISCOVERED: ${allIds.size}`);
