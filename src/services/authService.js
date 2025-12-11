const { verifyIdToken } = require("../config/firebase");
const { createToken } = require("../repositories/tokensRepository");
const crypto = require("crypto");
const {
  getUserByEmail,
  createUser,
  updateUserPartial,
} = require("../repositories/usersRepository");

async function loginWithFirebase({
  accessToken,
  idToken,
  name,
  email,
  provider,
}) {
  const decoded = await verifyIdToken(idToken);
  const tokenId = createToken({
    access_token: accessToken,
    id_token: idToken,
    provider,
  });
  let user = email ? getUserByEmail(email) : null;
  if (!user) {
    const userId = createUser({ name, email, token_id: tokenId });
    user = updateUserPartial(userId, { is_verified: 1 });
  } else if (!user.token_id) {
    user = updateUserPartial(user.id, {
      token_id: tokenId,
      name: name || user.name,
      email: user.email,
    });
  }
  return { user, decoded, token_id: tokenId };
}

module.exports = { loginWithFirebase };

async function issueSession({ name, email }) {
  const raw = crypto.randomBytes(32).toString("hex");
  const tokenId = createToken({ access_token: null, id_token: raw, provider: "session" });
  let user = email ? getUserByEmail(email) : null;
  if (!user) {
    const userId = createUser({ name, email, token_id: tokenId });
    user = updateUserPartial(userId, { is_verified: 1 });
  } else {
    user = updateUserPartial(user.id, { token_id: tokenId, name: name || user.name });
  }
  return { user, token_id: tokenId, token: raw };
}

module.exports.issueSession = issueSession;
