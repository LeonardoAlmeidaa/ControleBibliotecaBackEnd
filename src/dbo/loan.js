const { date } = require("joi")
const db = require("../config/db")

const getByIdUser = async (id_user, tableName) => {
  const result = await db(tableName)
    .select()
    .where("id_user", id_user)
    .where("deleted_at", null)
    .first()
    .catch((err) => {
      console.log(err.message)
      return false
    })

  return result
}

const getByIdBook = async (id_book, tableName) => {
  const result = await db(tableName)
    .select()
    .where("id_book", id_book)
    .where("deleted_at", null)
    .first()
    .catch((err) => {
      console.log(err.message)
      return false
    })

  return result
}

const getAll = async (tableName) => {
  const result = await db(tableName)
    .select()
    .leftJoin("user", "loan.idUser", "user.id")
    .leftJoin("book", "loan.idBook", "book.id")
    .where("deleted_at", null)
    .catch((err) => {
      console.log(err.message)
      return []
    })
  return result
}

module.exports = {
  getByIdUser,
  getByIdBook,
  getAll
}