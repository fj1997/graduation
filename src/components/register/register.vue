<template>
    <div>
      <!-- 注册页面 -->
        <div v-show="!regsuccess">
            <p class="error-tip" v-show="errorTip">
                {{errorText}}
            </p>
            <el-form :model="ruleForm" :rules="rules" :hide-required-asterisk="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="身份" prop="userType">
                <el-select v-model="ruleForm.userType" placeholder="请选择身份">
                    <el-option label="自由学习人员" value=0></el-option>
                    <el-option label="重邮学生" value=1></el-option>
                    <el-option label="教师" value=2></el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="学号/教工号" prop="userNumber" v-if="ruleForm.userType!=0">
                <el-input v-model="ruleForm.userNumber" placeholder="请输入学号/教工号"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="userName">
                <el-input v-model="ruleForm.userName" placeholder="设置姓名（3-5个字符）"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="userPassword">
                <el-input type="password" v-model="ruleForm.userPassword" autocomplete="off" placeholder="设置密码,（6~8个字符，含英文大小写和数字）"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="userPhone">
                <el-input v-model.number="ruleForm.userPhone" placeholder="请输入电话号码"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="validCode">
                <el-input type="password" v-model="ruleForm.validCode" placeholder="请输入验证码" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="button" :disabled="disabled" v-if="disabled==false" @click="getVerificationCode">发送验证码
                </el-button>
                <el-button type="button"  :disabled="disabled" v-if="disabled==true&& inittimes ==1" @click="getVerificationCode">发送验证码
                </el-button>
                <el-button type="button"  :disabled="disabled" v-if="disabled==true && inittimes !==1" @click="getVerificationCode">{{btntxt}}
                </el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">注册重邮帮</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 注册成功后的页面 -->
        <div v-show="regsuccess" class="success-box">
           
            <back :backText='backLogin'
                  :dscrText='successText'
                  :path='path'
                  :query='query'
            ></back>
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
        errorTip: false, //控制提示出现
        errorText: '', //错误提示文字
        regsuccess: false, //注册是否成功
        successText:loginText.regSuccess,//注册成功文字提示,
        backLogin:loginText.backLogin,   //返回登陆
        path:'/login',
        query: { 
          activeName:'first'
        },
        disabled: true,//禁用状态
        time: 0, //发送验证码的秒数
        inittimes:1, //控制发送验证码按钮的文字
        btntxt: '重新发送',
        // 表单字段
        ruleForm: {
            userName: '',
            userNumber: '',
            userType: '',
            userPassword: '',
            userPhone: '',
            validCode: ''
        },
        // 表单验证规则
        rules: {
            userName: [
            { required: true, message: '请输入姓名', trigger: 'blur', },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            userNumber: [
            { required: true, message: '请输入学号或教工号', trigger: 'blur'},
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            userType: [
            { required: true, message: '请选择身份', trigger: 'change' }
            ],
            userPassword: [
            { validator: validPass, trigger: 'blur' }
            ],
            userPhone: [
            { trigger: 'blur', validator: validPhone }
            ],
            validCode:[
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
    
    submitForm(formName) {
      let vm =this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {
          vm.$axios.post(vm.ports.submit.register,vm.ruleForm)
            .then(function(res){
              let data = res.data;
              if(data.result){
                
                vm.regsuccess = data.msg;
                
              }else{
                vm.errorTip = data.result;
                vm.errorText = data.msg;
              }
            })
            .catch(function(err){
                console.log(err);
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
    }
  }
}
</script>

<style scoped lang="less">
.error-tip{
    color: red;
    font-size: 12px;
    margin-left: 100px;
    margin-bottom: 10px;
}
.success-box{
    margin-top: 50px;
    margin-left: 90px;
}

</style>
