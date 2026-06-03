const Joi = require("joi");

function getMovieValidator() {
  const movieValidator = Joi.object({
    title: Joi.string().trim().min(1).max(100).required().messages({
      "string.empty": "Title is required",
      "string.min": "Title must be at least 1 character",
      "string.max": "Title must be at most 100 characters",
      "any.required": "Title is required",
    }),
    durationMinute: Joi.number().min(1).required().messages({
      "number.base": "DurationMinute must be a number",
      "number.min": "DurationMinute must be at least 1",
      "any.required": "DurationMinute is required",
    }),
    description: Joi.string().trim().max(500).messages({
      "string.max": "Description must be at most 500 characters",
    }),
    isActive: Joi.boolean().required().messages({
      "boolean.base": "isActive must be a boolean",
      "any.required": "isActive is required",
    }),
  });

  return movieValidator;
}

module.exports = { getMovieValidator };
