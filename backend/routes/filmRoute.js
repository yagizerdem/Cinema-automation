const express = require("express");
const router = express.Router();
const {
  addFilm,
  getFilm,
  removeFilmSoft,
  removeFilmHard,
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
  ensureAuthorization([
    userRoles.ADMIN,
    userRoles.BOX_OFFICE_CLERK,
    userRoles.BOX_OFFICE_SUPERVISOR,
  ]),
  asyncWrapper(addFilm)
);
router.get(
  "/getFilm",
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([
    userRoles.ADMIN,
    userRoles.BOX_OFFICE_SUPERVISOR,
    userRoles.BOX_OFFICE_CLERK,
  ]),
  asyncWrapper(getFilm)
);
router.post(
  "/removeFilmSoft/:filmId",
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([
    userRoles.ADMIN,
    userRoles.BOX_OFFICE_CLERK,
    userRoles.BOX_OFFICE_SUPERVISOR,
  ]),
  asyncWrapper(removeFilmSoft)
);

router.post(
  "/removeFilmHard/:filmId",
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([userRoles.ADMIN, userRoles.BOX_OFFICE_SUPERVISOR]),
  asyncWrapper(removeFilmHard)
);

module.exports = { router };
