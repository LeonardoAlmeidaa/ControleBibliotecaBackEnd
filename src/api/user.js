const facade = require("../facade/user")

const get = async (req, res) => {
  const page = req.query.page
  const limit = req.query.limit

  const result = await facade.get(page, limit)
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

const byEmail = async (req, res) => {
  const object = req.query
  const page = req.query.page
  const limit = req.query.limit
  delete object.page
  delete object.limit

  const result = await facade.byEmail(object, page, limit)
  if (result && result.length > 0) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}

const byStatus = async (req, res) => {
  const object = req.query
  const page = req.query.page
  const limit = req.query.limit
  delete object.page
  delete object.limit

  const result = await facade.byStatus(object, page, limit)

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
  if (result.errors) {
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

// const getUserGroup = async (req, res) => {
//   const userId = req.query.userId

//   const result = await facade.getUserGroup(userId)

//   if (result) {
//     return res.status(200).send(result)
//   }
//   return res.sendStatus(404)
// }

module.exports = {
  get,
  getById,
  search,
  byName,
  byEmail,
  byStatus,
  insert,
  update,
  remove,
  // getUserGroup,
}
