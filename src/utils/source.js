export const source = function(script, node) {
  return script.substring(node.start, node.end)
}

export const sourceFuncBody = function(script, node) {
  const isShorthand = node.method
  let funcBody = source(script, node.value)
  if(!isShorthand) {
    funcBody = funcBody.replace(/^function\s*/, '')
  }
  return funcBody
}