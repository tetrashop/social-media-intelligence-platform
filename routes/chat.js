const express = require('express');
const router = express.Router();
const { processMessage, trainOnDataset } = require('../services/ai-chat');

router.post('/message', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || !sessionId) {
      return res.status(400).json({ response: '❌ پیام و شناسه نشست الزامی هستند.' });
    }
    const result = await processMessage(message, sessionId);
    res.json({ response: result.reply, analysis: result.analysis || null });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({ response: '⚠️ خطای داخلی سرور' });
  }
});

router.post('/train', async (req, res) => {
  try {
    const { dataset } = req.body;
    if (!dataset || !Array.isArray(dataset)) {
      return res.status(400).json({ error: 'آرایه‌ای از { text, intent } ارسال کنید.' });
    }
    const result = await trainOnDataset(dataset);
    res.json(result);
  } catch (err) {
    console.error('Train error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
