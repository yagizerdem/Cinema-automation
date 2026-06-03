const { AppError } = require("../util/app-error");
const { HttpStatusCode } = require("../util/http-status-codes");

function validateReqBody(schema) {
  return async (req, res, next) => {
    try {
      const validatedBody = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: false,
      });
      req.body = validatedBody;
      next();
    } catch (error) {
      const formattedErrors = {};
      error.details.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      next(
        new AppError({
          message: "Validation failed",
          statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
          errors: formattedErrors,
          isOperational: true,
        }),
      );
    }
  };
}

module.exports = { validateReqBody };
