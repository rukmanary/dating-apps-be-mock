const express = require("express");
const { getProfiles, validatePagination } = require("../controllers/profilesController");
const router = express.Router();

router.get("/", validatePagination, getProfiles);

module.exports = router;
