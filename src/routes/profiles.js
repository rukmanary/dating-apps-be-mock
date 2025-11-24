const express = require("express");
const { getProfiles } = require("../controllers/profilesController");
const router = express.Router();

router.get("/", getProfiles);

module.exports = router;
