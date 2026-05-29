require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const { initDatabase } = require('./database');
const chatRouter = require('./routes/chat');

const app = express();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/chat', chatRouter);

app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'public', 'admin.html')));
app.get('/chat', (req, res) => res.redirect('/'));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// مقداردهی اولیه دیتابیس (به‌صورت async)
const startServer = async () => {
  await initDatabase();
  if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 نگار کوانتا روی http://localhost:${PORT} فعال شد`);
    });
  }
};

startServer();

// برای Vercel اکسپورت می‌شود
module.exports = app;
