const fs = require('fs')
const parse = require('../src/parse')

const file = fs.readFileSync('./sample/InputFile.vue', 'utf8')
parse(file)