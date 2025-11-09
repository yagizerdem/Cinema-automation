const express = require("express");
const router = express.Router();
const { register } = require("../controller/authController");
const { ensureNotEmptyBody } = require("../middleware/ensureNotEmptyBody");
const { asyncWrapper } = require("../utils/asyncWrapper");

router.post("/register", ensureNotEmptyBody, asyncWrapper(register));

module.exports = { router };
