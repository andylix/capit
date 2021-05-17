import { source } from '../utils/source.js'

export default function convertProps(op, script, done) {
  const out = source(script, op)
  done(out)
}