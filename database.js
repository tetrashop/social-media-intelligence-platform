const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

let db;
const DB_FILE = path.join(__dirname, 'data', 'platform.db');

function saveToFile() {
  try {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  } catch (err) {
    console.error('خطا در ذخیره دیتابیس:', err);
  }
}

async function initDatabase() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

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
  db.run(`CREATE TABLE IF NOT EXISTS social_analyses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT UNIQUE,
      analysis TEXT,
      sentiment REAL,
      keywords TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  saveToFile();

  db.runAsync = (sql, params) => {
    db.run(sql, params);
    saveToFile();
  };
  db.getAsync = (sql, params) => {
    const stmt = db.prepare(sql);
    const result = stepRow(stmt, params);
    stmt.free();
    return result;
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

function stepRow(stmt, params) {
  stmt.bind(params);
  if (stmt.step()) {
    const row = stmt.getAsObject();
    stmt.reset();
    return row;
  }
  stmt.reset();
  return null;
}

function getDB() {
  if (!db) throw new Error('دیتابیس راه‌اندازی نشده است');
  return db;
}

module.exports = { initDatabase, getDB };
