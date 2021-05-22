let str = `
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
      const _this = {}
      _this.name = 'fake'
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
}`

const arrStr = str.split('')


const findThis = /[^A-Za-z_$]{1}this\./g
let temp = ''
const locs = []
while (temp = findThis.exec(str)) {
  const i = temp.index + 1 // plus 1 to move past the char before `this`
  arrStr[i] = '@'
  locs.push(i)
}

const markedStr = arrStr.join('')
console.log(markedStr)
const find$his = new RegExp('@his.','g')
const clean = markedStr.replace(find$his, '')
console.log(clean)