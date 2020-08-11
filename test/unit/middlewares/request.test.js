/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const faker = require('faker')
const requestMiddleware = require('src/middlewares/request')

describe('Middlewares: Request', () => {
  beforeEach(() => {
    this.req = {
      path: faker.lorem.word(),
      body: {
        id: faker.random.number(),
        description: faker.lorem.sentence()
      }
    }
    this.res = {}
    this.nextStub = sinon.stub()
  })

  describe('when processing request', () => {
    it('continues the request pipeline', () => {
      requestMiddleware(this.req, this.res, this.nextStub)
      expect(this.nextStub).to.have.been.called
    })
  })
})
