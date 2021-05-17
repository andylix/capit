import * as Parser from 'acorn-loose'
import fs from 'fs'
import path from 'path'
import prevent from './utils/prevent.js'
import convertProps from './convert/props.js'
import convertData from './convert/data.js'
import convertMethods from './convert/methods.js'
import convertComputed from './convert/computed.js'

const COMMA = ','

function template(content) {
  const filePath = path.resolve('./src', './template')
  let tmpl = fs.readFileSync(filePath, 'utf8')
  let out = tmpl

  if(content.props !== null) {
    out = out.replace('${props}', content.props + COMMA)
  }
  else {
    out = out.replace('${props}', '')
  }

  if(content.refs !== null) {
    out = out.replace('${refs}', content.refs)
  }
  if(content.reactives !== null) {
    out = out.replace('${reactives}', content.reactives)
  }
  if(content.methods !== null) {
    out = out.replace('${methods}', content.methods)
  }
  if(content.lifecycles !== null) {
    out = out.replace('${lifecycles}', content.lifecycles)
  }
  if(content.beforeCreate !== null) {
    out = out.replace('${beforeCreate}', content.beforeCreate)
  }
  if(content.created !== null) {
    out = out.replace('${created}', content.created)
  }
  if(content.computed !== null) {
    out = out.replace('${computed}', content.computed)
  }
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
    props: null,
    reactives: null, 
    refs: null, 
    methods: null,
    lifecycles: null,
    beforeCreate: null, 
    created: null, 
    computed: null  
  }

  properties.forEach(op => {

    if(op.key.name === 'props') {
      prevent('PROPS_NOT_OBJECT', op.value.type !== 'ObjectExpression')
      convertProps(op, script, props => {
        out.props = props
      })
    }

    if(op.key.name === 'data') {
      prevent('DATA_NOT_FUNCTION', op.value.type !== 'FunctionExpression')
      convertData(op, script, function(refs, reactives) {
        out.refs = refs
        out.reactives = reactives
      })
    }

    if(op.key.name === 'methods') {
      prevent('METHODS_NOT_OBJECT', op.value.type !== 'ObjectExpression')
      convertMethods(op, script, function(methods, lifecycles, beforeCreate, created) {
        out.methods = methods
        out.lifecycles = lifecycles
        out.beforeCreate = beforeCreate
        out.created = created
      })
    }

    if(op.key.name === 'computed') {
      prevent('COMPUTED_NOT_OBJECT', op.value.type !== 'ObjectExpression')
      convertComputed(op, script, function(computed) {
        out.computed = computed
      })
    }
  })
  console.log(template(out))
}