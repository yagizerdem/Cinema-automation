const express = require("express");
const router = express.Router();
const { ensureNotEmptyBody } = require("../middleware/ensureNotEmptyBody");
const { asyncWrapper } = require("../utils/asyncWrapper");
const { ensureAuthorization } = require("../middleware/ensureAuthorization");
const { userRoles } = require("../enum/userRoles");
const { ensureAuthentication } = require("../middleware/ensureAuthentication");

const { addSession } = require("../controller/sessionController");

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

module.exports = { router };
