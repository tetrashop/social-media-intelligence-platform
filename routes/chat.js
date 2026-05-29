const express = require('express');
const router = express.Router();
const { processMessage } = require('../services/ai-chat');
const { NeuralNetwork, TextVectorizer, DEFAULT_VOCABULARY, INTENT_LABELS } = require('../services/deep-learning');
const { saveModel } = require('../services/kv-store');

// آموزش مدل با دادهٔ خارجی
router.post('/train', async (req, res) => {
  try {
    const { dataset } = req.body; // آرایه‌ای از { text, intent }
    if (!dataset || !Array.isArray(dataset)) return res.status(400).json({ error: 'فرمت دیتاست نادرست' });

    const nn = new NeuralNetwork(DEFAULT_VOCABULARY.length, 12, INTENT_LABELS.length, 0.1);
    const vectorizer = new TextVectorizer(DEFAULT_VOCABULARY);

    for (const item of dataset) {
      if (!item.text || !item.intent) continue;
      const inputVec = vectorizer.vectorize(item.text);
      const outputVec = Array(INTENT_LABELS.length).fill(0);
      const idx = INTENT_LABELS.indexOf(item.intent);
      if (idx !== -1) outputVec[idx] = 1;
      nn.train(inputVec, outputVec);
    }

    await saveModel(nn.toJSON());
    res.json({ message: `مدل با ${dataset.length} نمونه آموزش دید و ذخیره شد.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'خطا در آموزش مدل' });
  }
});

// مسیر اصلی چت
router.post('/message', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || !sessionId) return res.status(400).json({ response: 'پیام و نشست الزامی هستند.' });

    const result = await processMessage(message, sessionId);
    res.json({ response: result.reply, analysis: result.analysis });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: 'خطای داخلی سرور' });
  }
});

module.exports = router;
