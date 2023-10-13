const { date } = require("joi")
const db = require("../config/db")

const getByIdUser = async (idUser, tableName) => {
  const result = await db(tableName)
    .select()
    .where("id_user", idUser)
    .where("deleted_at", null)
    .first()
    .catch((err) => {
      console.log(err.message)
      return false
    })

  return result
}

const getByIdBook = async (idBook, tableName) => {
  const result = await db(tableName)
    .select()
    .where("id_book", idBook)
    .where("deleted_at", null)
    .first()
    .catch((err) => {
      console.log(err.message)
      return false
    })

  return result
}

module.exports = {
  getByIdUser,
  getByIdBook
}