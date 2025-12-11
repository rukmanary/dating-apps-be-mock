const { body, validationResult } = require("express-validator");
const { loginWithFirebase, issueSession } = require("../services/authService");

const validateFirebaseLogin = [
  body("idToken")
    .isString()
    .notEmpty()
    .custom((t) => {
      if (typeof t !== "string") return false;
      const s = t.trim();
      const parts = s.split(".");
      return s.length > 0 && parts.length === 3;
    })
    .withMessage("idToken must be a JWT string with 3 segments"),
  body("accessToken").optional().isString(),
  body("name").optional().isString(),
  body("email").optional().isEmail(),
  body("provider").optional().isString(),
];

async function firebaseLogin(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { accessToken, idToken, name, email, provider } = req.body;
    const idTokenStr = String(idToken).trim();
    const result = await loginWithFirebase({
      accessToken,
      idToken: idTokenStr,
      name,
      email,
      provider,
    });
    res.status(200).json({
      success: true,
      user: serializeUser(result.user),
      token_id: result.token_id,
    });
  } catch (err) {
    let status = 401;
    let message = "Invalid Firebase token";
    const code = err && err.code ? String(err.code) : undefined;
    if (code === "auth/argument-error") status = 400;
    if (code === "auth/invalid-id-token") status = 400;
    if (code === "auth/id-token-expired") {
      status = 401;
      message = "Token expired";
    }
    const body = { success: false, error: message };
    if (process.env.NODE_ENV !== "production" && code) body.code = code;
    res.status(status).json(body);
  }
}

function serializeUser(u) {
  if (!u) return null;
  return {
    id: u.id,
    name: u.name || null,
    email: u.email || null,
    phone_number: u.phone_number || null,
    is_verified: !!u.is_verified,
    date_of_birth: u.date_of_birth || null,
    age: u.age || null,
    gender: u.gender || null,
    favorite_spot: u.favorite_spot || null,
    job: u.job || null,
    bio: u.bio || null,
    interest: u.interest ? JSON.parse(u.interest) : [],
    distance_preference: u.distance_preference || null,
    photos: u.photos ? JSON.parse(u.photos) : [],
    token_id: u.token_id || null,
  };
}

module.exports = { firebaseLogin, validateFirebaseLogin, serializeUser };

const validateSessionLogin = [
  body("email").isEmail(),
  body("name").isString().notEmpty(),
];

async function sessionLogin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { name, email } = req.body;
  const result = await issueSession({ name, email });
  return res.status(200).json({
    success: true,
    token_id: result.token_id,
    token: result.token,
    user_id: result.user.id,
  });
}

module.exports.validateSessionLogin = validateSessionLogin;
module.exports.sessionLogin = sessionLogin;
