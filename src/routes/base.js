const route = '/base'
const api = require('../api/base')
const auth = require('../api/auth')

module.exports = (router) => {
  router.route(route).all(auth.validate).get(api.get).post(api.insert)
  router.route(`${route}/search`).all(auth.validate).post(api.search)
  router.route(`${route}/:id`).all(auth.validate).get(api.getById).patch(api.update).delete(api.remove)
}
