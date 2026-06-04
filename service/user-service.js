const { User } = require("../model/user");
const { HttpStatusCode } = require("../util/http-status-codes");

async function registerUser(userData) {
  const user = new User({
    ...userData,
  });

  await user.save();
  return user;
}

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

async function getUserById(id) {
  return await User.findById(id);
}

async function ensureUserExistById(userId) {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError({
      message: "User not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return user;
}

async function ensureUserExistByEmail(email) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError({
      message: "User not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return user;
}

async function ensureUserNotExistByEmail(email) {
  const user = await User.findOne({ email });
  if (user) {
    throw new AppError({
      message: "User already exists with this email",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }
}

module.exports = {
  registerUser,
  getUserByEmail,
  getUserById,
  ensureUserExistById,
  ensureUserExistByEmail,
};
