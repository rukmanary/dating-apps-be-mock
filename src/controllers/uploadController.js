const path = require("path");
const { insertUserPhoto } = require("../repositories/photosRepository");

async function uploadUserPhotos(req, res, next) {
  try {
    const userId = req.params.userId;
    const files = req.files || [];
    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const saved = files.map((f) => {
      const relPath = path.join("/", f.destination, f.filename).replace(/\\/g, "/");
      const id = insertUserPhoto({
        userId,
        path: relPath,
        originalName: f.originalname,
        mimeType: f.mimetype,
        sizeBytes: f.size,
      });
      return {
        id,
        path: relPath,
        original_name: f.originalname,
        mime_type: f.mimetype,
        size_bytes: f.size,
      };
    });

    res.status(201).json({ uploaded: saved });
  } catch (err) {
    next(err);
  }
}

function handleMulterErrors(err, _req, res, _next) {
  if (err && err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ error: "File terlalu besar, maksimal 2MB" });
    }
    return res.status(415).json({ error: "Format file tidak didukung" });
  }
  return res.status(500).json({ error: "Upload gagal" });
}

module.exports = { uploadUserPhotos, handleMulterErrors };

