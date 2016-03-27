const assert = require('assert')
const bcrypt = require('../../lib/bcrypt')

const password = 'passw0rd'
const wrong_password = 'passw0rD'

describe('lib/bcrypt', () => {
  describe('compare(password, hash)', () => {
    it('should compare correct password with hash and return true', () => {
      return bcrypt.hash(password).then((hashed_password) => {
        return bcrypt.compare(password, hashed_password).then((result) => {
          assert.equal(result, true)
        })
      })
    })

    it('should compare incorrect password with hash and return false', () => {
      return bcrypt.hash(password).then((hashed_password) => {
        return bcrypt.compare(wrong_password, hashed_password).then((result) => {
          assert.equal(result, false)
        })
      })
    })
  })

  describe('hash(password)', () => {
    it('should hash password', () => {
      return bcrypt.hash(password).then((hashed_password) => {
        return bcrypt.compare(password, hashed_password).then((result) => {
          assert.equal(result, true)
        })
      })
    })
  })
})
