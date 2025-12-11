const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { allowedMimes, maxFileSizeBytes, buildDestination } = require("../config/storage");

function makeUploader() {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const userId = req.params.userId;
      const dest = buildDestination(userId);
      fs.mkdirSync(dest, { recursive: true });
      cb(null, dest);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const name = `${Date.now()}-${crypto.randomUUID()}${ext}`;
      cb(null, name);
    },
  });

  const fileFilter = (_req, file, cb) => {
    if (allowedMimes.includes(file.mimetype)) cb(null, true);
    else cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname));
  };

  return multer({ storage, fileFilter, limits: { fileSize: maxFileSizeBytes } });
}

module.exports = { makeUploader };

