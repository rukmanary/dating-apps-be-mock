const express = require("express");
const router = express.Router();
const {
  firebaseLogin,
  validateFirebaseLogin,
  sessionLogin,
  validateSessionLogin,
} = require("../controllers/authController");

router.post("/firebase", validateFirebaseLogin, firebaseLogin);
router.post("/session", validateSessionLogin, sessionLogin);

module.exports = router;
