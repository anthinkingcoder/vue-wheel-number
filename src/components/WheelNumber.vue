<template>
  <div :style="styles">
        <span :style="item.style"
              v-for="(item,index) in data" :key="index">
            {{item.value}}
        </span>
  </div>
</template>

<script>
  const EL_BASE_STYLE = {
    position: 'relative',
    'text-align': 'center',
    overflow: 'hidden',
    display: 'inline-flex'
  }

  const NUMBER_BASE_STYLE = {
    position: 'relative',
    display: 'inline-block',
    transform: 'translate3d(0, 0,0)',
    'word-break': 'break-all',
    'text-align': 'center'
  }

  const TEXT_BASE_STYLE = {
    position: 'relative',
    display: 'inline-block'
  }
  import {getTextWh, timeout} from '../util/base'

  export default {
    props: {
      text: {
        type: [String, Number]
      },
      singeNumberWidth: {},
      singeNumberHeight: {},
      delay: {
        default: 0
      },
      duration: {
        default: .3
      },
      fontSize: {
        default: 12
      },
      calcNotNumberWidth: {
        default: true
      },
      beginZero: {
        default: false
      }
    },
    data() {
      return {
        currentText: '',
        data: [],
        currentY: 0,
        calcTextEl: '',
        curWidth: '',
        curHeight: '',
        textWh: ''
      }
    },
    computed: {
      styles() {
        return {
          ...EL_BASE_STYLE,
          height: `${this.curHeight}px`,
          'font-size': `${this.fontSize}px`
        }
      }
    },
    mounted() {
      this.init(String(this.text))

    },
    watch: {
      text(text) {
        this.init(String(text))
      }
    },
    methods: {
      numberStyles(y, c, index) {
        let duration = this.duration * c
        if (!this.beginZero && this.currentText) {
          const number = parseInt(this.currentText.charAt(index))
          if (!Number.isNaN(number)) {
            duration = Math.abs(c - number) * this.duration
          }
        }
        return {
          ...NUMBER_BASE_STYLE,
          width: `${this.curWidth}px`,
          height: `${this.curHeight * 10}px`,
          transform: `translate3d(0,${y}px,0)`,
          lineHeight: `${this.curHeight}px`,
          transition: `transform ${duration}s`
        }
      },
      textStyles() {
        const styles = {
          ...TEXT_BASE_STYLE,
          height: `${this.curHeight}px`,
          lineHeight: `${this.curHeight}px`,
          transform: `translate3d(0,0,0)`,
        }
        if (!this.calcNotNumberWidth) {
          styles.width = `${this.curWidth}px`
        }
        return styles
      },
      init(text) {
        if (!text) {
          return
        }
        this.updateCalcTextEl();
        if (this.beginZero || !this.currentText) {
          const zero = text.replace(/[0-9]/gi, '0')
          this.update(zero)
        }

        timeout(this.delay * 1000).then(() => {
          this.update(text)
          this.currentText = text
        })
        const maxNumber = Math.max(...text.replace(/\D/gi, '').split(''))
        timeout((this.delay + maxNumber * this.duration) * 1000).then(() => {
          this.$emit('finished')
        })

      },
      updateCalcTextEl() {
        if (!this.textWh) {
          this.textWh = getTextWh(this.$el, '0', this.fontSize)
        }
        const {width, height} = this.textWh
        this.curWidth = this.singeNumberWidth || (width).toFixed(2)
        this.curHeight = this.singeNumberHeight || height
      },
      update(text) {
        this.data = String(text).split('').map((c, index) => {

          if (Number.isNaN(parseInt(c))) {
            console.log(c)
            return {
              value: c,
              style: this.textStyles(),
              className: 'c-xwheelnumber__text'
            }
          } else {
            return {
              value: '0123456789',
              style: this.numberStyles(-this.curHeight * c, c, index),
              className: 'c-xwheelnumber__number'
            }
          }
        })
      },
      start() {

      }
    }
  }
</script>

