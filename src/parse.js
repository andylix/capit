const Parser = require('acorn-loose')
const fs = require('fs')
const path = require('path')
const prevent = require('./utils/prevent')

const T = '  '

function source(script, node) {
  return script.substring(node.start, node.end)
}

function template(content) {
  const filePath = path.resolve(__dirname, './template')
  const tmpl = fs.readFileSync(filePath, 'utf8')
  return tmpl.replace('${props}', content.props)
}

module.exports = function parse(str) {
  const splits = str.split(/<script.*\>/)

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
  console.log(template(out))
}