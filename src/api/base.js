const facade = require('../facade/base')

const get = async (req, res) => {
  const result = await facade.get()
  return res.status(200).send(result)
}

const getById = async (req, res) => {
  const id = req.params.id
  const result = await facade.getById(id)
  return res.status(200).send(result)
}

const search = async (req, res) => {
  const body = req.body
  const result = await facade.search(body)
  return res.status(200).send(result)
}

const insert = async (req, res) => {
  const object = req.body
  const result = await facade.insert(object)
  if (result.errors) {
    return res.status(400).send(result.errors)
  }
  return res.sendStatus(204)
}

const update = async (req, res) => {
  const id = req.params.id
  const object = req.body
  const result = await facade.update(object, id)
  if (result.errors) {
    return res.status(400).send(result.errors)
  }
  return res.sendStatus(204)
}

const remove = async (req, res) => {
  const id = req.params.id
  await facade.remove(id)
  return res.sendStatus(204)
}

module.exports = {
  get,
  getById,
  search,
  insert,
  update,
  remove,
}
