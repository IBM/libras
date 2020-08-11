/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const router = require('src/routes/data')
const listEndpoints = require('express-list-endpoints')

describe('Routes: Data', () => {
  it('exports an express router', () => {
    expect(router.stack).to.be.an('array')
  })

  it('defines restful CRUD for data routes', () => {
    const methods = listEndpoints(router)
      .reduce((methods, endpoint) => {
        methods[endpoint.path] = endpoint.methods
        return methods
      }, {})

    expect(methods['/data']).to.deep.equal(['GET', 'POST'])
    expect(methods['/data/:id']).to.deep.equal(['GET', 'PUT', 'DELETE'])
  })
})
