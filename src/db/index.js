const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(process.cwd(), 'data');
const dbFile = path.join(dataDir, 'app.sqlite');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbFile);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  access_token TEXT,
  id_token TEXT NOT NULL,
  provider TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE,
  phone_number TEXT,
  is_verified INTEGER DEFAULT 0,
  date_of_birth TEXT,
  age INTEGER,
  gender TEXT,
  favorite_spot TEXT,
  interest TEXT,
  distance_preference INTEGER,
  photos TEXT,
  token_id INTEGER,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (token_id) REFERENCES tokens(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`);

function now() {
  return new Date().toISOString();
}

module.exports = { db, now };
