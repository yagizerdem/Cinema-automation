const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { User } = require("../model/entity/User");

async function EnsureEmailNotExist(email) {
  const exsitingUser = await User.findOne({ email: email });
  if (exsitingUser) {
    throw new AppError({
      message: "Email already in use",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }
}

async function EnsureEmailExist(email) {
  const exsitingUser = await User.findOne({ email: email });
  if (!exsitingUser) {
    throw new AppError({
      message: "Email not found",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  return exsitingUser;
}

async function EnsureUserIsActive(user) {
  if (!user.isActive) {
    throw new AppError({
      message: "User is not active",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }
}

module.exports = {
  EnsureEmailNotExist,
  EnsureEmailExist,
  EnsureUserIsActive,
};
