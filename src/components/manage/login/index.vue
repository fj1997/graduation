<template>
  <div class="login-banner">
    <div class="login-box">
        <h3 class="login-title">登陆</h3>
        <p class="error-tip" v-show="!errorTip">
            用户名和密码错误，请再试一次
        </p>
     <el-form :model="loginForm" :hide-required-asterisk="true" ref="loginForm" label-width="80px" class="demo-loginForm">
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="loginForm.userName" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
              <el-input type="password" v-model="loginForm.userPassword" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="login-button">
              <el-button type="primary" @click="submitForm">登陆</el-button>
            </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm:{
          userPassword: '',
            userName: '' 
      },
      errorTip:true
    }
  },
  methods:{
      submitForm(){
          let vm = this;
          if(vm.loginForm.userName == 'user123'&& vm.loginForm.userPassword == 'password123'){
              sessionStorage.setItem('user',vm.loginForm.userName);
              vm.$router.push({
                path:'/manage/student'
            })
          }else{
              vm.errorTip=false;
          }
      }
  }
}
</script>

<style scoped lang="less">
.login-banner{
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    min-height: 620px;
    background-image: url("../../../assets/img/manage.jpg");
    background-position: center;
  }
  .login-box {
    width: 362px;
    height: 340px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -170px;
    margin-left: -181px;
    background: rgba(0,0,0,0.2);
    .el-select {
      width: 300px;
    }
  }
  .login-title{
      text-align: center;
      color: #fff;
      margin-top: 20px;
  }
  .demo-loginForm{
      margin-top: 30px;
  }
  .login-button{
      margin-top: 30px;
      margin-left: 75px;
  }
  .error-tip{
        color: red;
        font-size: 12px;
        margin-left: 100px;
        margin-bottom: 10px;
    }

</style>
<style lang="less">
.login-box{
    .el-input{
        width:90%;
    }
}
</style>
