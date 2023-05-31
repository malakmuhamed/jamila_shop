const joi = require('@hapi/joi');

const authSchema = joi.object({
  fullname: joi.string(),
  email: joi.string().email().lowercase().required(),
  typeofuser:joi.string(),
  password: joi.string().min(2).required(),
});

module.exports = {
  authSchema,
};
