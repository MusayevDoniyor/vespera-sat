const fs = require('fs');
const text = fs.readFileSync('scripts/cb_new_qs_raw.txt', 'utf8');

const pages = text.split('<<<PAGE_');
console.log(`Total page blocks: ${pages.length}`);

for (let i = 1; i <= Math.min(5, pages.length - 1); i++) {
  console.log(`\n=================== PAGE ${i} ===================`);
  console.log(pages[i].slice(0, 500));
}
