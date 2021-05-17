export default function prevent(id, cond) {
  if(!cond) { return }
  const errorMessages = {
    'DATA_NOT_FUNCTION': 'the data property needs to be a function',
    'PROPS_NOT_OBJECT': 'the props property needs to be an object',
    'METHODS_NOT_OBJECT': 'the methods property needs to be an object',
    'COMPUTED_NOT_OBJECT': 'the computed property needs to be an object',
    'DATA_NOT_RETURNING_OBJECT': 'data() has to return an object literal',
    'DATA_NOT_RETURNING': 'only a single return statement is allowed in data()',
    'NO_CONTENT': 'no content in the file',
    'NO_SCRIPT': 'no <script> found',
    'NO_CODE': 'no code in <script>',
    'NO_EXPORT': 'need export default',
    'NO_OBJECT': 'need to export an object literal',
  }
  const message = errorMessages[id]
  const RED = "\x1b[31m"
  const END = "\x1b[0m"
  console.log(RED+"%s"+END, 'Parser Error: ' + message);
  throw new Error()
}