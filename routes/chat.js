const express = require('express');
const router = express.Router();
const { processMessage } = require('../services/ai-chat');

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

module.exports = router;
