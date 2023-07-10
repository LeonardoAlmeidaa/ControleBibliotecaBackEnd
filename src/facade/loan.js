const { object } = require("joi")
const dbo = require("../dbo/base")
const dboLoan = require("../dbo/loan") /*Customizado*/
const validation = require("../model/loan")
const tableName = "loan"

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
  if (!body || !Array.isArray(body) || body.length === 0)  {
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

const byIdUser = async (body) => {
  if (!body) {
    return false
  }
  return await dbo.byId(tableName, body, "id_user")
}

const getByIdUser = async (id_user) => {
  if (!id_user) {
    return false
  }
  return await dboLoan.getByIdUser(id_user, tableName)
}

const getByIdBook = async (id_book) => {
  if (!id_book) {
    return false
  }
  return await dboLoan.getByIdBook(id_book, tableName)
}

const byIdBook = async (body) => {
  if (!body) {
    return false
  }
  return await dbo.byId(tableName, body, "id_book")
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

const update = async (object) => {
  if (!id) {
    return false
  }
  try {
    await validation.object.validateAsync(object, {
      abortEarly:false
    })
  } catch (error) {
      const errors = error.details.map((el) => el.message)
      return { errors }
  }
  return await dbo.update(object, tableName)
}

const remove = async (id) => {
  if(!id) {
    return false
  }
  return await dbo.remove(id, tableName)
}

module.exports = {
  get,
  getById,
  search,
  byId,
  getByIdUser,
  byIdUser,
  getByIdBook,
  byIdBook,
  insert,
  update,
  remove
}

