module.exports = (tokens) => {
  const textMap = {}
  for (let i = 0; i < tokens.length; i++) {
    let part = ''

    let wordsSet = {}
    const partOfSpeech = tokens[i].part_of_speech

    const text = tokens[i].lemma || tokens[i].text

    if (!Object.prototype.hasOwnProperty.call(textMap, partOfSpeech)) {
      wordsSet = {}
      textMap[partOfSpeech] = wordsSet
    } else {
      wordsSet = textMap[partOfSpeech]
    }

    if (!Object.prototype.hasOwnProperty.call(wordsSet, text)) {
      const id = Object.keys(wordsSet).length

      part = partOfSpeech + id
      wordsSet[text] = part
    } else {
      part = wordsSet[text]
    }
  }
  return textMap
}
