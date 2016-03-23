const assert = require('assert')
const http = require('http')
const request = require('supertest')

const appFactory = require('../app')

describe('app', () => {
  describe('GET /', () => {
    it('should response with status 200', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .get('/')
        .expect(200, done)
    })
  })

  describe('GET /session', () => {
    it('should response with status 405 "Method Not Allowed"', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .get('/session')
        .expect(405, done)
    })
  })

  describe('POST /session', () => {
    xit('should response with status 200', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .post('/session')
        .expect(200, done)
    })
  })

  describe('DELETE /session', () => {
    xit('should response with status 200', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .delete('/session')
        .expect(200, done)
    })
  })

  describe('POST /account', () => {
    xit('should response with status 200', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .post('/account')
        .expect(200, done)
    })
  })

  describe('PUT /account', () => {
    xit('should response with status 200', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .put('/account')
        .expect(200, done)
    })
  })

  describe('DELETE /account', () => {
    xit('should response with status 200', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .delete('/account')
        .expect(200, done)
    })
  })

  // POST /account - creates a new account
  //  PUT /account - updates an account
  //  DELETE /account - deletes an account

})
