require('dotenv').config()

const joi = require('joi')

const schema = joi.object({
  LOG_ENABLED: joi.boolean()
    .truthy('TRUE').truthy('true').falsy('FALSE').falsy('false')
    .default(true),
  LOG_LEVEL: joi.string()
    .equal('error', 'warn', 'info', 'verbose', 'debug', 'silly')
    .default('info'),
  LOG_DIR: joi.string()
    .default('logs'),
  /*
   * Maximum size of the file after which it will rotate.
   * This can be a number of bytes, or units of kb, mb, and gb.
   * If using the units, add 'k', 'm', or 'g' as the suffix.
   * The units need to directly follow the number.
   */
  LOG_MAX_SIZE: joi.string()
    .pattern(new RegExp('[0-9]+[kmg]?$'))
    .default('10m'),
  /*
   * Maximum number of logs to keep. If not set, no logs will be removed.
   * This can be a number of files or number of days.
   * If using days, add 'd' as the suffix.
   */
  LOG_MAX_FILES: joi.string()
    .pattern(new RegExp('[0-9]+[d]?$'))
    .default('7d')
}).unknown()

const { error, value: env } = schema.validate(process.env)

if (error) throw new Error(`Config validation error: ${error.message}`)

const config = {
  enabled: env.LOG_ENABLED,
  level: env.LOG_LEVEL,
  directory: env.LOG_DIR,
  maxSize: env.LOG_MAX_SIZE,
  maxFiles: env.LOG_MAX_FILES
}

module.exports = config
