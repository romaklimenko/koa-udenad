'use strict'

const assert = require('assert')
const bcrypt = require('./bcrypt')

class Repository {
  constructor(db) {
    this.db = db
  }

  get users() { return this.db.collection('users') }

  checkAccount(username, password) {
    return this.getAccount(username).then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password).then((result) => {
          return result
        })
      }
      return false
    })
  }

  createAccount(username, password) {
    return bcrypt.hash(password).then((hashed_password) => {
      return this.users.insertOne({
        username: username,
        password: hashed_password
      })
    })
  }

  getAccount(username) {
    return this.users.findOne({ username: username })
  }
}

module.exports = Repository
