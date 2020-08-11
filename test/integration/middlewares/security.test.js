const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect

const server = require('src/server')
let headers

describe('Security Headers', () => {
  before(done => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.equal(null)
        expect(res).to.have.status(200)
        headers = res.headers
        done()
      })
  })

  it('Prevents cross-site scripting and injections', () => {
    expect(headers).to.have.property('content-security-policy')
    expect(headers).to.have.property('x-content-security-policy')
    expect(headers).to.have.property('x-webkit-csp')
  })

  it('Disables browser\'s DNS prefetching', () => {
    expect(headers).to.have.property('x-dns-prefetch-control')
    expect(headers['x-dns-prefetch-control']).to.be.equal('off')
  })

  it('Mitigates clickjacking attacks', () => {
    expect(headers).to.have.property('x-frame-options')
    expect(headers['x-frame-options']).to.be.equal('SAMEORIGIN')
  })

  it('Hides powered-by', () => {
    expect(headers).to.not.have.property('x-powered-by')
  })

  it('Enables HTTP strict transport security (HSTS)', () => {
    expect(headers).to.have.property('strict-transport-security')
  })

  it('Prevents Internet Explorer from downloading site\'s context', () => {
    expect(headers).to.have.property('x-download-options')
    expect(headers['x-download-options']).to.be.equal('noopen')
  })

  it('Prevents MIME-sniffing', () => {
    expect(headers).to.have.property('x-content-type-options')
    expect(headers['x-content-type-options']).to.be.equal('nosniff')
  })

  it('Enables cross-site scripting (XSS) filter', () => {
    expect(headers).to.have.property('x-xss-protection')
    expect(headers['x-xss-protection']).to.be.equal('1; mode=block')
  })
})
