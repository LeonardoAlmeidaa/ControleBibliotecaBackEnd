const Joi = require("joi")

const object = Joi.object().keys({
  name: Joi.string().required(),
  gender: Joi.string(),
  author: Joi.string(),
  quantityPages: Joi.string(),
  dateAcquisition: Joi.date(),
  status: Joi.number(),
  obs: Joi.string().allow(null)
})

module.exports = { object }
