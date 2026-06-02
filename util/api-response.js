const { HttpStatusCode } = require("./http-status-codes");

class ApiResponse {
  constructor({ statusCode, data = null, message = null, errors = null }) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.errors = errors;
  }

  static ok({ data = null, message = "OK" } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.OK,
      data,
      message,
    });
  }

  static created({ data = null, message = "Created" } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.CREATED,
      data,
      message,
    });
  }

  static accepted({ data = null, message = "Accepted" } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.ACCEPTED,
      data,
      message,
    });
  }

  static noContent({ message = "No Content" } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.NO_CONTENT,
      data: null,
      message,
    });
  }

  static badRequest({ message = "Bad Request", data = null } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.BAD_REQUEST,
      data,
      message,
    });
  }

  static unauthorized({ message = "Unauthorized", data = null } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.UNAUTHORIZED,
      data,
      message,
    });
  }

  static forbidden({ message = "Forbidden", data = null } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.FORBIDDEN,
      data,
      message,
    });
  }

  static notFound({ message = "Not Found", data = null } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.NOT_FOUND,
      data,
      message,
    });
  }

  static conflict({ message = "Conflict", data = null } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.CONFLICT,
      data,
      message,
    });
  }

  static validationError({
    message = "Validation Error",
    data = null,
    errors = null,
  } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
      data,
      message,
      errors,
    });
  }

  static tooManyRequests({ message = "Too Many Requests", data = null } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.TOO_MANY_REQUESTS,
      data,
      message,
    });
  }

  static internalServerError({
    message = "Internal Server Error",
    data = null,
  } = {}) {
    return new ApiResponse({
      statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      data,
      message,
    });
  }

  static create({
    statusCode,
    message = null,
    data = null,
    errors = null,
  } = {}) {
    return new ApiResponse({
      statusCode,
      data,
      message,
      errors,
    });
  }
}

module.exports = { ApiResponse };
