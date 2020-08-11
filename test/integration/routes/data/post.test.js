const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const faker = require('faker')
const expect = chai.expect

const server = require('src/server')

const fakeData = { id: faker.random.number(), description: faker.lorem.sentence() }

describe('Routes: POST data', () => {
  it('returns ok', done => {
    chai.request(server)
      .post('/data')
      .send(fakeData)
      .end((err, res) => {
        expect(err).to.be.equal(null)
        expect(res).to.have.status(200)
        expect(res.body).to.be.deep.equal(fakeData)
        done()
      })
  })
})
