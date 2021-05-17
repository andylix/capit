import { sourceFuncBody } from '../utils/source.js'

const N = '\n' // new line
const T = '  ' // tab

export default function convertComputed(op, script, done) {

  let allComputedOut = []

  const properties = op.value.properties

  properties.forEach(node => {

    let varName = node.key.name
    let funcBody = sourceFuncBody(script, node)

    const computedOut = `const ${varName} = computed(function${funcBody})`

    allComputedOut.push(computedOut)
  })

  const out = allComputedOut.join(N+N+T+T)

  done(out)
}