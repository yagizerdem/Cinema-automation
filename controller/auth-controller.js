const { User } = require("../model/user");
const userService = require("../service/user-service");
const { ApiResponse } = require("../util/api-response");
const { AppError } = require("../util/app-error");
const { HttpStatusCode } = require("../util/http-status-codes");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;
  const userFromDb = await User.findOne({ email });

  if (!userFromDb) {
    throw new AppError({
      message: "Invalid email or password",
      statusCode: HttpStatusCode.UNAUTHORIZED,
      isOperational: true,
    });
  }

  const isMatch = await bcrypt.compare(password, userFromDb.password);

  if (!isMatch) {
    throw new AppError({
      message: "Invalid email or password",
      statusCode: HttpStatusCode.UNAUTHORIZED,
      isOperational: true,
    });
  }

  // generate token here and send it in response

  var privateKey = process.env.JWT_SECRET;
  var payload = {
    email: userFromDb.email,
    id: userFromDb._id,
    firstName: userFromDb.firstName,
    lastName: userFromDb.lastName,
  };
  const token = jwt.sign(payload, privateKey, { algorithm: "HS256" });

  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 60, // Expires in 60 days
    httpOnly: true, // Prevents client-side JavaScript access (XSS protection)
    secure: true, // Ensures cookie is only sent over HTTPS
    sameSite: "lax", // Protects against CSRF attacks
  });

  return res
    .status(HttpStatusCode.OK)
    .json(ApiResponse.ok("User logged in successfully"));
}

async function register(req, res) {
  const body = req.body;
  await userService.registerUser(body);

  return res
    .status(HttpStatusCode.CREATED)
    .json(ApiResponse.created("User registered successfully"));
}

async function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return res
    .status(HttpStatusCode.OK)
    .json(ApiResponse.ok("User logged out successfully"));
}

async function me(req, res) {
  const user = req.user; // Passport sets the authenticated user on req.user
  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "User details fetched successfully",
      data: user,
    }),
  );
}

async function googleOAuthCallback(req, res) {
  const user = req.user; // Passport sets the authenticated user on req.user

  var privateKey = process.env.JWT_SECRET;
  var payload = {
    email: user.email,
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  const token = jwt.sign(payload, privateKey, { algorithm: "HS256" });

  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 60, // Expires in 60 days
    httpOnly: true, // Prevents client-side JavaScript access (XSS protection)
    secure: true, // Ensures cookie is only sent over HTTPS
    sameSite: "lax", // Protects against CSRF attacks
  });

  return res
    .status(HttpStatusCode.OK)
    .json(ApiResponse.ok("User logged in successfully"));
}

module.exports = {
  login,
  register,
  logout,
  me,
  googleOAuthCallback,
};
