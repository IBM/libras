require('dotenv').config()

const joi = require('joi')

const schema = joi.object({
  MONGODB_HOSTNAME: joi.string()
    .default('localhost'),
  MONGODB_PORT: joi.number()
    .port()
    .default(27017),
  MONGODB_POOL: joi.number()
    .min(1)
    .default(5)
}).unknown()

const { error, value: env } = schema.validate(process.env)

if (error) throw new Error(`Config validation error: ${error.message}`)

const config = {
  hostname: env.MONGODB_HOSTNAME,
  port: env.MONGODB_PORT,
  pool: env.MONGODB_POOL
}

module.exports = config
