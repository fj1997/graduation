import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index.vue'
import Register from '../components/register/index.vue'
import Findpassword from '../components/find-password/index.vue'
import Incourse from '../components/in-course/index.vue'
import Outcourse from '../components/out-course/index.vue'
import Search from '../components/search/index.vue'
import CourseDetail from '../components/course-detail/index.vue'
import StudyCourse from '../components/study-course/index.vue'

import Teacher from '../components/teacher/index.vue'
import AddCourse from '../components/teacher/add-course/index.vue'
import CorrectWork from '../components/teacher/correct-work/index.vue'
import Work from'../components/teacher/correct-work/work.vue'
import WorkDetail from'../components/teacher/correct-work/work-detail.vue'
import CourseManage from '../components/teacher/course-manage/index.vue'
import AddSection from '../components/teacher/course-manage/add-section.vue'
import ReplyQuestion from '../components/teacher/reply-question/index.vue'
import QuestionDetail from '../components/teacher/reply-question/question-detail.vue'
import StudentManage from '../components/teacher/student-manage/index.vue'

import Student from '../components/student/index.vue'
import StudentCourse from '../components/student/course-manage.vue'
import StudentScore from '../components/student/score.vue'

import Manage from '../components/manage/index.vue'
import ManageStudent from '../components/manage/student/index.vue'
import ManageTeacher from '../components/manage/teacher/index.vue'
import ManageCourse from '../components/manage/course/index.vue'
import ManageInCourse from '../components/manage/course/in-course.vue'
import ManageOutCourse from '../components/manage/course/out-course.vue'
Vue.use(Router)

const router=new Router({
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
      path: '/study',
      name: 'StudyCourse',
      component: StudyCourse
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
          path: 'courseManage/addSection',
          name: 'AddSection',
          component: AddSection,
        },
        {
          path: 'correctWork',
          name: 'CorrectWork',
          component: CorrectWork
        },
        {
          path: '/correctWork/work',
          name: 'Work',
          component: Work
        },
        {
          path: '/correctWork/workDetail',
          name: 'WorkDetail',
          component: WorkDetail
        },
        {
          path: 'replyQuestion',
          name: 'ReplyQuestion',
          component: ReplyQuestion
        },
        { 
          path: 'replyQuestion/questionDetail',
          name: 'QuestionDetail',
          component: QuestionDetail
          },
        {
          path: 'studentManage',
          name: 'StudentManage',
          component: StudentManage
        }
      ]
    },{
      path: '/student',
      name: 'Student',
      component: Student,
      children:[
        {
          path: '/student/courseManage',
          name: 'StudentCourse',
          component: StudentCourse,
        },
        {
          path: '/student/studentScore',
          name: 'StudentScore',
          component: StudentScore,
        }
        
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
          path: 'ManageInCourse',
          name: '校内课程',
          component: ManageInCourse
        },
        {
          path: 'ManageOutCourse',
          name: '校外课程',
          component: ManageOutCourse
        }
      ]
    }
    

  ]
})


// 注册一个全局守卫，作用是在路由跳转前，对路由进行判断，防止未登录的用户跳转到其他需要登录的页面去
router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem('userId');
  
  // 如果已经登录，那我不干涉你，让你随便访问
  if(token){
  next()
  }else {
  // 如果没有登录，但你访问其他需要登录的页面，那我就让你跳到登录页面去
  if(to.path !== '/login') {
    debugger
  next({path: '/login'})
  }else {
  next()
  }
  }
  })
  export default  router