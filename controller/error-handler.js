const { ApiResponse } = require("../util/api-response");
const { AppError } = require("../util/app-error");
const { HttpStatusCode } = require("../util/http-status-codes");

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;

  console.log(err);

  if (err instanceof AppError && err.isOperational) {
    return res.status(statusCode).json(
      ApiResponse.create({
        statusCode,
        message: err.message,
        errors: err.errors || null,
        data: null,
      }),
    );
  }

  if (err.name === "CastError") {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return res.status(HttpStatusCode.BAD_REQUEST).json(
      ApiResponse.create({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: message,
        errors: null,
        data: null,
      }),
    );
  }

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data`;
    return res.status(HttpStatusCode.BAD_REQUEST).json(
      ApiResponse.create({
        statusCode: HttpStatusCode.BAD_REQUEST,
        message: message,
        errors: errors,
        data: null,
      }),
    );
  }

  // hanlde mongo db errors
  if (err.name === "MongoServerError") {
    switch (err.code) {
      case 11000: {
        const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
        const message = `field value:${value} aleady exist. please use another`;

        return res.status(HttpStatusCode.BAD_REQUEST).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: message,
            errors: err.errors || null,
            data: null,
          }),
        );
      }
      case 121: {
        return res.status(HttpStatusCode.BAD_REQUEST).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: "Document validation failed",
            errors: err.errInfo || null,
            data: null,
          }),
        );
      }

      case 50:
      case 262: {
        return res.status(HttpStatusCode.REQUEST_TIMEOUT).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.REQUEST_TIMEOUT,
            message: "Database operation timed out",
            errors: null,
            data: null,
          }),
        );
      }

      case 112: {
        return res.status(HttpStatusCode.CONFLICT).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.CONFLICT,
            message: "Write conflict occurred. Please try again.",
            errors: null,
            data: null,
          }),
        );
      }

      case 116:
      case 10334: {
        return res.status(HttpStatusCode.BAD_REQUEST).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: "Document is too large",
            errors: null,
            data: null,
          }),
        );
      }

      case 146:
      case 292: {
        return res.status(HttpStatusCode.BAD_REQUEST).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.BAD_REQUEST,
            message: "Query used too much memory",
            errors: null,
            data: null,
          }),
        );
      }

      case 365: {
        return res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
            message: "Database is temporarily unavailable",
            errors: null,
            data: null,
          }),
        );
      }

      case 384:
      case 6:
      case 7:
      case 89:
      case 9001: {
        return res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
            message: "Database connection error",
            errors: null,
            data: null,
          }),
        );
      }

      case 402: {
        return res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
            message: "Database resource exhausted",
            errors: null,
            data: null,
          }),
        );
      }

      case 449: {
        return res.status(HttpStatusCode.TOO_MANY_REQUESTS).json(
          ApiResponse.create({
            statusCode: HttpStatusCode.TOO_MANY_REQUESTS,
            message: "Too many database requests",
            errors: null,
            data: null,
          }),
        );
      }
    }
  }

  return res.status(statusCode).json(
    ApiResponse.create({
      statusCode,
      message: "Unexpected error occurred",
      errors: null,
      data: null,
    }),
  );
};
