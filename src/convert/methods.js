import { sourceFuncBody } from '../utils/source.js'
import newFuncName from '../utils/newFuncName.js'

const N = '\n' // new line
const T = '  ' // tab

export default function convertMethods(op, script, done) {

  let allMethodsOut = []
  let allLifecyclesOut = []
  let beforeCreateOut = ''
  let createdOut = ''

  const methods = op.value.properties

  methods.forEach(node => {

    let funcName = newFuncName(node.key.name)
    let funcBody = sourceFuncBody(script, node)

    let methodOut = ''
    let lifecycleOut = ''

    // GENERATE OUTPUT
    
    if(['onBeforeMount', 'onMounted', 'onBeforeUpdate', 'onUpdated', 'onBeforeUnmount', 
        'onUnmounted', 'onErrorCaptured', 'onRenderTracked', 'onRenderTriggered'].indexOf(funcName) > -1) {
      lifecycleOut = `${funcName}(function${funcBody})`
    }
    else if(funcName === 'beforeCreate') {
      beforeCreateOut = `(function beforeCreate${funcBody})()`
    }
    else if(funcName === 'created') {
      createdOut = `(function created${funcBody})()`
    }
    else { // other methods
      methodOut = `const ${funcName} = function${funcBody}`
    }

    if(methodOut !== '') {
      allMethodsOut.push(methodOut)
    }
    
    if(lifecycleOut !== '') {
      allLifecyclesOut.push(lifecycleOut)
    }
  })// end forEach

  const methodsOut = allMethodsOut.join(N+N+T+T)
  const lifecyclesOut = allLifecyclesOut.join(N+N+T+T)

  done(methodsOut, lifecyclesOut, beforeCreateOut, createdOut)
}