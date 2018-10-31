<template>
  <p :style="styles">
    {{curText}}
  </p>
</template>

<script>
  export default {
    props: {
      text: {
        type: [String, Number]
      },
      delay: {
        default: 0
      },
      duration: {
        default: .1
      },
      fontSize: {
        default: 12
      },
    },
    data() {
      return {
        curText: ''
      }
    },
    computed: {
      styles() {
        return {
          display: 'inline-block'
        }
      }
    },
    created() {
      this.init()
    },
    watch: {
      text() {
        this.init()
      }
    },
    methods: {
      init() {
        if (this.text) {
          this.curText = this.text.replace(/[0-9]/gi, '0')
          this.start()
        }
      },
      start() {
        if (this.curText !== this.text) {
          this.update()
        }
      },
      getNumberIndex(array) {
        for (let i = 0; i < array.length; i++) {
          if (this.isNumber(parseInt(array[i]))) {
            return i
          } else {
            return -1
          }
        }
      },
      update() {
        let text = this.curText
        let chars = Array.from(text).reverse()
        let index = this.getNumberIndex(chars)
        let addOne
        if (index === -1) {
          return
        }
        let number = parseInt(chars[index])
        if (number < 9) {
          number += 1
        } else {
          number = 0
          addOne = true
        }
        chars = chars.slice(1).map(c => {
          let number = parseInt(c)
          if (this.isNumber(number)) {
            if (addOne) {
              number += 1
              addOne = false
            }
            if (number > 9) {
              number = 0
              addOne = true
            }
            return number
          }
          return c
        }).reverse()
        chars.push(number)
        this.curText = chars.join('')
        setTimeout(() => {
          this.start()
        })
      },
      isNumber(c) {
        return !Number.isNaN(c)
      }
    }
  }
</script>

