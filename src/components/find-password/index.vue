<template>
  <div class="register-banner">
    <div class="register-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="找回密码" name="three">
            <div  v-show="!regsuccess">
                <p class="findpass-title">
                    每个人都可能遇到这种情况哦
                </p>
                <el-form :model="ruleForm" :rules="rules" :hide-required-asterisk="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="电话" prop="userPhone">
                    <el-input v-model.number="ruleForm.userPhone" placeholder="请输入电话号码"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="validCode">
                    <el-input type="password" v-model="ruleForm.validCode" placeholder="请输入验证码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="userPassword">
                    <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off" placeholder="6~8个字符，含英文大小写和数字"></el-input>
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
            </div>
            
             <div v-show="regsuccess" class="success-box">           
                <back :backText='backLogin'
                    :dscrText='successText'
                    :path='path'
                    :query='query'
                ></back>
              </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import {isvalidPhone, isvalidPass} from './validate'
import {loginText} from '@assets/js/constText'
import back from '@/components/common/back.vue'
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
        regsuccess: false, //注册是否成功
        successText:loginText.findPass,//注册成功文字提示,
        backLogin:loginText.backLogin,   //返回登陆
        path:'/login',
        query: { 
          activeName:'first'
        },
        disabled: true,
        time: 0,
        inittimes:1,
        btntxt: '重新发送',
        // 表单字段
        ruleForm: {
            userPassword: '',
            validCode: '',
            userPhone: ''
        },
        // 表单验证规则
        rules: {
            userPassword: [
            { validator: validPass, trigger: 'blur' }
            ],
            userPhone: [
            { trigger: 'blur', validator: validPhone }
            ],
            validCode:[
            { required: true,message: '请输入验证码', trigger: 'blur' },
            { min: 6, max: 6, message: '请输入验证码', trigger: 'blur' }
            ]
        }
    }
  },
  computed: {
    // 验证表单的手机号是否符合正则表达式
    phonePass () {
        let vm = this;
        return isvalidPhone(vm.ruleForm.userPhone)
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
  components:{
    'back': back
  },
  methods: {
    /***
     * 找回密码
     */
    findPassword(formName) {
      let vm =this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$axios.patch(vm.ports.address+'/user/password',vm.ruleForm)
            .then(function(res){
             let data = res.data;
             if(data.result){
               vm.regsuccess = data.result;
             }else{
              vm.$message({
                type: 'error',
                message: '找回密码失败!'
              });
               vm.regsuccess = data.result;
             }
            
             
            })
            .catch(function(err){
                return false;
            });
        }else {
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
        if(isvalidPhone(vm.ruleForm.userPhone)){
            vm.time = 60;
            vm.disabled = true;
            vm.timer();

        //获取短信验证码
        vm.$axios.post(vm.ports.pwd.getcheckcode,{
          phone:vm.ruleForm.userPhone
        })
        .then(function(res){
          let data =res.data;
          if(data.result){
              vm.$message({
              type: 'success',
              message: '短信验证码发送成功!'
            });
          }else{
            vm.$message({
              type: 'error',
              message: '短信验证码发送错误!'
            });
          }
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
  .success-box{
    margin-top: 50px;
    margin-left: 90px;
    .icon-chenggong{
        color: #409EFF;
        font-size: 20px;
        vertical-align: -10px;
    }
    .success-tip{
        font-size: 20px;
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
