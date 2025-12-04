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
const { ensureAuthentication } = require("../middleware/ensureAuthentication");

router.post(
  "/addFilm",
  ensureNotEmptyBody,
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([userRoles.ADMIN, userRoles.BOX_OFFICE_SUPERVISOR]),
  asyncWrapper(addFilm)
);
router.get(
  "/getFilm",
  ensureNotEmptyBody,
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([
    userRoles.ADMIN,
    userRoles.BOX_OFFICE_SUPERVISOR,
    userRoles.BOX_OFFICE_CLERK,
  ]),
  asyncWrapper(getFilm)
);
router.post(
  "/removeFilm",
  ensureNotEmptyBody,
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([userRoles.ADMIN, userRoles.BOX_OFFICE_SUPERVISOR]),
  asyncWrapper(removeFilm)
);

module.exports = { router };
