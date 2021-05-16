module.exports = function(oldName) {
  if(oldName === 'beforeCreate') {
    return 'beforeCreate'
  }
  else if(oldName === 'created') {
    return 'created'
  }
  else if(oldName === 'beforeMount') {
    return 'onBeforeMount'
  }
  else if(oldName === 'mounted') {
    return 'onMounted'
  }
  else if(oldName === 'beforeUpdate') {
    return 'onBeforeUpdate'
  }
  else if(oldName === 'updated') {
    return 'onUpdated'
  }
  else if(oldName === 'beforeUnmount') {
    return 'onBeforeUnmount'
  }
  else if(oldName === 'unmounted') {
    return 'onUnmounted'
  }
  else if(oldName === 'errorCaptured') {
    return 'onErrorCaptured'
  }
  else if(oldName === 'renderTracked') {
    return 'onRenderTracked'
  }
  else if(oldName === 'renderTriggered') {
    return 'onRenderTriggered'
  }
  else { /* other methods */
    return oldName
  }
}