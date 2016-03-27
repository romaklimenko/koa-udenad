'use strict'

const assert = require('assert')
const bcrypt = require('./bcrypt')

class Repository {
  constructor(db) {
    this.db = db
  }

  createAccount(username, password) {
    return bcrypt.hash(password).then((hashed_password) => {
      return this.db.collection('users').insertOne({
        username: username,
        password: hashed_password
      })
    })
  }

  getAccount() {
    // read
  }

  updateAccount() {
    // update
  }

  deleteAccount() {
    // delete
  }

}
module.exports = Repository
