const { getTokenByIdToken } = require('../repositories/tokensRepository');

async function authSession(req, res, next) {
  try {
    const header = req.headers['authorization'] || '';
    const parts = header.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const tokenStr = parts[1];
    const tokenRow = getTokenByIdToken(tokenStr);
    if (!tokenRow) return res.status(401).json({ error: 'Unauthorized' });
    const { db } = require('../db');
    const user = db.prepare('SELECT * FROM users WHERE token_id = ?').get(tokenRow.id);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    req.user = user;
    return next();
  } catch (_e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = { authSession };

