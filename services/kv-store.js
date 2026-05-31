const fs = require('fs');
const path = require('path');

const DIR = process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, '..', 'data');
const FILE = path.join(DIR, 'deep-model.json');

async function saveModel(json) {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(json));
}

async function loadModel() {
  if (fs.existsSync(FILE)) return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
  return null;
}

module.exports = { saveModel, loadModel };
