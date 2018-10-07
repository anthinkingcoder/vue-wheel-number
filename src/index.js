import JumpNumber from './JumpNumber.vue'

const install = function (Vue) {
  Vue.component('jump-number', JumpNumber);
};
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  JumpNumber
}

export default {
  install,
  JumpNumber
}
