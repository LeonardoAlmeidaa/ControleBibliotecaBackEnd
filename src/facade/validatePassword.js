const dbo = require("../dbo/base")
const tableName = "user"
const bcrypt = require("bcrypt")
const { object } = require("joi")

const post = async (body) => {
  user = await dbo.search(tableName, [
    { column: "email", signal: "=", value: body.email },
  ])

  if (!user || user.length === 0) {
    return false
  }

  const isPasswordMatch = bcrypt.compareSync(body.password, user[0].password)

  if (!isPasswordMatch) {
    return false
  }

  return true
}

module.exports = {
  post,
}
