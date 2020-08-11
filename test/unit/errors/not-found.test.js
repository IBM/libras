const chai = require('chai')
const expect = chai.expect
const httpStatus = require('http-status')
const NotFoundError = require('src/errors/not-found')
const localization = require('src/localization')

describe('Errors: Not Found', () => {
  beforeEach(() => {
    this.error = new NotFoundError()
  })

  it('extends from Error', () => {
    expect(this.error).to.be.instanceof(Error)
  })

  it('sets error name from constructor', () => {
    expect(this.error.name).to.be.equal('NotFoundError')
  })

  it('sets error message', () => {
    expect(this.error.message).to.be.equal(localization.errors.notFound())
  })

  it('sets error status code to not found', () => {
    expect(this.error.statusCode).to.be.equal(httpStatus.NOT_FOUND)
  })
})
