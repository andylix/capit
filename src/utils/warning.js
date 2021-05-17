export default function warning(key, cond) {
  if(!cond) { return }
  const messages = {
    'NO_FUNCTION_STATE': 'function property returned from data() is ignored'
  }
  const message = messages[key]
  console.log('parser warning: ' + message)
}