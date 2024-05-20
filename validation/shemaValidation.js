const joi = require("joi");

const schemaValidation = {
  registerSchema: joi.object({
    username: joi.string().required().min(3),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(8),
    role: joi.string(),
  }),
  loginSchema: joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
  }),
};

module.exports = schemaValidation;
