const passport = require("passport");
const express = require("express");
const router = express.Router();
const {
  addFilm,
  getFilm,
  removeFilm,
} = require("../controller/filmController");
const { ensureNotEmptyBody } = require("../middleware/ensureNotEmptyBody");
const { asyncWrapper } = require("../utils/asyncWrapper");
const { ensureAuthorization } = require("../middleware/ensureAuthorization");
const { userRoles } = require("../enum/userRoles");

router.post(
  "/addFilm",
  ensureNotEmptyBody,
  passport.authenticate("jwt", { session: false }),
  ensureAuthorization([userRoles.CLIENT]),
  asyncWrapper(addFilm)
);
router.get("/getFilm", ensureNotEmptyBody, asyncWrapper(getFilm));
router.post("/removeFilm", ensureNotEmptyBody, asyncWrapper(removeFilm));

module.exports = { router };
