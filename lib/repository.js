'use strict'

const assert = require('assert')
const bcrypt = require('./bcrypt')

class Repository {
  constructor(db) {
    this.db = db
  }

  users() { return this.db.collection('users') }

  createAccount(username, password) {
    return bcrypt.hash(password).then((hashed_password) => {
      return this.users().insertOne({
        username: username,
        password: hashed_password
      })
    })
  }

  getAccount(username) {
    return this.users().findOne({ username: username })
  }
}

module.exports = Repository
