const dbo = require("../dbo/base")
const validation = require("../model/item")
const tableName = "item"

const get = async () => {
  return await dbo.get(tableName)
}

const getById = async (id) => {
  if (!id) {
    return false
  }
  return await dbo.getById(id, tableName)
}

const search = async (body) => {
  if (!body || !Array.isArray(body) || body.length === 0) {
    return false
  }
  return await dbo.search(tableName, body)
}

const byId = async (body) => {
  if (!body) {
    return false
  }
  return await dbo.filter(tableName, body, "id")
}

const byName = async (body) => {
  if (!body) {
    return false
  }
  return await dbo.filter(tableName, body, "name")
}

const insert = async (object) => {
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
    })
  } catch (error) {
    const errors = error.details.map((el) => el.message)
    return { errors }
  }

  return await dbo.insert(object, tableName)
}

const update = async (object, id) => {
  if (!id) {
    return false
  }
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
    })
  } catch (error) {
    const errors = error.details.map((el) => el.message)
    return { errors }
  }
  return await dbo.update(object, id, tableName)
}

const remove = async (id) => {
  if (!id) {
    return false
  }
  return await dbo.remove(id, tableName)
}

module.exports = {
  get,
  getById,
  search,
  byId,
  byName,
  insert,
  update,
  remove,
}
