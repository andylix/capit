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
  data() {
    return {
      count: 0,
      label: 'Count' + this.labelSeparator,
      tags: ['vuejs', 'javascript', 'web development'],
      config: {
        darkMode: true,
      }
    }
  },
  computed: {
    next() {
      return this.count + this.interval
    },
    backgroundColor: function() {
      return this.darkMode ? 'black' : 'white'
    }
  },
  methods: {
    add() {
      this.count++
    },
    beforeCreate: function() {
      console.log('lifecycle log: component beforeCreate')
    },
    created() {
      console.log('lifecycle log: component created')
    },
    beforeMount() {
      console.log('lifecycle log: component beforeMount')
    },
    mounted() {
      console.log('lifecycle log: component mounted')
    },
    beforeUpdate() {
      console.log('lifecycle log: component beforeUpdate')
    },
    updated() {
      console.log('lifecycle log: component updated')
    },
    beforeUnmount() {
      console.log('lifecycle log: component beforeUnmount')
    },
    unmounted() {
      console.log('lifecycle log: component unmounted')
    },
    errorCaptured() {
      console.log('lifecycle log: component errorCaptured')
    },
    renderTracked() {
      console.log('lifecycle log: component renderTracked')
    },
    renderTriggered() {
      console.log('lifecycle log: component renderTriggered')
    }
  }
}
</script>

<style scoped>
  div {
    background-color: 'black'
  }
</style>