const { db } = require("../db");

function insertUserPhoto({ userId, path, originalName, mimeType, sizeBytes }) {
  const stmt = db.prepare(
    "INSERT INTO user_photos (user_id, path, original_name, mime_type, size_bytes, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))"
  );
  const info = stmt.run(userId, path, originalName, mimeType, sizeBytes);
  return info.lastInsertRowid;
}

module.exports = { insertUserPhoto };

