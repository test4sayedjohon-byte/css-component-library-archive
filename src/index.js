/**
 * legacy-data-pipeline-utils — Entry Point
 * Data transformation and normalization utilities
 * @version 1.2.3 (archived 2020-11-14)
 */

const { transformCSV, normalizeJSON } = require('./utils');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const inputFile = args[args.indexOf('--input') + 1] || null;
const outputFile = args[args.indexOf('--output') + 1] || 'output.json';

if (!inputFile) {
  console.error('Error: --input <file> is required');
  process.exit(1);
}

console.log(`[INFO] Processing: ${inputFile}`);

const raw = fs.readFileSync(path.resolve(inputFile), 'utf-8');
const ext = path.extname(inputFile).toLowerCase();

let result;
if (ext === '.csv') {
  result = transformCSV(raw);
} else if (ext === '.json') {
  result = normalizeJSON(JSON.parse(raw));
} else {
  console.error(`Unsupported format: ${ext}`);
  process.exit(1);
}

fs.writeFileSync(path.resolve(outputFile), JSON.stringify(result, null, 2));
console.log(`[INFO] Output written to ${outputFile}`);
