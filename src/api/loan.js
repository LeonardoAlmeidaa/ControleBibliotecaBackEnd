const facade = require("../facade/loan")

const get = async (req, res) => {
  const result = await facade.get()
  return res.status(200).send(result)
}

const getById = async (req, res) => {
  const id = req.params.id
  const result = await facade.getById(id)

  if (result) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

const search = async (req, res) => {
  const object = req.body
  const result = await facade.search(object)

  if (result && result.length > 0) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

const byId = async (req, res) => {
  const object = req.query
  const result = await facade.byId(object)

  if (result && result.length > 0) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

const byIdUser = async (req, res) => {
  const object = req.query
  const result = await facade.byIdUser

  if (result && result.length > 0) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

const byIdBook = async (req, res) => {
  const object = req.query
  const result = await facade.byIdBook

  if (result && result.length > 0) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
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

  if (result.erros) {
    return res.status(400).send(result.errors)
  }
  return res.sendStatus(204)
}

const remove = async (req, res) => {
  const id = req.params.id
  const result = await facade.remove(id)

  if (result) {
    return res.sendStatus(204)
  }
  return res.sendStatus(400)
}

module.exports = {
  get,
  getById,
  search,
  byId,
  byIdUser,
  byIdBook,
  insert,
  update,
  remove
}