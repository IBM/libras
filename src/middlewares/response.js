const logger = require('src/logger/index')

function response (req, res, next) {
  const body = res.locals.constructor === Array || Object.keys(res.locals).length > 0
    ? res.locals
    : undefined

  res.send(body)

  logger.info('Response', { res: { statusCode: res.statusCode, body } })
}

module.exports = response
