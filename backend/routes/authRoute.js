const express = require("express");
const router = express.Router();
const { register } = require("../controller/authController");
const { ensureNotEmptyBody } = require("../middleware/ensureNotEmptyBody");

router.post("/register", ensureNotEmptyBody, register);

module.exports = { router };
