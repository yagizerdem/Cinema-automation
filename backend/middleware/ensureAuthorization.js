const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");

/**
 * @param  {String[]} requiredRoles  Space Delimited sequence of names.
 */

function ensureAuthorization(requiredRoles) {
  return function (req, res, next) {
    const user = req.user;

    if (!user) {
      return next(
        new AppError({
          message: "Unauthorized",
          isOperational: true,
          statusCode: HttpStatusCode.UNAUTHORIZED,
        })
      );
    }

    if (!requiredRoles.includes(user.userRole)) {
      return next(
        new AppError({
          message: "Forbidden: insufficient permissions",
          isOperational: true,
          statusCode: HttpStatusCode.FORBIDDEN,
        })
      );
    }

    next();
  };
}

module.exports = { ensureAuthorization };
