const assert = require('assert')
const bcrypt = require('../../lib/bcrypt')
const _bcrypt = require('bcrypt')

const password = 'passw0rd'
const wrong_password = 'passw0rD'

describe('lib/bcrypt', () => {
  describe('compare(password, hash)', () => {
    it('should compare correct password with hash and return true', (done) => {
      _bcrypt.hash(password, 10, (err, hash) => {
        bcrypt.compare(password, hash).then((value) => {
          assert.equal(value, true)
          done()
        })
      })
    }),

    it('should compare incorrect password with hash and return false', (done) => {
      _bcrypt.hash(wrong_password, 10, (err, hash) => {
        bcrypt.compare(password, hash).then((value) => {
          assert.equal(value, false)
          done()
        })
      })
    })
  })

  describe('hash(password)', () => {
    it('should hash password', (done) => {
      bcrypt.hash(password).then((value) => {
        _bcrypt.compare(password, value, (err, res) => {
          assert.equal(err, undefined)
          assert.equal(res, true)
          done()
        })
      })
    })
  })
})
