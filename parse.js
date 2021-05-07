const Parser = require('acorn-loose');
const fs = require('fs')

const component = fs.readFileSync('./MyComponent.vue', 'utf8')
console.log(component.split('\n').length)
let script = component.split(/<script.*\>/)[1].split('</script>')[0]

const options = {}

const ast = Parser.parse(script, options)
console.log(ast.body[0].declaration.properties)