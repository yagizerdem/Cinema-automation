// validators/authValidator.js
const Joi = require("joi");

function getRegisterValidator() {
  const registerValidator = Joi.object({
    firstName: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters",
      "string.max": "First name must be at most 50 characters",
      "any.required": "First name is required",
    }),

    lastName: Joi.string().trim().min(2).max(50).required().messages({
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters",
      "string.max": "Last name must be at most 50 characters",
      "any.required": "Last name is required",
    }),

    email: Joi.string().trim().lowercase().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
      "any.required": "Email is required",
    }),

    password: Joi.string().min(6).max(64).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be at most 64 characters",
      "any.required": "Password is required",
    }),
  });

  return registerValidator;
}

function getLoginValidator() {
  const loginValidator = Joi.object({
    email: Joi.string().trim().lowercase().email().required().messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
      "any.required": "Email is required",
    }),

    password: Joi.string().min(6).max(64).required().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must be at most 64 characters",
      "any.required": "Password is required",
    }),
  });

  return loginValidator;
}

module.exports = { getRegisterValidator, getLoginValidator };
