const Joi = require('joi')
const error = require('../config/error-message')

const object = Joi.object().keys({
  name: Joi.string().required().messages(error.message('Nome')),
})

module.exports = { object }
