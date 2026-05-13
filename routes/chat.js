const express = require('express');
const router = express.Router();
const { processMessage } = require('../services/ai-chat');
const { getDB } = require('../database');

router.post('/message', async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    if (!message || !sessionId) {
      return res.json({ response: '❌ پیام و نشست الزامی است.' });
    }
    const db = getDB();
    await db.runAsync('INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)',
      [sessionId, 'user', message]);
    const result = await processMessage(message, sessionId);
    const reply = result?.reply || 'متوجه نشدم.';
    await db.runAsync('INSERT INTO chat_messages (session_id, role, content) VALUES (?, ?, ?)',
      [sessionId, 'assistant', reply]);
    console.log('پاسخ:', reply);
    res.json({ response: reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.json({ response: '⚠️ خطا در سرور' });
  }
});

router.get('/history', (req, res) => {
  res.json([]);
});

module.exports = router;
