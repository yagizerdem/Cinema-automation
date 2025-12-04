const Joi = require("joi");

const filmSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required().messages({
    "string.empty": "Film title is required",
  }),

  duration: Joi.number().integer().min(1).max(1000).required().messages({
    "number.base": "Duration must be a number",
    "any.required": "Duration is required",
  }),

  category: Joi.string().trim().min(1).max(100).required().messages({
    "string.empty": "Category is required",
  }),

  description: Joi.string().trim().min(5).max(2000).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters",
  }),

  posterUrl: Joi.string().uri().required().messages({
    "string.uri": "Poster URL must be a valid URL",
    "any.required": "Poster URL is required",
  }),
})
  .prefs({ abortEarly: false, stripUnknown: true })
  .unknown(false);

module.exports = { filmSchema };
