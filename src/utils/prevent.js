module.exports = function prevent(key, cond) {
  if(!cond) { return }
  const messages = {
    'NO_CONTENT': 'no content in the file',
    'NO_SCRIPT': 'no <script> found',
    'NO_CODE': 'no code in <script>',
    'NO_EXPORT': 'need export default',
    'NO_OBJECT': 'need to export an object literal',
  }
  const message = messages[key]
  console.log('parser error: ' + message)
  throw new Error()
}