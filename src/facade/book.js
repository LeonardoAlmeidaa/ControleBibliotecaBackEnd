const dbo = require("../dbo/base")
const validation = require("../model/book")
const tableName = "book"

const get = async (page, limit) => {
  return await dbo.get(tableName, page, limit)
}

const getById = async (id) => {
  if (!id) {
    return false
  }
  return await dbo.getById(id, tableName)
}

const getByGender = async () => {
  return await dbo.getByGender(tableName)
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
  return await dbo.byId(tableName, body, "id")
}

const byName = async (body, page, limit) => {
  if (!body) {
    return false
  }

  const object = []
  object.push(body)

  const result = await dbo.search(tableName, object, page, limit)

  return result.data
}

const byGender = async (body, page, limit) => {
  if (!body) {
    return false
  }

  const object = []
  object.push(body)

  const result = await dbo.search(tableName, object, page, limit)

  return result.data
}

const byAuthor = async (body, page, limit) => {
  if (!body) {
    return false
  }

  const object = []
  object.push(body)

  const result = await dbo.search(tableName, object, page, limit)

  return result.data
}

const insert = async (object) => {
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false
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
      abortEarly: false
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
  getByGender,
  search,
  byId,
  byName,
  byGender,
  byAuthor,
  insert,
  update,
  remove
}