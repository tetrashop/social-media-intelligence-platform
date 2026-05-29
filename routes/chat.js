const express = require('express');
const router = express.Router();
const { processMessage } = require('../services/ai-chat');

router.post('/message', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || !sessionId) {
      return res.status(400).json({ response: '❌ پیام و شناسه نشست الزامی هستند.' });
    }

    let result;
    try {
      result = await processMessage(message, sessionId);
    } catch (err) {
      console.error('processMessage error:', err);
      result = { reply: 'خطا در پردازش پیام.', analysis: null };
    }

    const reply = result?.reply || 'پاسخی دریافت نشد.';
    const analysis = result?.analysis || null;

    res.json({ response: reply, analysis });
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ response: '❌ خطای داخلی سرور.' });
  }
});

module.exports = router;
