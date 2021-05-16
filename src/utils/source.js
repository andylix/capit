function source(script, node) {
  return script.substring(node.start, node.end)
}

exports.source = source

exports.sourceFuncBody = function(script, node) {
  const isShorthand = node.method
  let funcBody = source(script, node.value)
  if(!isShorthand) {
    funcBody = funcBody.replace(/^function\s*/, '')
  }
  return funcBody
}