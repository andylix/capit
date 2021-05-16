const fs = require('fs')
const path = require('path')
const parse = require('../src/parse')

const filePath = path.resolve(__dirname, './InputFile.vue')
const file = fs.readFileSync(filePath, 'utf8')
parse(file)