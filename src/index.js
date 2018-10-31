import JumpNumber from './JumpNumber.vue'
import WheelNumber from './components/WheelNumber.vue'
import WheelCountNumber from './components/WheelCountNumber.vue'
import WheelUpdateNumber from './components/WheelUpdateNumber.vue'

const install = function (Vue) {
  Vue.component('jump-number', JumpNumber);
  Vue.component('wheel-number', WheelNumber)
  Vue.component('wheel-update-number', WheelUpdateNumber)
  Vue.component('wheel-count-number', WheelCountNumber)
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  JumpNumber,
  WheelNumber,
  WheelUpdateNumber,
  WheelCountNumber
}

export default {
  install,
  JumpNumber,
  WheelNumber,
  WheelUpdateNumber,
  WheelCountNumber
}
