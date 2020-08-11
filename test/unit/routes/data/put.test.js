/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const faker = require('faker')
const putRoute = require('src/routes/data/put')
const Data = require('src/models/data')

describe('Routes: PUT data/{:id}', () => {
  beforeEach(() => {
    const data = new Data({
      id: faker.random.number,
      description: faker.lorem.sentence
    })
    this.req = { body: data }
    this.res = {}
    this.nextStub = sinon.stub()
  })

  describe('when the request is successful', () => {
    beforeEach(() => {
      return putRoute(this.req, this.res, this.nextStub)
    })

    it('sets res.locals to expected response', () => {
      expect(this.res.locals).to.be.deep.equal(this.req.body)
    })

    it('continues the request pipeline', () => {
      expect(this.nextStub).to.have.been.called
    })
  })
})
