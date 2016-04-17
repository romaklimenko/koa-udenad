const config = require('./config')
const koa = require('koa')
const MongoClient = require('mongodb').MongoClient
const mongo = require('koa-mongo');
const router = require('koa-router')()
const session = require('koa-session')

const app = koa()

app.use(mongo({
  uri: config.db_url,
  max: 100,
  min: 1,
  timeout: 10,
  log: false
}))

app.use(function *(next){
  // this is how we access database in middleware
  // this.mongo.collection('users').findOne({}, (err, doc) => {
  //   console.log(doc)
  // })
  const start = new Date
  yield next
  const ms = new Date - start
  console.log('%s %s - %s', this.method, this.url, ms)
})

// session
app.keys = config.keys
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
