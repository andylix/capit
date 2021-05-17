export default function warning(key, cond, args) {
  if(!cond) { return }
  const messages = {
    'NO_FUNCTION_STATE': `function property '${args.key}' returned from data() is ignored`
  }
  const message = messages[key]
  console.log('parser warning: ' + message)
}