<template>
  <div :style="styles">
    <div>
            <span v-for="i in currentText.length" :key="i"
                  :style="oldStyles[i - 1]">
              {{currentText.charAt(i - 1)}}
            </span>
    </div>
    <div>
            <span v-for="i in text.length" :key="i" :style="newStyles[i - 1]">
              {{text.charAt(i - 1)}}
            </span>
    </div>
  </div>
</template>

<script>
  import {getTextWh, timeout} from '../util/base'

  const TEXT_BASE_STYLE = {
    'text-align': 'center',
    'display': 'inline-block'
  }

  const EL_BASE_STYLE = {
    position: 'relative',
    overflow: 'hidden'
  }

  export default {
    props: {
      text: {},
      firstAlsoUse: {},
      duration: {
        default: .3
      },
      filter: {
        default: 'none' //all,gt,equal,lt
      },
      singeUpdate: {
        default: true
      },
      fontSize: {
        default: 12
      },
      singeNumberWidth: {},
      singeNumberHeight: {},
      calcNotNumberWidth: {
        default: true
      },
      delay: {
        default: .0
      }
    },
    data() {
      return {
        currentText: '',
        oldTags: [],
        newTags: [],
        oldStyles: [],
        newStyles: [],
        timerId: '',
        curWidth: {},
        curHeight: {},
        numberTags: [],
      }
    },
    mounted() {
      this.updateCalcTextEl()
      this.update(String(this.text))
    },
    computed: {
      styles() {
        return {
          ...EL_BASE_STYLE,
          height: `${this.curHeight}px`,
          lineHeight: `${this.curHeight}px`,
          'font-size': `${this.fontSize}px`
        }
      }
    },
    watch: {
      text(newText) {
        this.update(String(newText))
      }
    },
    methods: {
      checkFilter(newLength, oldLength) {
        if (!this.singeUpdate) {
          return true
        }
        const filter = this.filter
        if (filter === 'eq') {
          return newLength === oldLength
        } else if (filter === 'lt') {
          return newLength < oldLength
        } else if (filter === 'gt') {
          return newLength > oldLength
        } else {
          return true
        }
      },
      updateCalcTextEl() {
        if (!this.textWh) {
          this.textWh = getTextWh(this.$el, '0', this.fontSize)
          this.notNumberWidth = getTextWh(this.$el, ',', this.fontSize).width
        }
        const {width, height} = this.textWh
        this.curWidth = this.singeNumberWidth || (width).toFixed(2)
        this.curHeight = this.singeNumberHeight || height
      },
      update(newText) {
        newText = String(newText)
        const self = this
        const currentText = this.currentText || ''
        this.init().then(() => {
          if (!currentText) {
            if (!this.firstAlsoUse) {
              this.currentText = newText
              return
            }
          }
          if (this.checkFilter(newText.length, currentText.length)) {
            const length = Math.max(newText.length, currentText.length)
            for (let i = 0; i < length; i++) {
              const oldChar = currentText.charAt(i)
              const newChar = newText.charAt(i)
              if (oldChar !== newChar || !this.singeUpdate) {
                if (!oldChar && currentText && !this.singeUpdate) {
                  this.appendNew().then(() => {
                    doUpdate(i)
                  })
                } else {
                  doUpdate(i)
                }
              }
            }
          } else {
            this.currentText = newText
          }

          function doUpdate(i) {
            self.$set(self.oldTags, i, 2)
            self.$set(self.newTags, i, 1)
            self.calc(i)
            self.timeId = timeout(self.duration * 1000).then(() => {
              self.$set(self.oldTags, i, 0)
              self.calc(i)
              self.currentText = newText
            })
          }
        })
        timeout(this.duration * 1000).then(() => {
          this.$emit('finished')
        })
      },
      init() {
        let oldTags = []
        let newTags = []
        let oldStyles = []
        let newStyles = []
        let numberTags = []
        for (let i = 0; i < this.text.length; i++) {
          oldTags[i] = 1
          newTags[i] = 0
          newStyles[i] = oldStyles[i] = {
            ...TEXT_BASE_STYLE,
            ...this.getWidthHeightStyle(this.curWidth, this.text.charAt(i))
          }
        }
        this.oldStyles = oldStyles
        this.newStyles = newStyles
        this.newTags = newTags
        this.oldTags = oldTags
        this.numberTags = numberTags
        return timeout(this.delay * 1000)
      },
      appendNew() {
        return new Promise((resolve) => {
          this.newTags.push(0)
          this.newStyles.push({})
          this.calcNewStyles(this.newTags.length - 1)
          return timeout(0).then(() => {
            resolve()
          })
        })
      },
      calcOldStyles(index) {
        if (!this.$el) {
          return
        }
        let oldTag = this.oldTags[index]
        let oldStyle
        let height = this.$el.offsetHeight
        let word = this.text.charAt(index)
        if (oldTag === 0) {
          oldStyle = this.getStyle(0, 1, height, word)
        } else if (oldTag === 1) {
          oldStyle = this.getStyle(this.duration, 1, 0, word)
        } else {
          oldStyle = this.getStyle(this.duration, 0, -height, word)
        }
        this.$set(this.oldStyles, index, oldStyle)
      },
      calcNewStyles(index) {
        let newTag = this.newTags[index]
        let height = this.$el.offsetHeight
        let word = this.text.charAt(index)
        let newStyle
        if (!this.$el) {
          return
        }
        if (newTag === 0) {
          newStyle = this.getStyle(0, 1, 0, word)
        } else if (newTag === 1) {
          newStyle = this.getStyle(this.duration, 1, -height, word)
        } else {
          newStyle = this.getStyle(this.duration, 0, -2 * height, word)
        }
        this.$set(this.newStyles, index, newStyle)
      },
      calc(index) {
        this.calcOldStyles(index)
        this.calcNewStyles(index)
      },
      getWidthHeightStyle(width, word) {
        if (Number.isNaN(parseInt(word))) {
          if (!this.calcNotNumberWidth) {
            return {
              width: `${width}px`,
            }
          }
        } else {
          return {
            width: `${width}px`,
            height: `${this.curHeight}px`,
            lineHeight: `${this.curHeight}px`
          }
        }
      },
      getTransitionStyle(duration = 0) {
        return {
          transition: `all linear ${duration}s`,
        }
      },
      getStyle(duration, opacity, transformY, word) {
        return {
          ...TEXT_BASE_STYLE,
          ...this.getTransitionStyle(duration),
          ...this.getWidthHeightStyle(this.curWidth, word),
          opacity: opacity,
          transform: `translate3d(0,${transformY}px,0)`,
        }
      }
    }
  }
</script>
