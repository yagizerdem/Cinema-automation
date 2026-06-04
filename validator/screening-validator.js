// validators/screeningValidator.js
const Joi = require("joi");

const mongoDbObjectIdRegex = /^[a-f\d]{24}$/i;

function getScreeningValidator() {
  const screeningValidator = Joi.object({
    movie: Joi.string().pattern(mongoDbObjectIdRegex).required().messages({
      "string.empty": "Movie ID is required",
      "string.pattern.base": "Movie ID must be a valid MongoDB ObjectId",
      "any.required": "Movie ID is required",
    }),

    hall: Joi.string().pattern(mongoDbObjectIdRegex).required().messages({
      "string.empty": "Hall ID is required",
      "string.pattern.base": "Hall ID must be a valid MongoDB ObjectId",
      "any.required": "Hall ID is required",
    }),

    startTime: Joi.date().required().messages({
      "date.base": "Start time must be a valid date",
      "any.required": "Start time is required",
    }),

    endTime: Joi.date().required().greater(Joi.ref("startTime")).messages({
      "date.greater": "End time must be after start time",
      "date.base": "End time must be a valid date",
      "any.required": "End time is required",
    }),

    basePrice: Joi.number().required().min(0).messages({
      "number.min": "Base price must be a non-negative number",
      "number.base": "Base price must be a number",
      "any.required": "Base price is required",
    }),

    isSpecialSession: Joi.boolean().messages({
      "boolean.base": "Is special session must be a boolean",
    }),
  });

  return screeningValidator;
}

module.exports = { getScreeningValidator };
