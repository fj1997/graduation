import Vue from 'vue'
import Router from 'vue-router'
import CoursePlaza from '../components/CoursePlaza.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CoursePlaza',
      component: CoursePlaza
    },
    {
      path: '/courseplaza',
      name: 'CoursePlaza',
      component: CoursePlaza
    }
  ]
})
