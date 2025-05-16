const fs = require('fs');
const path = require('path');

const template = fs.readFileSync('./public/metadata/passport/1.json', 'utf-8');
const outputDir = './public/metadata/passport';

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

for (let i = 1; i <= 1000000; i++) {
  fs.writeFileSync(path.join(outputDir, `${i}.json`), template);
}
