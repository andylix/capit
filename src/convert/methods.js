import { sourceFuncBody } from '../utils/source.js'
import newFuncName from '../utils/newFuncName.js'

const N = '\n' // new line
const T = '  ' // tab
const NEW_LIFECYCLE_NAMES = ['onBeforeMount', 'onMounted', 'onBeforeUpdate', 'onUpdated', 'onBeforeUnmount', 'onUnmounted', 'onErrorCaptured', 'onRenderTracked', 'onRenderTriggered']

export default function convertMethods($property, script, done) {

  const allMethodsOut = []
  const allLifecyclesOut = []
  let beforeCreateOut = ''
  let createdOut = ''
  const returnables = []

  const $properties = $property.value.properties

  $properties.forEach($node => {

    let funcName = newFuncName($node.key.name)
    let funcBody = sourceFuncBody(script, $node)

    let methodOut = ''
    let lifecycleOut = ''
    
    if(NEW_LIFECYCLE_NAMES.indexOf(funcName) > -1) {
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
      returnables.push(funcName)
    }
    
    if(lifecycleOut !== '') {
      allLifecyclesOut.push(lifecycleOut)
    }
  })

  const methodsOut = allMethodsOut.join(N+N+T+T)
  const lifecyclesOut = allLifecyclesOut.join(N+N+T+T)

  done(methodsOut, lifecyclesOut, beforeCreateOut, createdOut, returnables)
}