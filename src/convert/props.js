const { source } = require('../utils/source')

module.exports = function convertProps(op, script, done) {
  const out = source(script, op)
  done(out)
}