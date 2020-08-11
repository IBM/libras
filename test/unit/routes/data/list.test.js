/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const listRoute = require('src/routes/data/list')

describe('Routes: GET data', () => {
  beforeEach(() => {
    this.req = {}
    this.res = {}
    this.nextStub = sinon.stub()
  })

  describe('when the request is successful', () => {
    beforeEach(() => {
      return listRoute(this.req, this.res, this.nextStub)
    })

    it('sets res.locals to expected response', () => {
      expect(this.res.locals).to.be.deep.equal([])
    })

    it('continues the request pipeline', () => {
      expect(this.nextStub).to.have.been.called
    })
  })
})
