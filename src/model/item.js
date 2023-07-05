const Joi = require("joi")

const object = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
  gender: Joi.string(),
  author: Joi.string(),
  quantity_pages: Joi.string(),
  date_acquisition: Joi.string(),
  status: Joi.number(),
  obs: Joi.string()
})

module.exports = { object }
