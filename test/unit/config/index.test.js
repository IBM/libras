const chai = require('chai')
const expect = chai.expect
const config = require('src/config')

describe('Config', () => {
  it('sets default values for server', () => {
    expect(config).to.have.property('server')
    expect(config.server).to.have.property('clusterMode')
    expect(config.server).to.have.property('port')
  })

  it('sets default values for logger', () => {
    expect(config).to.have.property('logger')
    expect(config.logger).to.have.property('enabled')
    expect(config.logger).to.have.property('level')
    expect(config.logger).to.have.property('directory')
    expect(config.logger).to.have.property('maxSize')
    expect(config.logger).to.have.property('maxFiles')
  })
})
