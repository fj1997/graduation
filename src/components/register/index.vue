<template>
  <div class="register-banner">
    <div class="register-box">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登陆" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form :model="ruleForm" :rules="rules" :hide-required-asterisk="true" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="身份" prop="identity">
              <el-select v-model="ruleForm.identity" placeholder="请选择身份">
                <el-option label="自由学习人员" value="other"></el-option>
                <el-option label="重邮学生" value="student"></el-option>
                <el-option label="教师" value="teacher"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学号/教工号" prop="usernumber" v-show="ruleForm.identity!=='other'&& ruleForm.identity">
              <el-input v-model="ruleForm.usernumber" placeholder="请输入学号/教工号"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="username">
              <el-input v-model="ruleForm.username" placeholder="设置姓名（3-5个字符）"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="设置密码,（6~8个字符，含英文大小写和数字）"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input v-model.number="ruleForm.phone" placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="checkcode">
              <el-input type="password" v-model="ruleForm.checkcode" placeholder="请输入验证码" autocomplete="off"></el-input>
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
      disabled: true,
      inittimes:1,
      btntxt: '重新发送',
      activeName: 'second',
      ruleForm: {
        username: '',
        usernumber: '',
        identity: '',
        pass: '',
        checkcode: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入姓名', trigger: 'blur', },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        usernumber: [
          { required: true, message: '请输入学号/教工号,必须是数字', trigger: 'blur',type: 'number' },
          { min: 10, max: 15, message: '长度在 10 到 15 个字符', trigger: 'blur' }
        ],
        identity: [
          { required: true, message: '请选择身份', trigger: 'change' }
        ],
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
    phonePass () {
      let vm = this;
      return isvalidPhone(vm.ruleForm.phone)
    }
  },
  watch: {
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
    submitForm(formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getVerificationCode () {
      let vm = this;
      vm.inittimes++;
      if(isvalidPhone(vm.ruleForm.phone)){
        this.time = 60;
        this.disabled = true;
        this.timer();
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + 's后重新获取';
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = '获取验证码';
        this.disabled = false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    width: 400px;
    height: 500px;
    position: absolute;
    top: 50%;
    right: 50px;
    margin-top: -250px;
    padding-top: 25px;
    padding-right: 50px;
    background: #fff;
    .el-select {
      width: 300px;
    }
  }

</style>
<style lang="less">
  .register-box {
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
