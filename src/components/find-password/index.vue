<template>
  <div class="register-banner">
    <div class="register-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="找回密码" name="three">
            <p class="findpass-title">
                每个人都可能遇到这种情况哦
            </p>
            <el-form :model="ruleForm" :rules="rules" :hide-required-asterisk="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="电话" prop="phone">
                <el-input v-model.number="ruleForm.phone" placeholder="请输入电话号码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="checkcode">
                <el-input type="password" v-model="ruleForm.checkcode" placeholder="请输入验证码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="设置密码,（6~8个字符，含英文大小写和数字）"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="button" :disabled="disabled" v-if="disabled==false" @click="getVerificationCode">发送验证码
                </el-button>
                <el-button type="button"  :disabled="disabled" v-if="disabled==true&& inittimes ==1" @click="getVerificationCode">发送验证码
                </el-button>
                <el-button type="button"  :disabled="disabled" v-if="disabled==true && inittimes !==1" @click="getVerificationCode">{{btntxt}}
                </el-button>
                <el-button type="primary" @click="findPassword('ruleForm')" size="medium">找回密码</el-button>
                </el-form-item>
            </el-form>
            <p class="forget-password" @click="goLogin()"> 
            返回登陆?
            </p>
        </el-tab-pane>
      </el-tabs>
    </div>
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
        activeName: 'three',
        disabled: true,
        time: 0,
        inittimes:1,
        btntxt: '重新发送',
        // 表单字段
        ruleForm: {
            pass: '',
            checkcode: '',
            phone: ''
        },
        // 表单验证规则
        rules: {
            pass: [
            { validator: validPass, trigger: 'blur' }
            ],
            phone: [
            { trigger: 'blur', validator: validPhone }
            ],
            checkcode:[
            { required: true,message: '请输入验证码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ]
        }
    }
  },
  computed: {
    // 验证表单的手机号是否符合正则表达式
    phonePass () {
        let vm = this;
        return isvalidPhone(vm.ruleForm.phone)
    }
  },
  watch: {
    // 监听手机号码
    phonePass (newVal,oldVal) {
        let vm = this;
        if (newVal){
            vm.disabled = false;
        }else {
            vm.disabled = true;
        }
    }
  },
  methods: {
    /***
     * 找回密码
     */
    findPassword(formName) {
      let vm =this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$axios.post(vm.ports.pwd.resetpassword,vm.ruleForm)
            .then(function(res){
              console.log(res.data)
             
            })
            .catch(function(err){
                console.log(err);
                
                return false;
            });
        }else {
          console.log('error submit!!',valid);
          return false;
        }
      });
    },

    /**
     * 获取严验证码
     */
    getVerificationCode () {
        let vm = this;
        vm.inittimes++;
        if(isvalidPhone(vm.ruleForm.phone)){
            vm.time = 60;
            vm.disabled = true;
            vm.timer();

        //获取短信验证码
        vm.$axios.post(vm.ports.pwd.getcheckcode,{
            phone:'15084306826'
            }).then(function(res){
            console.log(res.data)
            })
            .catch(function(err){

            });
      }
    },

    /**@augments
     * 倒计时
     */
    timer() {
        let vm = this;
        if (vm.time > 0) {
            vm.time--;
            vm.btntxt = vm.time + 's后重新获取';
            setTimeout(this.timer, 1000);
        } else {
            vm.time = 0;
            vm.btntxt = '获取验证码';
            vm.disabled = false;
        }
    },
    /**
     * 返回登陆页面
     */
    goLogin() {
        let vm = this
        vm.$router.push({
            path:'/login',
            query: { 
          activeName:'first'
          }
        })
    }
  }
}
</script>

<style scoped lang="less">
  .register-banner{
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    min-height: 620px;
    background-image: url("../../assets/img/schoolbanner.jpg");
    background-position: center;
  }
  .register-box {
    width: 350px;
    height: 500px;
    position: absolute;
    top: 50%;
    right: 50px;
    margin-top: -250px;
    padding-top: 25px;
    padding-right: 50px;
    background: #fff;
    .findpass-title{
        text-align: center;
        font-size: 20px;
        margin-bottom: 20px;
        margin-left: 45px;
        margin-top: 30px;
        margin-bottom: 30px;        
    }
    .el-select {
      width: 300px;
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
  }

</style>
<style lang="less">
  .register-box {
    .el-select {
      width: 250px;
    }
    .el-tabs__nav-wrap{
      &::after{
        background: #fff;
      }
    }
    .el-tabs__nav{
      margin-left: 150px;
    }
  }
</style>
