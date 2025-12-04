const {
  EnsureEmailExist,
  EnsureUserIsActive,
} = require("../business/userRelatedLogic");
const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { ApiResponse } = require("../model/response/apiResponse");
const { insertClient } = require("../service/userService");
const bcrypt = require("bcrypt");
const {
  registerSchema,
  emailVerificationSchema,
  loginVerificationSchema,
} = require("../validator/authControllerValidator");
const { signJwt } = require("../utils/jwtUtil");

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

async function login(req, res) {
  const { error, value } = loginVerificationSchema.validate(req.body);
  const userFromDb = await EnsureEmailExist(value.email);
  await EnsureUserIsActive(userFromDb);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new AppError({
      message: `Validation error: ${message}`,
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  // check user password matcfhes

  const result = await bcrypt.compare(value.password, userFromDb.passwordHash);
  if (!result) {
    throw new AppError({
      message: `Validation error: Invalid password`,
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  userFromDb.passwordHash = undefined; // remove password hash before signing jwt
  const jwt = signJwt({ ...userFromDb });

  res.cookie("jwt", jwt, { maxAge: 60 * 60 * 24 * 90, httpOnly: true });

  const payload = ApiResponse.success({
    message: "User logged in successfully",
    data: jwt,
    statusCode: HttpStatusCode.OK,
  });

  return res.status(HttpStatusCode.OK).json(payload);
}

// wirte sendEmailVerification function here TODO

async function sendEmailVerification(req, res) {
  const { error, value } = emailVerificationSchema.validate(req.body);
  await EnsureEmailExist(value.email);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new AppError({
      message: `Validation error: ${message}`,
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.success({
      message: "Email verification sent successfully",
      data: null,
      statusCode: HttpStatusCode.OK,
    })
  );
}

module.exports = { register, sendEmailVerification, login };
