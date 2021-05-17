const lifecycleNameChanges = {
  beforeCreate: undefined,
  created: undefined,
  beforeMount: 'onBeforeMount',
  mounted: 'onMounted',
  beforeUpdate: 'onBeforeUpdate',
  updated: 'onUpdated',
  beforeUnmount: 'onBeforeUnmount',
  unmounted: 'onUnmounted',
  errorCaptured: 'onErrorCaptured',
  renderTracked: 'onRenderTracked',
  renderTriggered: 'onRenderTriggered',
}

export default function newFuncName(oldName) {
  const newName = lifecycleNameChanges[oldName]
  if(newName === undefined){
    return oldName
  }
  else {
    return newName
  }
}