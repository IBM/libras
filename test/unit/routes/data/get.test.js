/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const faker = require('faker')
const getRoute = require('src/routes/data/get')

describe('Routes: GET data/{:id}', () => {
  beforeEach(() => {
    this.req = { params: { id: faker.random.number() } }
    this.res = {}
    this.nextStub = sinon.stub()
  })

  describe('when the request is successful', () => {
    beforeEach(() => {
      return getRoute(this.req, this.res, this.nextStub)
    })

    it('sets res.locals to expected response', () => {
      expect(this.res.locals).to.be.deep.equal({ id: this.req.params.id })
    })

    it('continues the request pipeline', () => {
      expect(this.nextStub).to.have.been.called
    })
  })
})
