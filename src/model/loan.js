const Joi = require("joi")

const object = Joi.object().keys({
  idUser: Joi.number().required(),
  idBook: Joi.number().required(),
  loanStart: Joi.date().required(),
  loanEnd: Joi.date(),
  status: Joi.number(),
  obs: Joi.string().allow(null)
})

module.exports = {object}