const Parser = require('acorn-loose');
const fs = require('fs')

function prevent(key, cond) {
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

const file = fs.readFileSync('./MyComponent.vue', 'utf8')
const splits = file.split(/<script.*\>/)

prevent('NO_SCRIPT', splits.length === 1)

let script = splits[1].split('</script>')[0].trim()

prevent('NO_CODE', script === '')

const ast = Parser.parse(script, {})
const lastNode = ast.body[ast.body.length-1]

prevent('NO_EXPORT', lastNode.type !== 'ExportDefaultDeclaration')

const declaration = lastNode.declaration

prevent('NO_OBJECT', declaration.type !== 'ObjectExpression')

const properties = declaration.properties

properties.forEach(op => {
  console.log(op.key)
})