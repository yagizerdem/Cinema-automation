const Joi = require("joi");

const nameRegex = /^[\p{L}][\p{L}\p{M}\s'.-]{1,48}$/u;

const registerSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .pattern(nameRegex)
    .messages({
      "string.empty": "First name is required",
      "string.pattern.base": "First name contains invalid characters",
    })
    .min(2)
    .max(49)
    .required(),

  lastName: Joi.string()
    .trim()
    .pattern(nameRegex)
    .messages({
      "string.empty": "Last name is required",
      "string.pattern.base": "Last name contains invalid characters",
    })
    .min(2)
    .max(49)
    .required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email is not valid",
      "any.required": "Email is required",
    }),

  password: Joi.string()
    .min(8)
    .max(72)
    .pattern(/(?=.*[a-z])/)
    .message("Password must contain a lowercase letter")
    .pattern(/(?=.*[A-Z])/)
    .message("Password must contain an uppercase letter")
    .pattern(/(?=.*\d)/)
    .message("Password must contain a number")
    .pattern(/(?=.*[^A-Za-z0-9])/)
    .message("Password must contain a symbol")
    .required(),
})
  .required()
  .prefs({ abortEarly: false, stripUnknown: true })
  .unknown(false);

const emailVerificationSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email is not valid",
      "any.required": "Email is required",
    }),
  fullName: Joi.string().trim().min(2).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 2 characters long",
  }),
})
  .required()
  .prefs({ abortEarly: false, stripUnknown: true })
  .unknown(false);

module.exports = { registerSchema, emailVerificationSchema };
