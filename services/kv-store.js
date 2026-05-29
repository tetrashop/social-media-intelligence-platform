const fs = require('fs');
const path = require('path');
const MODEL_PATH = path.join(__dirname, '..', 'data', 'deep-model.json');

async function saveModel(modelJson) {
  const dir = path.dirname(MODEL_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(MODEL_PATH, JSON.stringify(modelJson));
}

async function loadModel() {
  if (fs.existsSync(MODEL_PATH)) {
    return JSON.parse(fs.readFileSync(MODEL_PATH, 'utf-8'));
  }
  return null;
}

module.exports = { saveModel, loadModel };
