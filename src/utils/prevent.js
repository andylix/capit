module.exports = function prevent(key, cond) {
  if(!cond) { return }
  const messages = {
    'NOT_DATA_OBJECT': 'data() has to return an object literal',
    'NOT_RETURN': 'only a return statement is needed in data()',
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