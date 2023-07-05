const Joi = require("joi")

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/

const object = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().regex(passwordRegex, "password"),
  status: Joi.number(),
  obs: Joi.string()
})

module.exports = { object }