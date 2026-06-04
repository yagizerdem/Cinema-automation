// validators/screeningValidator.js
const Joi = require("joi");

const mongoDbObjectIdRegex = /^[a-f\d]{24}$/i;

function getCreateTicketWebValidator() {
  const validator = Joi.object({
    screening: Joi.string().pattern(mongoDbObjectIdRegex).required().messages({
      "string.empty": "Screening ID is required",
      "string.pattern.base": "Screening ID must be a valid MongoDB ObjectId",
      "any.required": "Screening ID is required",
    }),

    seat: Joi.object({
      row: Joi.string().required(),
      number: Joi.number().required(),
    }).required(),
  });

  return validator;
}

module.exports = { getCreateTicketWebValidator };
