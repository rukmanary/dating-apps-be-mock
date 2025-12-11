const express = require("express");
const router = express.Router();
const { authSession } = require("../middlewares/authSession");
const {
  uploadPhotosHandler,
  validateUpload,
} = require("../controllers/photosController");

router.post(
  "/users/:id/photos",
  authSession,
  validateUpload,
  uploadPhotosHandler
);

module.exports = router;
