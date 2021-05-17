import * as Parser from 'acorn-loose'
import prevent from './utils/prevent.js'
import convertProps from './convert/props.js'
import convertData from './convert/data.js'
import convertMethods from './convert/methods.js'
import convertComputed from './convert/computed.js'
import render from './render/index.js'

export default function parse(script) {

  prevent('NO_CODE', script === '')

  const $ast = Parser.parse(script, {})
  const last = $ast.body.length-1
  const $export = $ast.body[last]

  prevent('NO_EXPORT', $export.type !== 'ExportDefaultDeclaration')

  const $declaration = $export.declaration

  prevent('NO_OBJECT', $declaration.type !== 'ObjectExpression')

  const $properties = $declaration.properties

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

  $properties.forEach($node => {

    if($node.key.name === 'props') {
      prevent('PROPS_NOT_OBJECT', $node.value.type !== 'ObjectExpression')
      convertProps($node, script, props => {
        out.props = props
      })
    }

    if($node.key.name === 'data') {
      prevent('DATA_NOT_FUNCTION', $node.value.type !== 'FunctionExpression')
      convertData($node, script, function(refs, reactives, returnables) {
        out.refs = refs
        out.reactives = reactives
        out.returnRefsReactives = returnables
      })
    }

    if($node.key.name === 'computed') {
      prevent('COMPUTED_NOT_OBJECT', $node.value.type !== 'ObjectExpression')
      convertComputed($node, script, function(computed, returnables) {
        out.computed = computed
        out.returnComputed = returnables
      })
    }

    if($node.key.name === 'methods') {
      prevent('METHODS_NOT_OBJECT', $node.value.type !== 'ObjectExpression')
      convertMethods($node, script, function(methods, lifecycles, beforeCreate, created, returnables) {
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