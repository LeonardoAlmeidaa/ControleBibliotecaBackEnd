const route = "/item"
const api = require("../api/item")
const auth = require("../api/auth")

module.exports = (router) => {
  router.route(route).all(auth.validate).get(api.get).post(api.insert)
  router.route(`${route}/search`).all(auth.validate).post(api.search)
  router.route(`${route}/search/by-id`).all(auth.validate).get(api.byId)
  router.route(`${route}/search/by-name`).all(auth.validate).get(api.byName)
  router.route(`${route}/:id`).all(auth.validate).get(api.getById).patch(api.update).delete(api.remove)
}
