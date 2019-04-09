<template>
    <div class="login-box">
        <p class="login-title">
            欢迎登陆
        </p>
        <p class="error-tip" v-show="!errorTip">
            用户名和密码错误，请再试一次
        </p>
        <el-form :model="loginForm" :rules="rules" :hide-required-asterisk="true" ref="loginForm" label-width="100px" class="demo-loginForm">
            <el-form-item label="电话" prop="phone">
              <el-input v-model.number="loginForm.phone" placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="loginForm.pass" autocomplete="off" placeholder="设置密码,（6~8个字符，含英文大小写和数字）"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
            </el-form-item>
        </el-form>
        <p class="forget-password" @click="findPassword()"> 
            忘记密码?
        </p>
       
       
    </div>
</template>

<script>
import {isvalidPhone, isvalidPass} from './validate'
export default {
  data () {
    //  自定义手机号正则表达式
    let validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    // 自定义密码正则表达式
    let validPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (!isvalidPass(value)) {
        callback(new Error('密码必须包括字母和数字，6~8个字符'))
      } else {
        callback()
      }
    }
    return {
        // 错误提示
        errorTip: true,
        // 表单字段
        loginForm: {
            
            pass: '',
        
            phone: ''
        },
        // 表单验证规则
        rules: {
            pass: [
            { validator: validPass, trigger: 'blur' }
            ],
            phone: [
            { trigger: 'blur', validator: validPhone }
            ]
        }
    }
  },
  methods: {
    
    submitForm (formName) {
        let vm = this;
        
        vm.$refs[formName].validate((valid) => {
            if (valid) {
            
            vm.$axios.post(vm.ports.submit.login,vm.loginForm)
                .then(function(res){
                    let data = res.data
                    vm.errorTip = data.success;
                
                })
                .catch(function(err){
                    return false
                });
            }else {
            return false;
            }
        });
    },
    findPassword () {
        let vm = this
        vm.$router.push({
            path:'/findpassword'
        })
    }

   
    
  }
}
</script>

<style scoped lang="less">
.login-box{
    margin-top: 20px;
    .login-title{
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
        margin-left: 45px
    }
    .error-tip{
        color: red;
        font-size: 12px;
        margin-left: 100px;
        margin-bottom: 10px;
    }
    .forget-password{
        text-align: center;
        font-size: 12px;
        margin-bottom: 20px;
        margin-left: 45px;
        color: #4a90e2;
        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    }
    .el-button--primary{
        width: 250px
    }
}
</style>
