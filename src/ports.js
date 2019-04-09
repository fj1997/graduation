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
    register:'/api/user/form',    //注册
    login:'/api/user/login'       //登陆
  }
}
