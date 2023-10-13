const { object } = require("joi")
const dbo = require("../dbo/base")
const dboLoan = require("../dbo/loan") /*Customizado*/
const validation = require("../model/loan")
const tableName = "loan"
const moment = require("moment")

const get = async () => {
  return await dbo.getLoan(tableName)
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
  return await dbo.byId(tableName, body, "id")
}

const byIdUser = async (body) => {
  if (!body) {
    return false
  }
  return await dbo.byId(tableName, body, "id_user")
}

const getByIdUser = async (idUser) => {
  if (!idUser) {
    return false
  }
  return await dboLoan.getByIdUser(idUser, tableName)
}

const getByIdBook = async (idBook) => {
  if (!idBook) {
    return false
  }
  return await dboLoan.getByIdBook(idBook, tableName)
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
    console.log("ERRO SHERNOWS");
    console.log(error);
    const errors = error.details.map((el) => el.message)
    return { errors }
  }

  object.loanEnd = moment(object.loanStart).add("3", "days").format()
  const param = [{ column: "id_book", signal: '=', value: object.idBook }, {column: "status", signal: '=', value: '1'}]
  const oldData = await dbo.search(tableName, param)

  console.log("OLD DATA");
  console.log(oldData);

  if (oldData.data.length < 1) {
    console.log("length");
    return await dbo.insert(object, tableName)
  }

  else {
    for (let index = 0; index < oldData.data.length; index++) {
      const element = oldData.data[index]

      console.log("OLD DATA - else");
      console.log(element);

      if (moment(element.loanStart).format('yyyy-MM-DD') >= object.loanStart) {
        return { errors: [{ file: 'Erro', message: "Já existe um empréstimo ATIVO nesta data." }] }
      }
    }
  }

  // return await dbo.insert(object, tableName)
}

const update = async (object) => {
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
  return await dbo.update(object, tableName)
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
  getByIdUser,
  byIdUser,
  getByIdBook,
  byIdBook,
  insert,
  update,
  remove
}

