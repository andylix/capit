const Parser = require('acorn-loose')
const fs = require('fs')
const path = require('path')
const prevent = require('./utils/prevent')
const newFuncName = require('./utils/newFuncName')

const T = '  '

function source(script, node) {
  return script.substring(node.start, node.end)
}

function template(content) {
  const filePath = path.resolve(__dirname, './template')
  let tmpl = fs.readFileSync(filePath, 'utf8')
  let out = tmpl.replace('${props}', content.props)
  out = out.replace('${methods}', content.methods)
  out = out.replace('${beforeCreate}', content.beforeCreate)
  out = out.replace('${created}', content.created)
  out = out.replace('${lifecycles}', content.lifecycles)
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
    data: '', methods: '', computed: '', props: '', lifecycles: '', beforeCreate: '', created: ''
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
      let allMethodsOut = []
      let allLifecyclesOut = []

      if(op.value.type === 'ObjectExpression'){
        const methods = op.value.properties

        methods.forEach(node => {

          const isShorthand = node.method

          let funcName = newFuncName(node.key.name)
          let funcBody = source(script, node.value)

          if(!isShorthand) {
            funcBody = funcBody.replace(/^function\s*/, '')
          }

          let methodOut = ''
          let lifecycleOut = ''

          // GENERATE OUTPUT
          
          if(['onBeforeMount', 'onMounted', 'onBeforeUpdate', 'onUpdated', 'onBeforeUnmount', 
              'onUnmounted', 'onErrorCaptured', 'onRenderTracked', 'onRenderTriggered'].indexOf(funcName) > -1) {
            lifecycleOut = `${funcName}(function${funcBody})`
          }
          else if(funcName === 'beforeCreate') {
            out.beforeCreate = `(function beforeCreate${funcBody})()`
          }
          else if(funcName === 'created') {
            out.created = `(function created${funcBody})()`
          }
          else { // other methods
            methodOut = `function ${funcName}${funcBody}`
          }

          if(methodOut !== '') {
            allMethodsOut.push(methodOut)
          }
          
          if(lifecycleOut !== '') {
            allLifecyclesOut.push(lifecycleOut)
          }
        })// end forEach
      } // end if ObjectExpression

      out.methods = allMethodsOut.join('\n\n'+T+T)
      out.lifecycles = allLifecyclesOut.join('\n\n'+T+T)
    } // end if methods
    if(op.key.name === 'computed') {
      console.log('computed ..')
    }
  })
  console.log(template(out))
}