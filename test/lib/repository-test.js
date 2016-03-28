'use strict'

const assert = require('assert')
const MongoClient = require('mongodb').MongoClient

const Repository = require('../../lib/repository')
const init = require('../../db/init')

const url = 'mongodb://localhost:27017/udenad_test'

describe('lib/db', () => {
  let repository
  const username = 'søren'
  const password = 'kirkegaard'
  const wrong_password = 'kirkegAard'

  before((done) => {
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err)
      repository = new Repository(db)
      done()
    })
  })

  beforeEach(() => {
    return init(repository.db)
  })

  after(() => {
    repository.db.close()
  })

  describe('checkAccount(username, password)', () => {
    it('should return true if username and password are correct', () => {
      return repository.createAccount(username, password).then((user) => {
        return repository.checkAccount(username, password).then((result) => {
          assert.equal(result, true)
        })
      })
    })

    it('should return false if password is not correct', () => {
      return repository.createAccount(username, password).then((user) => {
        return repository.checkAccount(username, wrong_password).then((result) => {
          assert.equal(result, false)
        })
      })
    })

    it('should return false if user does not exist', () => {
      return repository.checkAccount(username, password).then((result) => {
        assert.equal(result, false)
      })
    })
  })

  describe('createAccount(username, password)', () => {
    it('should create a new account', () => {
      return repository.createAccount(username, password).then((value) => {
        return repository.users.findOne({ username: username }).then((user) => {
          assert.equal(user._id.toString(), value.insertedId)
        })
      })
    })

    it('should not create an account if such username already exists', () => {
      const db_name = repository.db.databaseName
      return repository.createAccount(username, password).then(() => {
        return repository.createAccount(username, password)
          .then(() => { assert.fail('Two users with the same username!') })
          .catch((reason) => {
            assert.equal(
              reason.message,
              `E11000 duplicate key error index: ${db_name}.users.$username_1 dup key: { : "${username}" }`)
          })
      })
    })

    xit('should check for all necessary parameters', () => { })
  })

  describe('getAccount(name)', () => {
    it('should get account by name', () => {
      const account0 = repository.createAccount('admin', 'b')
      const account1 = repository.createAccount(username, password)
      const account2 = repository.createAccount('user', 'u')

      return Promise.all([account0, account1, account2]).then(() => {
        return repository.getAccount(username).then((user) => {
          assert.equal(user.username, username)
        })
      })
    })

    it('should get null if user does not exist', () => {
      const account0 = repository.createAccount('admin', 'b')
      const account1 = repository.createAccount(username, password)
      const account2 = repository.createAccount('user', 'u')

      return Promise.all([account0, account1, account2]).then(() => {
        return repository.getAccount('fantomas').then((user) => {
          assert.equal(user, null)
        })
      })
    })
  })
})
