import fs from 'fs'
import path from 'path'

const COMMA = ','

export default function render(content) {
  const filePath = path.resolve('./src/render', './template')
  let tmpl = fs.readFileSync(filePath, 'utf8')
  let out = tmpl

  if(content.props !== null) {
    out = out.replace('${props}', content.props + COMMA)
  }
  else {
    out = out.replace('${props}', '')
  }

  if(content.refs !== null) {
    out = out.replace('${refs}', content.refs)
  }
  if(content.reactives !== null) {
    out = out.replace('${reactives}', content.reactives)
  }
  if(content.methods !== null) {
    out = out.replace('${methods}', content.methods)
  }
  if(content.lifecycles !== null) {
    out = out.replace('${lifecycles}', content.lifecycles)
  }
  if(content.beforeCreate !== null) {
    out = out.replace('${beforeCreate}', content.beforeCreate)
  }
  if(content.created !== null) {
    out = out.replace('${created}', content.created)
  }
  if(content.computed !== null) {
    out = out.replace('${computed}', content.computed)
  }

  const returns = [...content.returnRefsReactives, ...content.returnComputed, ...content.returnMethods]
  const returnStatement = `return { ${returns.join(', ')} }`
  out = out.replace('${returns}', returnStatement)

  out = out.replace(/this\./g, '')

  return out
}