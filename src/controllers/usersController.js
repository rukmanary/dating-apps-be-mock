const { param, body, validationResult } = require("express-validator");
const {
  getUserById,
  updateUserPartial,
} = require("../repositories/usersRepository");
const { serializeUser } = require("./authController");

const validateUserId = [param("id").isInt({ min: 1 })];

function getUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const id = Number(req.params.id);
  const user = getUserById(id);
  if (!user) return res.status(404).json({ success: false, error: "User not found" });
  return res.json({ success: true, user: serializeUser(user) });
}

const validateUserPatch = [
  param("id").isInt({ min: 1 }),
  body("name").optional().isString(),
  body("email").optional().isEmail(),
  body("phone_number").optional().isString(),
  body("is_verified").optional().isBoolean(),
  body("date_of_birth").optional().isISO8601(),
  body("age").optional().isInt({ min: 0, max: 120 }),
  body("gender").optional().isString(),
  body("favorite_spot").optional().isString(),
  body("interest").optional().isArray(),
  body("distance_preference").optional().isInt({ min: 0, max: 500 }),
  body("photos").optional().isArray(),
];

function patchUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const id = Number(req.params.id);
  const existing = getUserById(id);
  if (!existing) return res.status(404).json({ success: false, error: "User not found" });
  const payload = { ...req.body };
  if (typeof payload.is_verified === "boolean")
    payload.is_verified = payload.is_verified ? 1 : 0;
  if (Array.isArray(payload.interest))
    payload.interest = JSON.stringify(payload.interest);
  if (Array.isArray(payload.photos))
    payload.photos = JSON.stringify(payload.photos);
  const updated = updateUserPartial(id, payload);
  return res.json({ success: true, user: serializeUser(updated) });
}

module.exports = { getUser, patchUser, validateUserId, validateUserPatch };
