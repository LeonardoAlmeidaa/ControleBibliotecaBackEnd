const fs = require('fs')
const path = require('path')
const { Router } = require('express')

const start = (app) => {
  const router = Router()
  app.use(router)

  const directory = path.resolve('./src/routes/')
  const filelist = fs.readdirSync(directory)

  for (let i = 0; i < filelist.length; i++) {
    const file = filelist[i]
    const routes = require(directory + '/' + file)
    routes(router)
  }

  router.route('/ping').all((req, res) => {
    res.status(200).send('Pong')
  })

  router.route('/').all((req, res) => {
    res.sendStatus(204)
  })

  router.route('*').all((req, res) => {
    res.status(404).send('Erro, rota não encontrada.')
  })
}

module.exports = { start }
