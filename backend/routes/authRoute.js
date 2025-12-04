const express = require("express");
const router = express.Router();
const {
  register,
  sendEmailVerification,
  login,
} = require("../controller/authController");
const { ensureNotEmptyBody } = require("../middleware/ensureNotEmptyBody");
const { asyncWrapper } = require("../utils/asyncWrapper");

router.post("/register", ensureNotEmptyBody, asyncWrapper(register));
router.post(
  "/send-email-verification",
  ensureNotEmptyBody,
  asyncWrapper(sendEmailVerification)
);

router.post("/login", ensureNotEmptyBody, asyncWrapper(login));

module.exports = { router };
