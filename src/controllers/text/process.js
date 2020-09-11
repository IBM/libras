const md5 = require('md5')
const nlu = require('src/services/ibm/nlu')
const map = require('src/controllers/text/map')
const hash = require('src/controllers/text/hash')

module.exports = async (text) => {
  const processedLanguage = await nlu(text)
  processedLanguage.text = text
  const signedTextMap = map(processedLanguage.syntax.tokens)
  processedLanguage.hash = hash(processedLanguage.syntax.tokens, signedTextMap)
  processedLanguage.md5 = md5(processedLanguage.hash)
  return processedLanguage
}
