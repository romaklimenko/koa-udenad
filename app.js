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

router.post('/login', function* (next) {
  this.assert(this.request.header.username, 'The parameter "username" must not be empty')
  this.assert(this.request.header.password, 'The parameter "password" must not be empty')
  this.body = 'logs user in'
})

router.post('/logout', function* (next) {
  this.body = 'logs user out'
})

router.post('/account', function* (next) {
  this.body = 'creates a new account'
})

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
