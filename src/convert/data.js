const prevent = require('../utils/prevent')
const warning = require('../utils/warning')
const { source } = require('../utils/source')

const N = '\n' // new line
const T = '  ' // tab

module.exports = function convertData(op, script, done) {

  const refsOut = []
  const reactivesOut = []
  const funcBodyNodes = op.value.body.body
  prevent('DATA_NOT_RETURNING', funcBodyNodes.length !== 1 || funcBodyNodes[0].type !== 'ReturnStatement')
  const objectNode = funcBodyNodes[0].argument
  prevent('DATA_NOT_RETURNING_OBJECT', objectNode.type !== 'ObjectExpression')
  const items = objectNode.properties
  items.forEach(item => {
    const dataType = item.value.type
    if(dataType === 'ObjectExpression') {
      const key = item.key.name
      const val = source(script, item.value)
      reactivesOut.push(`const ${key} = reactive(${val})`)
    }
    else if(dataType === 'ArrayExpression') {
      const key = item.key.name
      const val = source(script, item.value)
      refsOut.push(`const ${key} = ref(${val})`)
    }
    else if(dataType === 'Literal') {
      const key = item.key.name
      const val = item.value.value
      refsOut.push(`const ${key} = ref(${val})`)
    }
    else {        
      warning('NO_FUNCTION_STATE', dataType === 'FunctionExpression')
    }
  })
  const refs = refsOut.join(N+N+T+T)
  const reactives = reactivesOut.join(N+N+T+T)
  done(refs, reactives)
}