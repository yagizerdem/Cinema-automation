const Joi = require("joi");

function getPaymentValidator() {
  const validator = Joi.object({
    amount: Joi.number().positive().required().messages({
      "number.base": "Amount must be a number",
      "number.positive": "Amount must be a positive number",
      "any.required": "Amount is required",
    }),
  });

  return validator;
}

module.exports = { getPaymentValidator };
