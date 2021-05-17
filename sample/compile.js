import fs from 'fs'
import path from 'path'
import parse from '../src/parse.js'
import prevent from '../src/utils/prevent.js'

const filePath = path.resolve('./sample', './InputFile.vue')
const file = fs.readFileSync(filePath, 'utf8')
const splits = file.split(/<script.*\>/)

prevent('NO_SCRIPT', splits.length === 1)

const splits2 = splits[1].split('</script>')

let script = splits2[0].trim()
const outputScript = parse(script)
const [ top, bottom ] = file.split(script)
const output = top + outputScript + bottom

const GREEN = "\x1b[32m"
const END = "\x1b[0m"
console.log(GREEN+"%s"+END, 'Compiled Successfully');

fs.writeFile('./sample/OutputFile.vue', output, err => {
  if (err) {
    console.error(err)
    return
  }
})