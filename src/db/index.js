const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "../../data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dbPath = path.join(dataDir, "database.sqlite");

const db = new Database(dbPath);

db.exec(
  "CREATE TABLE IF NOT EXISTS user_photos (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT NOT NULL, path TEXT NOT NULL, original_name TEXT NOT NULL, mime_type TEXT NOT NULL, size_bytes INTEGER NOT NULL, created_at TEXT NOT NULL)"
);

module.exports = { db };
