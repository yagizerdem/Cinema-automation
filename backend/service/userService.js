const { User } = require("../model/entity/User");
const { hashPassword } = require("../utils/hashPassword");
const { EnsureEmailNotExist } = require("../business/userRelatedLogic");
const { userRoles } = require("../enum/userRoles");
const { AppError } = require("../error/AppError");
const { HttpStatusCode } = require("../enum/http-status-codes");

async function insertClient({ firstName, lastName, email, password }) {
  await EnsureEmailNotExist(email);

  const user = new User({
    firstName,
    lastName,
    email,
    isActive: true,
    emailVerified: false,
    userRole: userRoles.CLIENT,
  });

  const hashedPassword = await hashPassword(password);
  user.passwordHash = hashedPassword;

  await User.insertOne(user);
}

async function getActiveUserById({ userId }) {
  const userFromDb = await User.findOne({
    _id: userId,
    isActive: true,
  });

  if (!userFromDb) {
    throw new AppError({
      message: "User not found or inactive",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return userFromDb;
}

async function getActiveUserByEmail({ email }) {
  const userFromDb = await User.findOne({
    email,
    isActive: true,
  });

  if (!userFromDb) {
    throw new AppError({
      message: "User not found or inactive",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return userFromDb;
}

module.exports = { insertClient, getActiveUserById, getActiveUserByEmail };
