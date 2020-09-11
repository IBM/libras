const mongo = require('src/databases/mongo')

module.exports = () => {
  return mongo.connect()
    .then(connection => {
      return connection
        .db('admin')
        .admin()
        .listDatabases()
        .then(result =>
          result.databases
            .filter(database => !mongo.defaultDatabases.includes(database.name))
            .map(database => database.name)
        )
        .catch(err => err)
    })
    .catch(err => err)
}
