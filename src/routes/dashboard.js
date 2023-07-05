const route = "/dashboard"
const api = require("../api/dashboard")
const auth = require("../api/auth")

module.exports = (router) => {
  router.route(`${route}/search`).all(auth.validate).post(api.search)
  router.route(`${route}/filter`).all(auth.validate).get(api.filter)
}
