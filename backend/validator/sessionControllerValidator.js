const Joi = require("joi");

const sessionSchema = Joi.object({
  filmId: Joi.string()
    .trim()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "Film ID is required",
      "string.pattern.base": "Film ID must be a valid ObjectId",
    }),

  hallId: Joi.string()
    .trim()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "Hall ID is required",
      "string.pattern.base": "Hall ID must be a valid ObjectId",
    }),

  startTime: Joi.date()
    .iso() // ISO 8601 UTC datetime
    .required()
    .messages({
      "date.base": "Start time must be a valid datetime",
      "date.format": "Start time must be in ISO 8601 format",
      "any.required": "Start time is required",
    }),

  endTime: Joi.date().iso().required().messages({
    "date.base": "End time must be a valid datetime",
    "date.format": "End time must be in ISO 8601 format",
    "any.required": "End time is required",
  }),

  isSpecial: Joi.boolean().default(false),

  basePrice: Joi.number().min(0).required().messages({
    "number.base": "Base price must be a number",
    "any.required": "Base price is required",
  }),
})
  .prefs({ abortEarly: false, stripUnknown: true })
  .unknown(false);

module.exports = { sessionSchema };
