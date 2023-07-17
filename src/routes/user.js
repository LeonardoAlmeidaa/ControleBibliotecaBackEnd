const route = "/user"
const api = require("../api/user")
const auth = require("../api/auth")

module.exports = (router) => {
  router.route(route).all(auth.validate).get(api.get).post(api.insert)
  router.route(`${route}/search`).all(auth.validate).post(api.search)
  router.route(`${route}/search/by-name`).all(auth.validate).get(api.byName)
  router.route(`${route}/search/by-email`).all(auth.validate).get(api.byEmail)
  router.route(`${route}/search/by-status`).all(auth.validate).get(api.byStatus)
  router.route(`${route}/:id`).all(auth.validate).get(api.getById).patch(api.update).delete(api.remove)
}