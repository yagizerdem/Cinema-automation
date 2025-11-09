const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { ApiResponse } = require("../model/response/apiResponse");
const { insertClient } = require("../service/userService");
const { registerSchema } = require("../validator/authControllerValidator");
async function register(req, res) {
  const { error, value } = registerSchema.validate(req.body);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new AppError({
      message: `Validation error: ${message}`,
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  await insertClient(value);

  const payload = ApiResponse.success({
    message: "User registered successfully",
    data: null,
    statusCode: HttpStatusCode.CREATED,
  });

  return res.status(HttpStatusCode.CREATED).json(payload);
}

module.exports = { register };
