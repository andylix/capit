import * as Parser from 'acorn-loose'
import fs from 'fs'
import path from 'path'
import prevent from './utils/prevent.js'
import convertProps from './convert/props.js'
import convertData from './convert/data.js'
import convertMethods from './convert/methods.js'

const N = '\n' // new line
const T = '  ' // tab

function template(content) {
  const filePath = path.resolve('./src', './template')
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

export default function parse(str) {
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
      prevent('PROPS_NOT_OBJECT', op.value.type !== 'ObjectExpression')
      convertProps(op, script, props => {
        out = { ...out, props }
      })
    }

    if(op.key.name === 'data') {
      prevent('DATA_NOT_FUNCTION', op.value.type !== 'FunctionExpression')
      convertData(op, script, function(refs, reactives) {
        out = { ...out, refs, reactives }
      })
    }

    if(op.key.name === 'methods') {
      prevent('METHODS_NOT_OBJECT', op.value.type !== 'ObjectExpression')
      convertMethods(op, script, function(methods, lifecycles, beforeCreate, created) {
        out = { ...out, methods, lifecycles, beforeCreate, created }
      })
    }

    if(op.key.name === 'computed') {
      prevent('COMPUTED_NOT_OBJECT', op.value.type !== 'ObjectExpression')
      console.log('computed ..')
    }
  })
  console.log(template(out))
}