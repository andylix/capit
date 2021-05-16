const Parser = require('acorn-loose');
const fs = require('fs')

const T = '  '

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

function source(script, node) {
  return script.substring(node.start, node.end)
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

let out = {
  data: '', methods: '', computed: '', props: ''
}

properties.forEach(op => {
  if(op.key.name === 'props') {
    const props = source(script, op)
    out.props = props
  }
  if(op.key.name === 'data') {
    console.log('data ..')
  }
  if(op.key.name === 'methods') {
    console.log('methods ..')
  }
  if(op.key.name === 'computed') {
    console.log('computed ..')
  }
})

function template(content) {
  return `export default {
  ${content.props}
  setup {
    
  }
}
` 
}

console.log(template(out))