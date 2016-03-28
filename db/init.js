const init = (db) => {
  return db.dropCollection('users')
    .then(() => {
      db.collection('users').createIndex(
        { username: 1 },
        { unique: true })
    })
}

module.exports = init
