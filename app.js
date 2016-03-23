const koa = require('koa')
const router = require('koa-router')()
const session = require('koa-session')

const app = koa()

// session
app.keys = ['Næ næ næ næ næ, det må vi ikke']
app.use(session(app))


// router
router.get('/', function* (next) {
  if (this.path === '/favicon.ico') return
  const n = this.session.views || 0
  this.session.views = ++n
  this.body = n + ' views'
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
