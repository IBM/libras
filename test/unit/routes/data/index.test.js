/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const routes = require('src/routes').api
const listEndpoints = require('express-list-endpoints')

describe('Routes: Data', () => {
  it('exports an express router', () => {
    expect(routes.stack).to.be.an('array')
  })

  it('defines restful CRUD for data routes', () => {
    const methods = listEndpoints(routes)
      .reduce((methods, endpoint) => {
        methods[endpoint.path] = endpoint.methods
        return methods
      }, {})

    expect(methods['/data']).to.deep.equal(['POST'])
    // expect(methods['/data/:id']).to.deep.equal(['GET', 'PUT', 'DELETE'])
  })
})
