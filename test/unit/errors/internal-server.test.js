const chai = require('chai')
const expect = chai.expect
const httpStatus = require('http-status')
const InternalServerError = require('src/errors/internal-server')
const localization = require('src/localization')

describe('Errors: Internal Server', () => {
  beforeEach(() => {
    this.error = new InternalServerError()
  })

  it('extends from Error', () => {
    expect(this.error).to.be.instanceof(Error)
  })

  it('sets error name from constructor', () => {
    expect(this.error.name).to.be.equal('InternalServerError')
  })

  it('sets error message', () => {
    expect(this.error.message).to.be.equal(localization.errors.internalServer())
  })

  it('sets error status code to not found', () => {
    expect(this.error.statusCode).to.be.equal(httpStatus.INTERNAL_SERVER_ERROR)
  })
})
