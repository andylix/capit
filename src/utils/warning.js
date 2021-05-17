export default function warning(id, cond, args) {
  if(!cond) { return }
  const messages = {
    'NO_FUNCTION_STATE': `function property '${args[0]}' returned from data() is ignored`
  }
  const message = messages[id]

  const YELLOW = "\x1b[33m"
  const END = "\x1b[0m"
  console.log(YELLOW+"%s"+END, 'Parser Warning: ' + message);
}