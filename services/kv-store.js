const fs = require('fs');
const path = require('path');

let kv = null;
try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { createClient } = require('@vercel/kv');
    kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    console.log('✓ Vercel KV متصل شد');
  }
} catch (e) {
  console.log('KV در دسترس نیست، استفاده از ذخیره‌سازی محلی');
}

const LOCAL_MODEL_DIR = process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, '..', 'data');
const LOCAL_MODEL_PATH = path.join(LOCAL_MODEL_DIR, 'deep-model.json');

async function saveModel(modelJson) {
  if (kv) {
    await kv.set('deep_model', JSON.stringify(modelJson));
    console.log('✓ مدل در KV ذخیره شد');
  } else {
    if (!fs.existsSync(LOCAL_MODEL_DIR)) {
      fs.mkdirSync(LOCAL_MODEL_DIR, { recursive: true });
    }
    fs.writeFileSync(LOCAL_MODEL_PATH, JSON.stringify(modelJson));
    console.log('✓ مدل در فایل محلی ذخیره شد');
  }
}

async function loadModel() {
  if (kv) {
    const raw = await kv.get('deep_model');
    return raw ? JSON.parse(raw) : null;
  } else {
    if (fs.existsSync(LOCAL_MODEL_PATH)) {
      return JSON.parse(fs.readFileSync(LOCAL_MODEL_PATH, 'utf-8'));
    }
  }
  return null;
}

module.exports = { saveModel, loadModel };
