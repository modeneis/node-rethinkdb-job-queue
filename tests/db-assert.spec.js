const test = require('tape')
const Promise = require('bluebird')
const tError = require('./test-error')
const dbAssert = require('../src/db-assert')
const dbDriver = require('../src/db-driver')
const tOpts = require('./test-options')

module.exports = function () {
  const q = {
    r: dbDriver(tOpts.cxn()),
    db: tOpts.dbName,
    name: tOpts.queueName,
    id: 'mock:queue:id'
  }

  return new Promise((resolve, reject) => {
    test('db-assert', (t) => {
      t.plan(1)

      return dbAssert(q).then((dbResult) => {
        t.ok(dbResult, 'All database resources asserted')
        q.r.getPoolMaster().drain()
        return resolve(t.end())
      }).catch(err => tError(err, module, t))
    })
  })
}
