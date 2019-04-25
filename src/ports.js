export default {
  manage: {
    register: '/manage/company/register', // 注册接口
    login: '/api/user/userInfo', // 登录
    logout: '/manage/company/loginOut' // // 退出
  },
  pwd: {
    getcheckcode: '/api/user/checkcode',   //获取验证码
    resetpassword: '/api/user/findpass'    //找回密码
  },
  submit: {
    register: '/api/user/form',    //注册
    login: '/api/user/login'       //登陆
  },
  course: {
    in: '/api/course/inlist',       //校内课程
    out:'/api/course/outlist',       //校外课程
    search:'/api/course/search',      //搜索课程
    detail:{                          //课程详情
      courseintro:'/api/course/detail/courseintro',  //课程基本信息
      addcourse:'/api/course/detail/addcourse',   //参加课程
      coursedetail:'/api/course/detail/coursedetail',//课程介绍模块，包含老师的信息
      evaluate:'/api/course/detail/evaluate', //课程评价模块
      myevaluate:'/api/course/detail/myevaluate',  //添加/编辑/删除自己的课程评价，通过传的参数判断

    }       

  }
}
