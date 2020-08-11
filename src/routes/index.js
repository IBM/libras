const express = require('express')
const routes = require('requireindex')(__dirname)

const swagger = require('src/routes/swagger')

const router = express.Router()

Object.keys(routes)
  .filter(route => !['swagger'].includes(route))
  .forEach(route => router.use(routes[route]))

module.exports.api = router
module.exports.swagger = swagger
