module.exports = (tokens, textMap) => {
  return tokens
    .map(token => {
      const partOfSpeech = token.part_of_speech
      const text = token.lemma || token.text
      const part = textMap[partOfSpeech][text]
      return part
    })
    .join('_')
}
