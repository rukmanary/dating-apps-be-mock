const express = require("express");
const router = express.Router();
const { authSession } = require("../middlewares/authSession");
const {
  getUser,
  patchUser,
  validateUserId,
  validateUserPatch,
} = require("../controllers/usersController");

router.get("/:id", authSession, validateUserId, getUser);
router.patch("/:id", authSession, validateUserPatch, patchUser);

module.exports = router;
