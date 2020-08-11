/* eslint-disable no-unused-expressions */
const chai = require('chai')
const expect = chai.expect
const routes = require('src/routes').api
const listEndpoints = require('express-list-endpoints')

describe('Routes: Translate', () => {
  it('exports an express router', () => {
    expect(routes.stack).to.be.an('array')
  })

  it('defines restful CRUD for translate routes', () => {
    const methods = listEndpoints(routes)
      .reduce((methods, endpoint) => {
        methods[endpoint.path] = endpoint.methods
        return methods
      }, {})

    expect(methods['/translate']).to.deep.equal(['POST'])
  })
})
