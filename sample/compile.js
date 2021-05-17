import fs from 'fs'
import path from 'path'
import parse from '../src/parse.js'

const filePath = path.resolve('./sample', './InputFile.vue')
const file = fs.readFileSync(filePath, 'utf8')
parse(file)