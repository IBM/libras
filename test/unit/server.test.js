const chai = require('chai')
const expect = chai.expect
const server = require('src/server')

describe('Server', () => {
  it('enables JSON parser middleware', () => {
    const jsonParser = getMiddleware('jsonParser')
    expect(jsonParser).to.be.an('object')
    expect(jsonParser.handle.name).to.be.equal('jsonParser')
  })
  it('enables URL encoder parser middleware', () => {
    const urlencodedParser = getMiddleware('urlencodedParser')
    expect(urlencodedParser).to.be.an('object')
    expect(urlencodedParser.handle.name).to.be.equal('urlencodedParser')
  })
  it('enables router middleware', () => {
    const router = getMiddleware('router')
    expect(router).to.be.an('object')
    expect(router.handle.name).to.be.equal('router')
  })
  it('enables request middleware', () => {
    const request = getMiddleware('request')
    expect(request).to.be.an('object')
    expect(request.handle.name).to.be.equal('request')
  })
  it('enables error middleware', () => {
    const error = getMiddleware('error')
    expect(error).to.be.an('object')
    expect(error.handle.name).to.be.equal('error')
  })
  it('enables response middleware', () => {
    const response = getMiddleware('response')
    expect(response).to.be.an('object')
    expect(response.handle.name).to.be.equal('response')
  })
})

function getMiddleware (name) {
  return server._router.stack.find(layer => layer.name === name)
}
