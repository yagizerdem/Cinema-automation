const { HttpStatusCode } = require("../enum/http-status-codes");
const AppError = require("../error/AppError");

function ensureNotEmptyBody(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(
      new AppError({
        message: "Request body cannot be empty",
        statusCode: HttpStatusCode.BAD_REQUEST,
        isOperational: true,
      })
    );
  }
  next();
}

module.exports = { ensureNotEmptyBody };
