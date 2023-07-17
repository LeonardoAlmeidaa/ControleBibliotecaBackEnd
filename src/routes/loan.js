const route = "/loan"
const api = require("../api/loan")
const auth = require("../api/auth")

module.exports = (router) => {
  router.route(route).all(auth.validate).get(api.get).post(api.insert)
  router.route(`${route}/search`).all(auth.validate).post(api.search)
  router.route(`${route}/search/by-id`).all(auth.validate).get(api.byId)
  router.route(`${route}/by-id-user`).all(auth.validate).get(api.getById)
  router.route(`${route}/by-id-book`).all(auth.validate).get(api.get)
  router.route(`${route}/:id`).all(auth.validate).get(api.getById).patch(api.update).delete(api.remove)
}