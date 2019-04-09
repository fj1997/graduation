// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable*/
import Vue from 'vue'
import App from './App'
import router from './router'
import './icon/iconfont'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// import http from './http'
import ports from './ports'
import axios from 'axios'
// require('./mock'); //引入mock数据，关闭则注释该行
// Vue.prototype.http = http
Vue.prototype.ports = ports
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
