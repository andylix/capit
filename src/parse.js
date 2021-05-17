import * as Parser from 'acorn-loose'
import prevent from './utils/prevent.js'
import convertProps from './convert/props.js'
import convertData from './convert/data.js'
import convertMethods from './convert/methods.js'
import convertComputed from './convert/computed.js'
import render from './render/index.js'

export default function parse(script) {

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
    computed: null,
    returnRefsReactives: [],
    returnComputed: [],
    returnMethods: [],
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
      convertData(op, script, function(refs, reactives, returnables) {
        out.refs = refs
        out.reactives = reactives
        out.returnRefsReactives = returnables
      })
    }

    if(op.key.name === 'computed') {
      prevent('COMPUTED_NOT_OBJECT', op.value.type !== 'ObjectExpression')
      convertComputed(op, script, function(computed, returnables) {
        out.computed = computed
        out.returnComputed = returnables
      })
    }

    if(op.key.name === 'methods') {
      prevent('METHODS_NOT_OBJECT', op.value.type !== 'ObjectExpression')
      convertMethods(op, script, function(methods, lifecycles, beforeCreate, created, returnables) {
        out.methods = methods
        out.lifecycles = lifecycles
        out.beforeCreate = beforeCreate
        out.created = created
        out.returnMethods = returnables
      })
    }
  })

  return render(out)
}