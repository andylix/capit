import prevent from '../utils/prevent.js'
import warning from '../utils/warning.js'
import { source } from '../utils/source.js'

const N = '\n' // new line
const T = '  ' // tab

export default function convertData($property, script, done) {
  
  const refsOut = []
  const reactivesOut = []
  const refReturnables = []
  const reactiveReturnables = []
  const $blockBody = $property.value.body.body

  prevent('DATA_NOT_RETURNING', $blockBody.length !== 1 || $blockBody[0].type !== 'ReturnStatement')
  
  const $return = $blockBody[0].argument
  
  prevent('DATA_NOT_RETURNING_OBJECT', $return.type !== 'ObjectExpression')
  
  const $properties = $return.properties
  
  $properties.forEach($node => {
    const dataType = $node.value.type
    const key = $node.key.name
    
    if(dataType === 'FunctionExpression') {
      warning('NO_FUNCTION_STATE', true, [key])
    }
    else if(dataType === 'ObjectExpression') {
      const val = source(script, $node.value)
      reactivesOut.push(`const ${key} = reactive(${val})`)
      reactiveReturnables.push(key)
    }
    else {
      const val = source(script, $node.value)
      refsOut.push(`const ${key} = ref(${val})`)
      refReturnables.push(key)
    }
  })

  const refs = refsOut.join(N+N+T+T)
  const reactives = reactivesOut.join(N+N+T+T)
  const returnables = refReturnables.concat(reactiveReturnables)
  done(refs, reactives, returnables)
}