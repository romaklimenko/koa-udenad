const koa = require('koa')
const router = require('koa-router')()

const app = koa()

router.get('/', function* (next) {
  this.body = 'Hello root'
})

router.post('/session', function* (next) {
  this.body = 'returns a session key, sets a cookie'
})

router.delete('/session', function* (next) {
  this.body = 'deletes a session key from server'
})

router.post('/account', function* (next) {
  this.body = 'creates a new account'
})

router.put('/account', function* (next) {
  this.body = 'updates an account'
})

router.delete('/account', function* (next) {
  this.body = 'deletes an account'
})



app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
