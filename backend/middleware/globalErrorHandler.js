const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { ApiResponse } = require("../model/response/apiResponse");

function globalErrorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    if (err.isOperational) {
      return res.status(err.statusCode).json(
        ApiResponse.error({
          message: err.message,
          statusCode: err.statusCode,
        })
      );
    }

    return res.status(err.statusCode).json(
      ApiResponse.error({
        message: "Something went wrong",
        statusCode: err.statusCode,
      })
    );
  } else {
    // handle mongo db operational errors!

    switch (err.code) {
      case 11000: // Duplicate key
        return res.status(HttpStatusCode.CONFLICT).json(
          ApiResponse.error({
            message: "Duplicate key error: field value already exists",
            statusCode: HttpStatusCode.CONFLICT,
          })
        );

      case 121: // Document validation failure
        return res.status(HttpStatusCode.BAD_REQUEST).json(
          ApiResponse.error({
            message: "Document validation failed",
            statusCode: HttpStatusCode.BAD_REQUEST,
          })
        );

      case 26: // Namespace not found (collection missing)
        return res.status(HttpStatusCode.NOT_FOUND).json(
          ApiResponse.error({
            message: "Collection not found",
            statusCode: HttpStatusCode.NOT_FOUND,
          })
        );

      case 47: // No matching document
        return res.status(HttpStatusCode.NOT_FOUND).json(
          ApiResponse.error({
            message: "Document not found",
            statusCode: HttpStatusCode.NOT_FOUND,
          })
        );

      case 48: // Namespace exists (collection already exists)
        return res.status(HttpStatusCode.CONFLICT).json(
          ApiResponse.error({
            message: "Collection already exists",
            statusCode: HttpStatusCode.CONFLICT,
          })
        );

      case 13: // Unauthorized
        return res.status(HttpStatusCode.UNAUTHORIZED).json(
          ApiResponse.error({
            message: "Unauthorized: insufficient permissions",
            statusCode: HttpStatusCode.UNAUTHORIZED,
          })
        );

      case 18: // Authentication failed
        return res.status(HttpStatusCode.UNAUTHORIZED).json(
          ApiResponse.error({
            message: "Authentication failed: invalid credentials",
            statusCode: HttpStatusCode.UNAUTHORIZED,
          })
        );

      case 89: // Network timeout
        return res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json(
          ApiResponse.error({
            message: "Network timeout, please retry",
            statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
          })
        );

      case 6: // Host unreachable
      case 7: // Host not found
        return res.status(HttpStatusCode.SERVICE_UNAVAILABLE).json(
          ApiResponse.error({
            message: "Database host unreachable",
            statusCode: HttpStatusCode.SERVICE_UNAVAILABLE,
          })
        );

      case 64: // Write concern timeout
        return res.status(HttpStatusCode.GATEWAY_TIMEOUT).json(
          ApiResponse.error({
            message: "Database write timeout",
            statusCode: HttpStatusCode.GATEWAY_TIMEOUT,
          })
        );

      case 72: // Invalid options
      case 73: // Invalid namespace
        return res.status(HttpStatusCode.BAD_REQUEST).json(
          ApiResponse.error({
            message: "Invalid database options or namespace",
            statusCode: HttpStatusCode.BAD_REQUEST,
          })
        );

      default:
        break;
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(
      ApiResponse.error({
        message: "Internal Server Error",
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      })
    );
  }
}

module.exports = { globalErrorHandler };
