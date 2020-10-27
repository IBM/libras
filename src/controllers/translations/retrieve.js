const text = require('src/controllers/text')
const mongo = require('src/databases/mongo')

module.exports = async (language, signed) => {
  const translationData = { signed, spoken: null }
  const signedProcessedText = await text.process(signed)

  const translation = await retrieveData(language, 'translations', { signed: signedProcessedText.hash })

  if (translation) {
    const spoken = await retrieveData(language, 'spoken', { hash: translation.spoken })
    translationData.spoken = spoken ? spoken.text : null
  }
  return translationData
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
