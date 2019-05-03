import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import Register from '../components/register/index.vue'
import Findpassword from '../components/find-password/index.vue'
import Incourse from '../components/in-course/index.vue'
import Outcourse from '../components/out-course/index.vue'
import Search from '../components/search/index.vue'
import CourseDetail from '../components/course-detail/index.vue'
import Teacher from '../components/teacher/index.vue'
import AddCourse from '../components/teacher/add-course/index.vue'
import CorrectWork from '../components/teacher/correct-work/index.vue'
import CourseManage from '../components/teacher/course-manage/index.vue'
import PublishWork from '../components/teacher/publish-work/index.vue'
import ReplyQuestion from '../components/teacher/reply-question/index.vue'
import StudentManage from '../components/teacher/student-manage/index.vue'
import Manage from '../components/manage/index.vue'
import ManageStudent from '../components/manage/student/index.vue'
import ManageTeacher from '../components/manage/teacher/index.vue'
import ManageCourse from '../components/manage/course/index.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
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
      path: '/login',
      name: 'Register',
      // alias: '/login',
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
    },
    {
      path: '/teacher',
      name: 'Teacher',
      component: Teacher,
      children: [
        {
          path: 'addCourse',
          name: 'AddCourse',
          component: AddCourse
        },
        {
          path: 'courseManage',
          name: 'CourseManage',
          component: CourseManage
        },
        {
          path: 'correctWork',
          name: 'CorrectWork',
          component: CorrectWork
        },
        {
          path: 'publishWork',
          name: 'PublishWork',
          component: PublishWork
        },
        {
          path: 'replyQuestion',
          name: 'ReplyQuestion',
          component: ReplyQuestion
        },
        {
          path: 'studentManage',
          name: 'StudentManage',
          component: StudentManage
        },

      ]
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage,
      children:[
        {
          path: 'manageStudent',
          name: '学生管理',
          component: ManageStudent
        },{
          path: 'manageTeacher',
          name: '教师管理',
          component: ManageTeacher
        },{
          path: 'manageCourse',
          name: '课程管理',
          component: ManageCourse
        },
      ]
    }
    

  ]
})
