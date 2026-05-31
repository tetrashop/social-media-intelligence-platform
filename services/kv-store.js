const fs = require('fs');
const path = require('path');

let kv = null;
try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { createClient } = require('@vercel/kv');
    kv = createClient({ url: process.env.KV_REST_API_URL, token: process.env.KV_REST_API_TOKEN });
  }
} catch (e) {}

const DIR = process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, '..', 'data');
const FILE = path.join(DIR, 'deep-model.json');

async function saveModel(json) {
  if (kv) {
    await kv.set('deep_model', JSON.stringify(json));
  } else {
    if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
    fs.writeFileSync(FILE, JSON.stringify(json));
  }
}

async function loadModel() {
  if (kv) {
    const raw = await kv.get('deep_model');
    return raw ? JSON.parse(raw) : null;
  } else {
    if (fs.existsSync(FILE)) {
      return JSON.parse(fs.readFileSync(FILE, 'utf-8'));
    }
  }
  return null;
}

module.exports = { saveModel, loadModel };
