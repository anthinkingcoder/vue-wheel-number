<template>
  <wheel-number v-if="type==='one'"
                :text="text"
                :singeNumberWidth="singeNumberWidth"
                :singeNumberHeight="singeNumberHeight"
                :delay="delay"
                :duration="duration"
                :fontSize="fontSize"
                :calcNotNumberWidth="calcNotNumberWidth"
                :beginZero="beginZero"
                @finished="finished"

  ></wheel-number>



  <wheel-update-number v-else-if="type==='two'"
                       :text="text"
                       :singeNumberWidth="singeNumberWidth"
                       :singeNumberHeight="singeNumberHeight"
                       :delay="delay"
                       :duration="duration"
                       :fontSize="fontSize"
                       :calcNotNumberWidth="calcNotNumberWidth"
                       :firstAlsoUse="firstAlsoUse"
                       :filter="filter"
                       :singeUpdate="singeUpdate"
                       @finished="finished"
  ></wheel-update-number>
</template>

<script>
  import WheelNumber from './components/WheelNumber.vue'
  import WheelUpdateNumber from './components/WheelUpdateNumber.vue'

  export default {
    props: {
      type: {
        default: 'one'
      },
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
      },
      firstAlsoUse: {},
      filter: {
        default: 'none' //all,gt,equal,lt
      },
      singeUpdate: {
        default: true
      },
    },
    components: {
      WheelNumber, WheelUpdateNumber
    },
    data() {
      return {}
    },
    methods: {
      finished() {
        this.$emit('finished', this.type)
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
