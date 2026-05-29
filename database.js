const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

let db;
const DB_DIR = process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'platform.db');

function saveToFile() {
  try {
    if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
    const data = db.export();
    fs.writeFileSync(DB_FILE, Buffer.from(data));
  } catch (err) {
    console.error('خطا در ذخیره دیتابیس:', err);
  }
}

async function initDatabase() {
  if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

  const SQL = await initSqlJs();
  if (fs.existsSync(DB_FILE)) {
    const fileBuffer = fs.readFileSync(DB_FILE);
    db = new SQL.Database(fileBuffer);
    console.log('✓ دیتابیس از فایل بارگذاری شد');
  } else {
    db = new SQL.Database();
    console.log('✓ دیتابیس جدید در حافظه ساخته شد');
  }

  db.run(`CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      role TEXT CHECK(role IN ('user','assistant')) NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  saveToFile();

  db.runAsync = (sql, params) => {
    db.run(sql, params);
    saveToFile();
  };
  db.getAsync = (sql, params) => {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const row = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();
    return row;
  };
  db.allAsync = (sql, params) => {
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const rows = [];
    while (stmt.step()) rows.push(stmt.getAsObject());
    stmt.free();
    return rows;
  };
}

function getDB() {
  if (!db) throw new Error('دیتابیس راه‌اندازی نشده است');
  return db;
}

module.exports = { initDatabase, getDB };
