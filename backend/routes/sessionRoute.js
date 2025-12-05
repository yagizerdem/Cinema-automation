const express = require("express");
const router = express.Router();
const { ensureNotEmptyBody } = require("../middleware/ensureNotEmptyBody");
const { asyncWrapper } = require("../utils/asyncWrapper");
const { ensureAuthorization } = require("../middleware/ensureAuthorization");
const { userRoles } = require("../enum/userRoles");
const { ensureAuthentication } = require("../middleware/ensureAuthentication");

const {
  addSession,
  getSessions,
  removeSessionSoft,
  removeSessionHard,
} = require("../controller/sessionController");

router.post(
  "/addSession",
  ensureNotEmptyBody,
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([
    userRoles.ADMIN,
    userRoles.BOX_OFFICE_CLERK,
    userRoles.BOX_OFFICE_SUPERVISOR,
  ]),
  asyncWrapper(addSession)
);

router.get(
  "/getSessions",
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([
    userRoles.ADMIN,
    userRoles.BOX_OFFICE_CLERK,
    userRoles.BOX_OFFICE_SUPERVISOR,
    userRoles.CLIENT,
  ]),
  asyncWrapper(getSessions)
);

router.post(
  "/removeSessionSoft/:sessionId",
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([
    userRoles.ADMIN,
    userRoles.BOX_OFFICE_CLERK,
    userRoles.BOX_OFFICE_SUPERVISOR,
    userRoles.CLIENT,
  ]),
  asyncWrapper(removeSessionSoft)
);

router.post(
  "/removeSessionHard/:sessionId",
  asyncWrapper(ensureAuthentication),
  ensureAuthorization([
    userRoles.ADMIN,
    userRoles.BOX_OFFICE_CLERK,
    userRoles.BOX_OFFICE_SUPERVISOR,
    userRoles.CLIENT,
  ]),
  asyncWrapper(removeSessionHard)
);

module.exports = { router };
