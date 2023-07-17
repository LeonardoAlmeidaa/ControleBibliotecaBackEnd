const Joi = require("joi")

const object = Joi.object().keys({
  id_user: Joi.number().required(),
  id_book: Joi.number().required(),
  loan_start: Joi.date().required(),
  loan_end: Joi.date(),
  status: Joi.number(),
  obs: Joi.string()
})

module.exports = {object}