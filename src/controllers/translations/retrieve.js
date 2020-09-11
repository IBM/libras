const text = require('src/controllers/text')
const mongo = require('src/databases/mongo')
const NotFoundError = require('src/errors/not-found')

module.exports = async (language, signed) => {
  const signedProcessedText = await text.process(signed)

  const translation = await retrieveData(language, 'translations', { signed: signedProcessedText.hash })

  if (!translation) throw new NotFoundError()

  const spoken = await retrieveData(language, 'spoken', { hash: translation.spoken })

  return { signed, spoken: spoken.text }
}

function retrieveData (language, collection, query) {
  return mongo.connect()
    .then(connection =>
      connection
        .db(language)
        .collection(collection)
        .findOne(query)
    )
}
