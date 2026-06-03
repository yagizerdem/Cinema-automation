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

function getSeatValidator() {
  const seatValidator = Joi.object({
    row: Joi.string().trim().min(1).max(100).required().messages({
      "string.empty": "Row is required",
      "string.min": "Row must be at least 1 character",
      "string.max": "Row must be at most 100 characters",
      "any.required": "Row is required",
    }),
    number: Joi.number().min(1).max(100).required().messages({
      "number.base": "Number must be a number",
      "number.min": "Number must be at least 1",
      "number.max": "Number must be at most 100",
      "any.required": "Number is required",
    }),
    isActive: Joi.boolean().required().messages({
      "boolean.base": "isActive must be a boolean",
      "any.required": "isActive is required",
    }),
  });

  return seatValidator;
}

module.exports = { getHallValidator, getSeatValidator };
