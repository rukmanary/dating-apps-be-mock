const admin = require("firebase-admin");

let initialized = false;

function initFirebase() {
  if (initialized) return admin;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (privateKey && privateKey.startsWith("-----BEGIN")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }
  if (projectId && clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
    initialized = true;
    return admin;
  }
  try {
    admin.initializeApp({ credential: admin.credential.applicationDefault() });
    initialized = true;
  } catch (_e) {}
  return admin;
}

async function verifyIdToken(idToken) {
  if (!initialized) initFirebase();
  const decoded = await admin.auth().verifyIdToken(idToken);
  return decoded;
}

module.exports = { initFirebase, verifyIdToken };
