export default {
  manage: {
    register: '/user/login', // 注册接口
    login: '/user/login', // 登录
    logout: '/manage/company/loginOut' // // 退出
  },
  user:{
    user:'user/user' // 【用户】获取用户信息（用户登录后）
  },
  pwd: {
    getcheckcode: '/validCode/validCode',   //获取验证码
    resetpassword: '/user/password'    //找回密码
  },
  submit: {
    register: '/user/register',    //注册
    login: '/user/login',   //登陆
  },
  course: {
    in: '/course/inlist',       //校内课程
    out:'/course/outlist',       //校外课程
    search:'/course/search',      //搜索课程
    detail:{                          //课程详情
      courseintro:'/course/detail/courseintro',  //课程基本信息
      addcourse:'course/detail/addcourse',   //参加课程
      coursedetail:'course/detail/coursedetail',//课程介绍模块，包含老师的信息
      evaluate:'/course/detail/evaluate', //课程评价模块
      myevaluate:'/course/detail/myevaluate',  //添加/编辑/删除自己的课程评价，通过传的参数判断

    }       

  }
}
