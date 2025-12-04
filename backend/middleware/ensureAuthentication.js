const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const jwt = require("jsonwebtoken");
const { User } = require("../model/entity/User");
const { getActiveUserById } = require("../service/userService");

async function ensureAuthentication(req, res, next) {
  const cookies = req.cookies;
  const token = cookies ? cookies["jwt"] : null;

  if (!token) {
    return next(
      new AppError({
        message: "Authentication token is missing",
        statusCode: HttpStatusCode.UNAUTHORIZED,
        isOperational: true,
      })
    );
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return next(
        new AppError({
          message: "Invalid or expired token",
          statusCode: HttpStatusCode.UNAUTHORIZED,
          isOperational: true,
        })
      );
    }
    const userId = decoded.id;
    try {
      const userFromDb = await getActiveUserById({ userId });
      req.user = userFromDb;

      next();
    } catch (err) {
      next(err);
    }
  });
}

module.exports = { ensureAuthentication };
