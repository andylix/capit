<template>
  <div>
    <p>{{ label }}: {{ count }}</p>
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
    }
  },
  data() {
    return {
      count: 0,
      label: 'Count'
    }
  },
  computed: {
    next() {
      return this.count + this.interval
    }
  },
  methods: {
    add() {
      this.count++
    },
    mounted() {
      console.log('lifecycle log: component mounted')
    },
    updated() {
      console.log('lifecycle log: component updated')
    }
  }
}
</script>