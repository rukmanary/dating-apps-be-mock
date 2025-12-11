const path = require("path");
const fs = require("fs");
const multer = require("multer");
const crypto = require("crypto");
const { param, validationResult } = require("express-validator");
const {
  getUserById,
  updateUserPartial,
} = require("../repositories/usersRepository");
const { serializeUser } = require("./authController");

const allowedMime = new Set(["image/jpeg", "image/png", "image/jpg"]);

function storageForUser(userId) {
  const dir = path.join(
    process.cwd(),
    "uploads",
    "users",
    String(userId),
    "photos"
  );
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function makeMulter(userId) {
  const uploadDir = storageForUser(userId);
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname) || ".jpg";
      const name = crypto.randomUUID() + ext.toLowerCase();
      cb(null, name);
    },
  });
  return multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      if (!allowedMime.has(file.mimetype))
        return cb(new Error("Unsupported file type"));
      cb(null, true);
    },
  });
}

const validateUpload = [param("id").isInt({ min: 1 })];

function uploadPhotosHandler(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const userId = Number(req.params.id);
  const user = getUserById(userId);
  if (!user) return res.status(404).json({ success: false, error: "User not found" });

  const upload = makeMulter(userId).array("photos", 10);
  upload(req, res, (err) => {
    if (err) {
      const msg = err.message || "Upload failed";
      const status = msg.includes("file too large") ? 413 : 400;
      return res.status(status).json({ success: false, error: msg });
    }
    const files = req.files || [];
    const baseUrl = `/uploads/users/${userId}/photos/`;
    const paths = files.map((f) => baseUrl + f.filename);
    const current = user.photos ? JSON.parse(user.photos) : [];
    const updated = current.concat(paths);
    updateUserPartial(userId, { photos: JSON.stringify(updated) });
    return res.status(201).json({ success: true });
  });
}

module.exports = { uploadPhotosHandler, validateUpload };
