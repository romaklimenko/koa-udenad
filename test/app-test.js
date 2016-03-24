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

  describe('GET /login', () => {
    it('should response with status 405 "Method Not Allowed"', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .get('/login')
        .expect(405, done)
    })
  })

  describe('POST /login', () => {
    xit('should response with status 200', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .post('/login')
        .expect(200, done)
    })
  })

  describe('POST /logout', () => {
    xit('should response with status 200', (done) => {
      const app = appFactory
      request(http.createServer(app.callback()))
        .post('/logout')
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
})
