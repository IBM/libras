require('dotenv').config()

const joi = require('joi')

const schema = joi.object({
  NLU_URL: joi.string(),
  NLU_API_KEY: joi.string()
}).unknown()

const { error, value: env } = schema.validate(process.env)

if (error) throw new Error(`Config validation error: ${error.message}`)

const config = {
  url: env.NLU_URL,
  apiKey: env.NLU_API_KEY
}

module.exports = config
