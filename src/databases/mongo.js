const MongoClient = require('mongodb').MongoClient
const Server = require('mongodb').Server

const hostname = process.env.MONGODB_HOSTNAME || 'localhost'
const port = process.env.MONGODB_PORT || 27017
const poolSize = process.env.MONGODB_POOL || 5

const options = { poolSize }

let connection

module.exports.defaultDatabases = ['admin', 'config', 'local']

module.exports.connect = async () => {
  if (isConnected()) return connection

  const client = new MongoClient(new Server(hostname, port), options)
  connection = await client.connect()

  return connection
}

function isConnected () {
  return !!connection && !!connection.topology && connection.topology.isConnected()
}
