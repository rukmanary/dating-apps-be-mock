const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(process.cwd(), "data");
const dbFile = path.join(dataDir, "app.sqlite");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbFile);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

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
  job TEXT,
  bio TEXT,
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

// Lightweight migration to add new columns when upgrading existing databases
try {
  const cols = db.prepare(`PRAGMA table_info(users)`).all();
  const names = new Set(cols.map((c) => c.name));
  if (!names.has("job")) {
    db.exec(`ALTER TABLE users ADD COLUMN job TEXT`);
  }
  if (!names.has("bio")) {
    db.exec(`ALTER TABLE users ADD COLUMN bio TEXT`);
  }
} catch (e) {
  // swallow migration errors to avoid startup failure; log in non-production
  if (process.env.NODE_ENV !== "production") {
    console.error("Migration error (users add columns job/bio):", e.message);
  }
}

function now() {
  return new Date().toISOString();
}

module.exports = { db, now };
