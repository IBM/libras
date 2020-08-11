/* eslint-disable no-template-curly-in-string */

const compile = require('src/localization/compile')

module.exports = compile({
  errors: {
    badRequest: 'Bad request',
    missingParameter: 'Missing required parameter \'${parameter}\'',
    invalidParameter: 'Parameter \'${parameter}\' should be ${type}',
    notFound: 'Not found',
    internalServer: 'Internal server error'
  }
})
