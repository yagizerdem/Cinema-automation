const Joi = require("joi");

function getHallValidator() {
  const hallValidator = Joi.object({
    name: Joi.string().trim().min(1).max(100).required().messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 1 character",
      "string.max": "Name must be at most 100 characters",
      "any.required": "Name is required",
    }),

    isActive: Joi.boolean().required().messages({
      "boolean.base": "isActive must be a boolean",
      "any.required": "isActive is required",
    }),
  });

  return hallValidator;
}

module.exports = { getHallValidator };
