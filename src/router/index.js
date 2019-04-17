import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import Register from '../components/register/index.vue'
import Findpassword from '../components/find-password/index.vue'
import Incourse from '../components/in-course/index.vue'
import Outcourse from '../components/out-course/index.vue'
import Search from '../components/search/index.vue'
import CourseDetail from '../components/course-detail/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/incourse'
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'incourse',
          name: 'Incourse',
          component: Incourse
        },
        {
          path: 'outcourse',
          name: 'Outcourse',
          component: Outcourse
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      alias: '/login',
      component: Register
    },
    {
      path: '/findpassword',
      name: 'Findpassword',
      component: Findpassword
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/detail',
      name: 'CourseDetail',
      component: CourseDetail
    }
  ]
})
