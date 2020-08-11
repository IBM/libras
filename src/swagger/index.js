const swaggerJsdoc = require('swagger-jsdoc')

const paths = require('src/swagger/paths')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: `${capitalizeFirstLetter(require('package.json').name)} API`,
      version: require('package.json').version,
      description: require('package.json').description
    }
  },
  apis: paths
}

function capitalizeFirstLetter (string) {
  return string[0].toUpperCase() + string.slice(1)
}

module.exports = swaggerJsdoc(options)
