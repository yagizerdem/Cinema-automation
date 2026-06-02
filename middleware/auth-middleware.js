const {
  getRegisterValidator,
  getLoginValidator,
} = require("../validator/auth-validator");
const { AppError } = require("../util/app-error");
const { HttpStatusCode } = require("../util/http-status-codes");

function allowedRoles() {
  const allowedRoles = Array.from(arguments);
  return (req, res, next) => {
    const user = req.user;
    const userRole = user.role;

    if (!allowedRoles.includes(userRole)) {
      return next(
        new AppError({
          message: "You do not have permission to perform this action",
          statusCode: HttpStatusCode.FORBIDDEN,
          isOperational: true,
        }),
      );
    }
    next();
  };
}

module.exports = {
  allowedRoles,
};
