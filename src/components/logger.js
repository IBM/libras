const config = require('src/config/logger')

const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')

const file = new transports.DailyRotateFile({
  datePattern: 'YYYY-MM-DD',
  utc: true,
  dirname: config.directory,
  filename: 'application-%DATE%.log',
  zippedArchive: true,
  maxSize: config.maxSize,
  maxFiles: config.maxFiles,
  format: format.combine(format.timestamp(), format.json({ stable: true }))
})

const console = new transports.Console({
  format: format.combine(format.colorize(), format.simple())
})

const logger = createLogger({ level: config.level })

if (config.enabled) {
  logger.add(file)
  if (process.env.NODE_ENV === 'dev') logger.add(console)
}

module.exports = logger
