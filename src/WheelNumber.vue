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
    display: 'flex',
    'text-align': 'center',
    overflow: 'hidden'
  }

  const NUMBER_BASE_STYLE = {
    position: 'relative',
    display: 'inline-block',
    transform: 'translate(0, 0)',
    'word-break': 'break-all',
    'text-align': 'center'
  }

  const TEXT_BASE_STYLE = {
    position: 'relative',
    display: 'inline-block'
  }
  import {getTextWh, timeout} from './util/base'

  export default {
    props: {
      text: {
        type: [String, Number]
      },
      singeNumberWidth: {},
      singeNumberHeight: {},
      delay: {
        default: .3
      },
      duration: {
        default: .3
      },
      fontSize: {
        default: 12
      },
      calcNotNumberWidth: {
        default: true
      }
    },
    data() {
      return {
        currentText: this.text,
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
      this.init(this.text)

    },
    watch: {
      text(text) {
        this.init(text)
      }
    },
    methods: {
      numberStyles(y, c) {
        return {
          ...NUMBER_BASE_STYLE,
          width: `${this.curWidth}px`,
          height: `${this.curHeight * 10}px`,
          transform: `translate(0,${y}px)`,
          lineHeight: `${this.curHeight}px`,
          transition: `transform ${this.duration * c}s`
        }
      },
      textStyles() {
        const styles = {
          ...TEXT_BASE_STYLE
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
        const zero = text.replace(/[0-9]/gi, '0')
        this.updateCalcTextEl();
        this.update(zero)
        timeout(this.delay * 1000).then(() => {
          this.update(text)
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
        this.data = String(text).split('').map(c => {
          if (Number.isNaN(parseInt(c))) {
            return {
              value: c,
              style: this.textStyles(),
              className: 'c-xwheelnumber__text'
            }
          } else {
            return {
              value: '0123456789',
              style: this.numberStyles(-this.curHeight * c, c),
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

<style type="text/scss" lang="scss">
</style>
