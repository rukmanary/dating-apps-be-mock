const path = require("path");

const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
const maxFileSizeBytes = 2 * 1024 * 1024;

function buildDestination(userId) {
  const now = new Date();
  const yyyy = String(now.getFullYear());
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return path.join("uploads", "users", String(userId), yyyy, mm, dd);
}

module.exports = { allowedMimes, maxFileSizeBytes, buildDestination };

