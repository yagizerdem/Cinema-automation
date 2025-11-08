class ApiResponse {
  constructor({ success, message, data = null, statusCode = 200 }) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
  }

  static success({ message, data = null, statusCode = 200 }) {
    return new ApiResponse({ success: true, message, data, statusCode });
  }

  static error({ message, statusCode = 500, data = null }) {
    return new ApiResponse({ success: false, message, data, statusCode });
  }

  toJSON() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
      statusCode: this.statusCode,
    };
  }
}

module.exports = { ApiResponse };
