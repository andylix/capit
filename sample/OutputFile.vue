<template>
  <div>
    <p>{{ label }} {{ count }}</p>
    <button @click="add">Add</button>
    <p>(the next value is {{ next }})</p>
    <p>
      Label: <input type="text" v-model="label" />
    </p>
  </div>
</template>

<script>
export default {
  props: {
    interval: {
      type: Number,
      default: 1
    },
    labelSeparator: {
      type: String,
      default: ':'
    }
  },
  setup() {

    (function beforeCreate() {
      console.log('lifecycle log: component beforeCreate')
    })()

    const count = ref(0)

    const label = ref('Count' + labelSeparator)

    const tags = ref(['vuejs', 'javascript', 'web development'])

    const config = reactive({
        darkMode: true,
      })

    const next = computed(function() {
      return count + interval
    })

    const backgroundColor = computed(function() {
      return darkMode ? 'black' : 'white'
    })

    (function created() {
      console.log('lifecycle log: component created')
    })()

    onBeforeMount(function() {
      console.log('lifecycle log: component beforeMount')
    })

    onMounted(function() {
      console.log('lifecycle log: component mounted')
    })

    onBeforeUpdate(function() {
      console.log('lifecycle log: component beforeUpdate')
    })

    onUpdated(function() {
      console.log('lifecycle log: component updated')
    })

    onBeforeUnmount(function() {
      console.log('lifecycle log: component beforeUnmount')
    })

    onUnmounted(function() {
      console.log('lifecycle log: component unmounted')
    })

    onErrorCaptured(function() {
      console.log('lifecycle log: component errorCaptured')
    })

    onRenderTracked(function() {
      console.log('lifecycle log: component renderTracked')
    })

    onRenderTriggered(function() {
      console.log('lifecycle log: component renderTriggered')
    })

    const add = function() {
      count++
    }

    return { count, label, tags, config, next, backgroundColor, add }
  }
}
</script>

<style scoped>
  div {
    background-color: 'black'
  }
</style>