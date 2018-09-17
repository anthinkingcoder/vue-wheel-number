import WheelUpdateNumber from './WheelUpdateNumber.vue'
import WheelNumber from './WheelNumber.vue'

const install = function (Vue) {
  Vue.component('wheel-number', WheelNumber);
  Vue.component('wheel-update-number', WheelUpdateNumber);
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  WheelNumber,
  WheelUpdateNumber
}

export default {
  install,
  WheelNumber,
  WheelUpdateNumber
}
