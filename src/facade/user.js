const dbo = require("../dbo/base")
const validation = require("../model/user")
const tableName = "user"
const bcrypt = require("bcrypt")
const saltRounds = 10

const get = async () => {
  const obj = await dbo.get(tableName)

  const newObj = obj.map(({ password, ...rest }) => rest)

  return newObj
}

const getById = async (id) => {
  if (!id) {
    return false
  }
  const obj = await dbo.getById(id, tableName)

  const newObj = { ...obj, password: undefined }

  return newObj
}

const search = async (body) => {
  if (!body || !Array.isArray(body) || body.length === 0) {
    return false
  }
  const results = await dbo.search(tableName, body)

  const newResults = results.map(({ password, ...rest }) => rest)

  return newResults
}

const byName = async (body) => {
  if (!body) {
    return false
  }

  const obj = await dbo.filter(tableName, body, "name")

  const newObj = obj.map(({ password, ...rest }) => rest)

  return newObj
}

const byEmail = async (body) => {
  if (!body) {
    return false
  }

  const obj = await dbo.filter(tableName, body, "email")

  const newObj = obj.map(({ password, ...rest }) => rest)

  return newObj
}

const byStatus = async (body) => {
  if (!body) {
    return false
  }

  const obj = await dbo.filter(tableName, body, "status")

  const newObj = obj.map(({ password, ...rest }) => rest)

  return newObj
}

const insert = async (object) => {
  try {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/
    if (!passwordRegex.test(object.password)) {
      throw new Error(
        "A senha deve ter no mínimo 8 caracteres contendo pelo menos 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial."
      )
    }

    await validation.object.validateAsync(object, {
      abortEarly: false,
    })
  } catch (error) {
    if (error.details) {
      const errors = error.details.map((el) => el.message)
      return { errors }
    } else {
      return { errors: [error.message] }
    }
  }

  const hash = await new Promise((resolve, reject) => {
    bcrypt.hash(object.password, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })

  object.password = hash

  return await dbo.insert(object, tableName)
}

const update = async (object, id) => {
  if (!id) {
    return false
  }

  if (object.password) {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/

    if (!passwordRegex.test(object.password)) {
      return {
        errors: [
          "A senha deve ter no mínimo 8 caracteres contendo pelo menos 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial.",
        ],
      }
    }

    const hash = await new Promise((resolve, reject) => {
      bcrypt.hash(object.password, saltRounds, function (err, hash) {
        if (err) reject(err)
        resolve(hash)
      })
    })

    object.password = hash
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
  byName,
  byEmail,
  byStatus,
  insert,
  update,
  remove,
}
