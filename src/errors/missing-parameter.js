const httpStatus = require('http-status')
const localization = require('src/localization')

class MissingParameterError extends Error {
  constructor (parameter) {
    super(localization.errors.badRequest())
    this.name = this.constructor.name
    this.statusCode = httpStatus.BAD_REQUEST
    this.description = localization.errors.missingParameter({ parameter })
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = MissingParameterError
