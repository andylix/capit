import { source } from '../utils/source.js'

export default function convertProps($property, script, done) {
  done(source(script, $property))
}