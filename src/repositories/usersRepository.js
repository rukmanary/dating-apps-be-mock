const { db, now } = require("../db");

function getUserByEmail(email) {
  return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);
}

function getUserById(id) {
  return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id);
}

function createUser({ name, email, token_id }) {
  const stmt = db.prepare(
    `INSERT INTO users (name, email, token_id, created_at, updated_at)
     VALUES (@name, @email, @token_id, @created_at, @updated_at)`
  );
  const info = stmt.run({
    name: name || null,
    email,
    token_id: token_id || null,
    created_at: now(),
    updated_at: now(),
  });
  return info.lastInsertRowid;
}

function updateUserPartial(id, fields) {
  const allowed = [
    "name",
    "email",
    "phone_number",
    "is_verified",
    "date_of_birth",
    "age",
    "gender",
    "favorite_spot",
    "interest",
    "distance_preference",
    "photos",
    "token_id",
    "job",
    "bio",
  ];
  const data = Object.keys(fields)
    .filter((k) => allowed.includes(k))
    .reduce((acc, k) => {
      acc[k] = fields[k];
      return acc;
    }, {});
  if (Object.keys(data).length === 0) return getUserById(id);
  const sets = Object.keys(data)
    .map((k) => `${k} = @${k}`)
    .join(", ");
  const stmt = db.prepare(
    `UPDATE users SET ${sets}, updated_at = @updated_at WHERE id = @id`
  );
  stmt.run({ ...data, updated_at: now(), id });
  return getUserById(id);
}

module.exports = { getUserByEmail, getUserById, createUser, updateUserPartial };
