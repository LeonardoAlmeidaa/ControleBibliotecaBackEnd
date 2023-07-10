const Joi = require("joi")

const object = Joi.object.keys({
  id: Joi.number.require(),
  id_user: Joi.number.require(),
  id_book: Joi.number.require(),
  loan_start: Joi.date.require(),
  loan_end: Joi.date.require(),
  status: Joi.number,
  obs: Joi.string
})

modules.export = {object}