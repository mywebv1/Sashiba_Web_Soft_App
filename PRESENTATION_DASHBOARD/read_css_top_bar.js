const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const lines = cssContent.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('btn-sidebar-toggle') || line.includes('main-heading') || line.includes('title-area') || line.includes('top-bar')) {
    console.log(`L${idx + 1}: ${line.trim()}`);
    for (let i = Math.max(0, idx - 3); i <= Math.min(lines.length - 1, idx + 8); i++) {
      console.log(`  [${i+1}] ${lines[i].trim()}`);
    }
    console.log('-----------------------------------------');
  }
});
