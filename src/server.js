const express = require('express')

const config = require('src/config/server')
const logger = require('src/components/logger')
const security = require('src/middlewares/security')
const request = require('src/middlewares/request')
const response = require('src/middlewares/response')
const error = require('src/middlewares/error')
const routes = require('src/routes')

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(security)
server.use(routes.swagger)
server.use(request)
server.use(routes.api)
server.use(error)
server.use(response)

server.listen(config.port, logger.info('Server started', { pid: process.pid }))

module.exports = server
