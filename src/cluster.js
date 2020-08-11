const cluster = require('cluster')
const os = require('os')

const logger = require('src/components/logger')

if (cluster.isMaster) {
  logger.info('Master started', { pid: process.pid })

  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    logger.info('Worker died', { pid: worker.process.pid })
  })
} else {
  logger.info('Worker started', { pid: process.pid })
  require('src/server')
}
