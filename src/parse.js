const Parser = require('acorn-loose')
const fs = require('fs')
const path = require('path')
const prevent = require('./utils/prevent')
const convertProps = require('./convert/props')
const convertData = require('./convert/data')
const convertMethods = require('./convert/methods')

const N = '\n' // new line
const T = '  ' // tab

function template(content) {
  const filePath = path.resolve(__dirname, './template')
  let tmpl = fs.readFileSync(filePath, 'utf8')
  let out = tmpl.replace('${props}', content.props)
  out = out.replace('${methods}', content.methods)
  out = out.replace('${beforeCreate}', content.beforeCreate)
  out = out.replace('${created}', content.created)
  out = out.replace('${lifecycles}', content.lifecycles)
  out = out.replace('${refs}', content.refs)
  out = out.replace('${reactives}', content.reactives)
  return out
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
    reactives: '', refs: '', methods: '', computed: '', props: '', lifecycles: '', beforeCreate: '', created: ''
  }

  properties.forEach(op => {

    if(op.key.name === 'props') {
      convertProps(op, script, props => {
        out.props = props
      })
    }

    // traverse data
    if(op.key.name === 'data' && op.value.type === 'FunctionExpression') {
      convertData(op, script, function(refs, reactives) {
        out.refs = refs
        out.reactives = reactives
      })
    }

    // traverse methods
    if(op.key.name === 'methods' && op.value.type === 'ObjectExpression') {
      convertMethods(op, script, function(methods, lifecycles, beforeCreate, created) {
        out.methods = methods
        out.lifecycles = lifecycles
        out.beforeCreate = beforeCreate
        out.created = created
      })
    }

    if(op.key.name === 'computed') {
      console.log('computed ..')
    }
  })
  console.log(template(out))
}