const { HttpStatusCode } = require("./status_codes");

class AppError extends Error {
  constructor({
    message,
    statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR, // 500 by default
    errors = null,
    isOperational = true,
  }) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    this.success = false;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { AppError };
