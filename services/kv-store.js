const fs = require('fs');
const path = require('path');

let kv;
try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { createClient } = require('@vercel/kv');
    kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    console.log('✓ Vercel KV فعال شد');
  }
} catch (e) {
  console.log('KV در دسترس نیست، استفاده از ذخیره‌سازی محلی');
}

// مسیر فایل محلی (fallback)
const LOCAL_MODEL_PATH = path.join(__dirname, '..', 'data', 'deep-model.json');

async function saveModel(modelJson) {
  if (kv) {
    await kv.set('deep_model', JSON.stringify(modelJson));
    console.log('مدل در KV ذخیره شد');
  } else {
    const dir = path.dirname(LOCAL_MODEL_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(LOCAL_MODEL_PATH, JSON.stringify(modelJson));
    console.log('مدل در فایل محلی ذخیره شد');
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
