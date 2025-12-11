const { verifyIdToken } = require('../config/firebase');

async function authFirebase(req, res, next) {
  try {
    const header = req.headers['authorization'] || '';
    const parts = header.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      const token = parts[1];
      const decoded = await verifyIdToken(token);
      req.firebase = decoded;
      return next();
    }
    return res.status(401).json({ error: 'Unauthorized' });
  } catch (_e) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = { authFirebase };

