const { db, now } = require("../db");

function createToken({ access_token, id_token, provider }) {
  const stmt = db.prepare(
    `INSERT INTO tokens (access_token, id_token, provider, created_at)
     VALUES (@access_token, @id_token, @provider, @created_at)`
  );
  const info = stmt.run({
    access_token: access_token || null,
    id_token,
    provider: provider || null,
    created_at: now(),
  });
  return info.lastInsertRowid;
}

function getTokenById(id) {
  return db.prepare(`SELECT * FROM tokens WHERE id = ?`).get(id);
}

module.exports = { createToken, getTokenById };

function getTokenByIdToken(idToken) {
  return db.prepare(`SELECT * FROM tokens WHERE id_token = ?`).get(idToken);
}

module.exports.getTokenByIdToken = getTokenByIdToken;
