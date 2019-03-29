// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable*/
import Vue from 'vue'
import App from './App'
import router from './router'
import './icon/iconfont'
import {VeeValidate, Veeconfig} from './assets/util/validate'
Vue.use(VeeValidate,Veeconfig)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
