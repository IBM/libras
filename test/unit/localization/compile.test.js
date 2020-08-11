/* eslint-disable no-template-curly-in-string */

const chai = require('chai')
const expect = chai.expect
const faker = require('faker')
const compile = require('src/localization/compile')

const randomName = faker.name.firstName()
const randomSentence = faker.lorem.sentence()
const randomWord = faker.lorem.word()

describe('Localization', () => {
  before(() => {
    this.compiled = compile({
      hello: 'Hello, ${person}!',
      sentence: randomSentence,
      one: {
        two: {
          three: '${word}'
        }
      }
    })
  })

  it('compiles template', () => {
    const subject = this.compiled.hello({ person: randomName })
    expect(subject).to.equal(`Hello, ${randomName}!`)
  })

  it('compiles multi level templates', () => {
    const subject = this.compiled.one.two.three({ word: randomWord })
    expect(subject).to.equal(randomWord)
  })

  it('compiles text', () => {
    const subject = this.compiled.sentence()
    expect(subject).to.equal(randomSentence)
  })
})
