const facade = require("../facade/book")

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

const byName = async (req, res) => {
  const object = req.query
  const page = req.query.page
  const limit = req.query.limit
  delete object.page
  delete object.limit

  const result = await facade.byName(object, page, limit)


  if (result && result.length > 0) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

const byGender = async (req, res) => {
  const object = req.query
  const page = req.query.page
  const limit = req.query.limit
  delete object.page
  delete object.limit

  const result = await facade.byGender(object, page, limit)

  if (result && result.length > 0) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

const byAuthor = async (req, res) => {
  const object = req.query
  const page = req.query.page
  const limit = req.query.limit
  delete object.page
  delete object.limit
 
  const result = await facade.byAuthor(object, page, limit)

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
  byName,
  byGender,
  byAuthor,
  insert,
  update,
  remove
}