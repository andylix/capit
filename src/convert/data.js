import prevent from '../utils/prevent.js'
import warning from '../utils/warning.js'
import { source } from '../utils/source.js'

const N = '\n' // new line
const T = '  ' // tab

export default function convertData(op, script, done) {

  const refsOut = []
  const reactivesOut = []
  const refReturnables = []
  const reactiveReturnables = []
  const funcBodyNodes = op.value.body.body
  prevent('DATA_NOT_RETURNING', funcBodyNodes.length !== 1 || funcBodyNodes[0].type !== 'ReturnStatement')
  const objectNode = funcBodyNodes[0].argument
  prevent('DATA_NOT_RETURNING_OBJECT', objectNode.type !== 'ObjectExpression')
  const items = objectNode.properties
  items.forEach(item => {
    const dataType = item.value.type
    const key = item.key.name
    
    warning('NO_FUNCTION_STATE', dataType === 'FunctionExpression', [key])

    if(dataType === 'ObjectExpression') {
      const val = source(script, item.value)
      reactivesOut.push(`const ${key} = reactive(${val})`)
      reactiveReturnables.push(key)
    }
    else {
      const val = source(script, item.value)
      refsOut.push(`const ${key} = ref(${val})`)
      refReturnables.push(key)
    }
  })
  const refs = refsOut.join(N+N+T+T)
  const reactives = reactivesOut.join(N+N+T+T)
  const returnables = refReturnables.concat(reactiveReturnables)
  done(refs, reactives, returnables)
}