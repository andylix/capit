import fs from 'fs'
import path from 'path'

const COMMA = ','

export default function render(content) {
  
  const filePath = path.resolve('./src/render', './template')
  let tmpl = fs.readFileSync(filePath, 'utf8')
  let out = tmpl

  // render the props

  if(content.props !== null) {
    out = out.replace('${props}', content.props + COMMA)
  }
  else {
    out = out.replace('${props}', '')
  }

  // render the others

  ['refs', 'reactives', 'methods', 'lifecycles', 'beforeCreate', 'created', 'computed'].forEach(name => {
    if(content[name] !== null) {
      out = out.replace('${'+name+'}', content[name])
    }
  })

  // render the return statement

  const returns = [...content.returnRefsReactives, ...content.returnComputed, ...content.returnMethods]
  const returnStatement = `return { ${returns.join(', ')} }`
  out = out.replace('${returns}', returnStatement)

  // remove 'this.'
  return out.replace(/this\./g, '')
}