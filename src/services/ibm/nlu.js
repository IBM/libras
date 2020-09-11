const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
const { IamAuthenticator } = require('ibm-watson/auth')
const config = require('src/config/nlu')

module.exports = async (text) => {
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-07-12',
    authenticator: new IamAuthenticator({ apikey: config.apiKey }),
    url: config.url
  })

  const params = {
    text,
    features: {
      syntax: {
        sentences: true,
        tokens: {
          lemma: true,
          part_of_speech: true
        }
      },
      semantic_roles: {}
    }
  }

  return (await naturalLanguageUnderstanding.analyze(params)).result
}
