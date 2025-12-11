const express = require("express");
const { makeUploader } = require("../middlewares/upload");
const { uploadUserPhotos, handleMulterErrors } = require("../controllers/uploadController");

const router = express.Router();
const uploader = makeUploader();

router.post("/users/:userId/photos", uploader.array("photos", 10), uploadUserPhotos);
router.use(handleMulterErrors);

module.exports = router;

