const text = require('src/controllers/text')
const mongo = require('src/databases/mongo')

module.exports = async (language, signed, spoken) => {
  const signedProcessedText = await text.process(signed)
  const spokenProcessedText = await text.process(spoken)

  const translation = {
    signed: signedProcessedText.hash,
    spoken: spokenProcessedText.hash
  }

  await storeData(language, 'signed', signedProcessedText)
  await storeData(language, 'spoken', spokenProcessedText)
  await storeData(language, 'translations', translation)
}

function storeData (language, collection, data) {
  return mongo.connect()
    .then(connection =>
      connection
        .db(language)
        .collection(collection)
        .insertOne(data)
    )
}
