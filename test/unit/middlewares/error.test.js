/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))
const faker = require('faker')
const httpStatus = require('http-status')
const errorMiddleware = require('src/middlewares/error')

describe('Middlewares: Error', () => {
  beforeEach(() => {
    this.error = {
      name: faker.lorem.word(),
      description: faker.lorem.sentence()
    }
    this.res = {}
    this.nextStub = sinon.stub()
  })

  describe('when processing a known error', () => {
    it('sets response with error status code', () => {
      this.error.statusCode = httpStatus.NOT_FOUND
      errorMiddleware(this.error, null, this.res, this.nextStub)
      expect(this.res.statusCode).to.equal(this.error.statusCode)
    })
    it('sets error output content', () => {
      errorMiddleware(this.error, null, this.res, this.nextStub)
      expect(this.res.locals).to.deep.equal(this.error)
    })
    it('continues the request pipeline', () => {
      errorMiddleware(this.error, null, this.res, this.nextStub)
      expect(this.nextStub).to.have.been.called
    })
  })

  describe('when processing an unknown error', () => {
    it('sets response status code to internal server error', () => {
      errorMiddleware(this.error, null, this.res, this.nextStub)
      expect(this.res.statusCode).to.equal(httpStatus.INTERNAL_SERVER_ERROR)
    })
    it('continues the request pipeline', () => {
      errorMiddleware(this.error, null, this.res, this.nextStub)
      expect(this.nextStub).to.have.been.called
    })
  })
})
