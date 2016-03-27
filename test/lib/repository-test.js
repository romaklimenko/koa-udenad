'use strict'

const assert = require('assert')
const MongoClient = require('mongodb').MongoClient

const Repository = require('../../lib/repository')

const url = 'mongodb://localhost:27017/udenad_test'

describe('lib/db', () => {
  let repository
  const username = 'søren'
  const password = 'kirkegaard'

  before((done) => {
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err)
      repository = new Repository(db)
      done()
    })
  })

  beforeEach(() => {
    repository.db.collection('users').remove({})
  })

  after(() => {
    repository.db.close()
  })

  describe('createAccount(username, password)', () => {
    it('should create a new account', () => {
      const users = repository.db.collection('users')
      return repository.createAccount(username, password).then((value) => {
        return users.findOne({ username: username }).then((user) => {
          assert.equal(user._id.toString(), value.insertedId)
        })
      })
    })
  })
})
