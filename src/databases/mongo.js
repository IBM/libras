const MongoClient = require('mongodb').MongoClient
const Server = require('mongodb').Server
const config = require('src/config/mongo')

const options = { poolSize: config.pool }

let connection

module.exports.defaultDatabases = ['admin', 'config', 'local']

module.exports.connect = async () => {
  if (isConnected()) return connection

  const client = new MongoClient(new Server(config.hostname, config.port), options)
  connection = await client.connect()

  return connection
}

function isConnected () {
  return !!connection && !!connection.topology && connection.topology.isConnected()
}
