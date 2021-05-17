module.exports = function prevent(key, cond) {
  if(!cond) { return }
  const errorMessages = {
    'DATA_NOT_FUNCTION': 'the data property needs to be a function',
    'PROPS_NOT_OBJECT': 'the props property needs to be an object',
    'METHODS_NOT_OBJECT': 'the methods property needs to be an object',
    'COMPUTED_NOT_OBJECT': 'the computed property needs to be an object',
    'DATA_NOT_RETURNING_OBJECT': 'data() has to return an object literal',
    'DATA_NOT_RETURNING': 'only a return statement is needed in data()',
    'NO_CONTENT': 'no content in the file',
    'NO_SCRIPT': 'no <script> found',
    'NO_CODE': 'no code in <script>',
    'NO_EXPORT': 'need export default',
    'NO_OBJECT': 'need to export an object literal',
  }
  const message = errorMessages[key]
  console.log('parser error: ' + message)
  throw new Error()
}