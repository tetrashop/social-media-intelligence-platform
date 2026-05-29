const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/chat/message', (req, res) => {
  res.json({ response: 'سلام! نسخهٔ تستی نگار کوانتا روی Vercel فعال است.' });
});

// فقط برای تست محلی
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log('تستی محلی روی پورت ' + PORT));
}

module.exports = app;
