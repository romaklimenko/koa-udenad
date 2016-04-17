const config = {}

config.db_url = process.env.NODE_ENV ?
  `mongodb://localhost:27017/udenad_${process.env.NODE_ENV}` :
  'mongodb://localhost:27017/udenad_test'

config.keys = ['Næ næ næ næ næ, det må vi ikke']

module.exports = config
