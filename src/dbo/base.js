const { date } = require("joi")
const db = require("../config/db")

const get = async (tableName) => {
  const result = await db(tableName)
    .select()
    .where("deleted_at", null)
    .catch((err) => {
      console.log(err.message)
      return []
    })
  return result
}

const getLoan = async (tableName) => {
  const result = await db(tableName)
    .select(
      "loan.loanStart",
      "loan.loanEnd",
      "loan.status",
      "user.name as userName",
      "book.name as bookName"
    )
    .innerJoin("user", "loan.idUser", "user.id")
    .innerJoin("book", "loan.idBook", "book.id")
    .where("loan.deleted_at", null)
    .catch((err) => {
      return []
    })
  return result
}

const getById = async (id, tableName) => {
  const result = await db(tableName)
    .select()
    .where("id", id)
    .where("deleted_at", null)
    .first()
    .catch((err) => {
      console.log(err.message)
      return false
    })

  return result
}

// const search = async (tableName, params = []) => {
//   const result = await db(tableName)
//     .select()
//     .where("deleted_at", null)
//     .where(function () {
//       for (let i = 0; i < params.length; i++) {
//         const element = params[i]
//         this.where(element.column, element.signal, element.value)
//       }
//     })
//     .catch((err) => {
//       return false
//     })
//   return result
// }

const search = async (tableName, params = [], page = 1, perPage = 10) => {
  const offset = (page - 1) * perPage
  const result = await db(tableName)
    .select()
    .where("deleted_at", null)
    .where(function () {
      for (let i = 0; i < params.length; i++) {
        const element = params[i]
        console.log(element)
        if (element.operator) {
          switch (element.operator) {
            case "AND":
              this.andWhere(element.column, element.signal, element.value)
              break
            case "OR":
              this.orWhere(element.column, element.signal, element.value)
              break
            case "LIKE":
              this.orWhere(
                element.column,
                element.operator,
                `%${element.value}%`
              )
              break
            case "IN":
              this.whereIn(element.column, element.value)
              break
            default:
              this.andWhere(element.column, "LIKE", `%${element.value}%`)
              break
          }
        } else {
          this.where(element.column, element.signal, element.value)
        }
      }
    })
    .limit(perPage)
    .offset(offset)
    .catch((err) => {
      return false
    })

  const count = await db(tableName)
    .count("id as quantity")
    .first()
    .where("deleted_at", null)
    .where(function () {
      for (let i = 0; i < params.length; i++) {
        const element = params[i]
        if (element.operator) {
          switch (element.operator) {
            case "AND":
              this.andWhere(element.column, element.signal, element.value)
              break
            case "OR":
              this.orWhere(element.column, element.signal, element.value)
              break
            case "LIKE":
              this.orWhere(
                element.column,
                element.operator,
                `%${element.value}%`
              )
              break
            case "IN":
              this.whereIn(element.column, element.value)
              break
            default:
              this.andWhere(element.column, "LIKE", `%${element.value}%`)
              break
          }
        } else {
          this.where(element.column, element.signal, element.value)
        }
      }
    })
    .catch((err) => {
      console.log(err.message)
      return []
    })

  return {
    data: result,
    actualPage: page,
    total: count.quantity,
  }
}

const filter = async (tableName, params = {}, orderBy) => {
  const array = Object.keys(params)
  const result = await db(tableName)
    .select()
    .where(function () {
      for (let i = 0; i < array.length; i++) {
        const el = array[i]
        this.where(el, "=", params[el])
      }
    })
    .where("deleted_at", null)
    .orderBy(orderBy)
    .catch((err) => {
      console.log(err);
      return false
    })
  console.log(result)
  return result
}

const insert = async (object, tableName) => {
  const result = await db(tableName)
    .insert(object)
    .catch((err) => {
      return { errors: err.message }
    })

  return result
}

const update = async (object, id, tableName) => {
  console.log(tableName);
  const result = await db(tableName)
    .update(object)
    .where("id", id)
    .catch((err) => {
      return { errors: err.message }
    })
  return result
}

const remove = async (id, tableName) => {
  const result = await db(tableName)
    .update({ deleted_at: new Date() })
    .where("id", id)
    .catch((err) => {
      console.log(err)
      return false
    })
  return result
}

const login = async (tableName, email) => {
  const result = await db(tableName)
    .select()
    .where("email", email)
    .where("deleted_at", null)
    // .where("status", 1)
    .first()
    .catch((err) => {
      return false
    })
  return result
}

module.exports = {
  get,
  getLoan,
  getById,
  search,
  insert,
  update,
  remove,
  filter,
  login
}
