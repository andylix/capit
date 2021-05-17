import { sourceFuncBody } from '../utils/source.js'

const N = '\n' // new line
const T = '  ' // tab

export default function convertComputed($property, script, done) {

  const allComputedOut = []
  const returnables = []

  const $properties = $property.value.properties

  $properties.forEach($node => {

    let varName = $node.key.name
    let funcBody = sourceFuncBody(script, $node)

    const computedOut = `const ${varName} = computed(function${funcBody})`

    allComputedOut.push(computedOut)
    returnables.push(varName)
  })

  const out = allComputedOut.join(N+N+T+T)

  done(out, returnables)
}