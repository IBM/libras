const chai = require('chai')
const expect = chai.expect
const swaggerSpec = require('src/swagger')

describe('Swagger', () => {
  it('sets base config', () => {
    expect(swaggerSpec).to.be.an('object')
    expect(swaggerSpec.openapi).to.be.equal('3.0.0')
    expect(swaggerSpec.info.title).to.be.a('string')
    expect(swaggerSpec.info.version).to.be.equal('1.0.0')
    expect(swaggerSpec.info.description).to.be.a('string')
  })
})
