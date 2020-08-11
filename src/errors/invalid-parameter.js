const httpStatus = require('http-status')
const localization = require('src/localization')

class InvalidParameterError extends Error {
  constructor (parameter, type) {
    super(localization.errors.badRequest())
    this.name = this.constructor.name
    this.statusCode = httpStatus.BAD_REQUEST
    this.description = localization.errors.invalidParameter({ parameter, type })
    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = InvalidParameterError
