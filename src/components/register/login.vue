<template>
    <div class="login-box">
        <p class="login-title">
            欢迎登陆
        </p>
        <p class="error-tip" v-show="!errorTip">
            用户名和密码错误，请再试一次
        </p>
        <el-form :model="loginForm" :rules="rules" :hide-required-asterisk="true" ref="loginForm" label-width="100px" class="demo-loginForm">
            <el-form-item label="电话" prop="userPhone">
              <el-input v-model="loginForm.userPhone" placeholder="请输入电话号码"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
              <el-input type="password" v-model="loginForm.userPassword" autocomplete="off" placeholder="6~8个字符，含英文大小写和数字"></el-input>
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
import store from '@/vuex/store';
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
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
            
            userPassword: '',
        
            userPhone: ''
        },
        // 表单验证规则
        rules: {
            userPassword: [
                { 
                    // validator: validPass, 
                    trigger: 'blur' 
                }
            ],
            userPhone: [
                { 
                    // validator: validPhone,
                    trigger: 'blur'
                }
            ]
        }
    }
  },
  methods: {
    ...mapMutations(['getUserPassword','getUserPhone','getUserType','getUserName','getUserNumber','getUserId']),
    submitForm (formName) {
        let vm = this;
        
        vm.$refs[formName].validate((valid) => {
            if (valid) {

            //用户登录
            vm.$axios.post('/user/login',vm.loginForm)
                .then(function(res){
                    let data = res.data

                    //成功后
                    if(data.result){

                        //获取用户信息（用户登录后）
                        

                        vm.$axios.get('/user/user/'+data.data)
                            .then(function (res) {
                                if(res.data.result){
                                    let userData = res.data.data;
                                    // vm.getUserPassword(userData.userPassword);
                                    // vm.getUserPhone(userData.userPhone);
                                    // vm.getUserType(userData.userType);
                                    // vm.getUserName(userData.userName);
                                    // vm.getUserNumber(userData.userNumber);
                                    // vm.getUserId(userData.userId);


                                    sessionStorage.setItem('userPassword',userData.userPassword);
                                    sessionStorage.setItem('userPhone',userData.userPhone);
                                    sessionStorage.setItem('userType',userData.userType);
                                    sessionStorage.setItem('userName',userData.userName);
                                    sessionStorage.setItem('userNumber',userData.userNumber);
                                    sessionStorage.setItem('userId',userData.userId);
                                    // window.localStorage.userPassword = userData.userPassword;
                                    // window.localStorage.userPhone = userData.userPhone;
                                    // window.localStorage.userType = userData.userType;
                                    // window.localStorage.userName = userData.userName;
                                    // window.localStorage.userNumber= userData.userNumber;
                                    // window.localStorage.userId = userData.userId;
                                    if(userData.userType =='教师'){
                                        //老师管理页面
                                        vm.$router.push({
                                            path:'/teacher/courseManage'
                                        })
                                    }else{
                                        //  学习人员登陆成功后进入校内课程  
                                        vm.$router.push({
                                            path:'/index/incourse'
                                        })
                                    }
                                }
                               
                            })
                            .catch(function (err) {
                                console.log(err);
                            });

                        
                    
                    }else{
                        vm.errorTip = data.result;
                    }
                })
                .catch(function(err){
                    return false
                });
            }else {
            return false;
            }

            // $.ajax({
            //     url: '/user/login',
            //     type: 'POST',
            //     data: JSON.stringify(vm.loginForm),
            //     dataType: 'json',
            //     success: function (data, status, xhr) {             
            //         console.log(xhr.getResponseHeader('Date'));
            //     }
            // });
            
            
        });
    },
    findPassword () {
        let vm = this
        vm.$router.push({
            path:'/findpassword'
        })
    },

setCookie(c_name,value,expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
},
 getCookie(name){
     var strcookie = document.cookie;//获取cookie字符串
    var arrcookie = strcookie.split("; ");//分割
    //遍历匹配
    for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
    debugger
            return arr[1];
        }
    }
    return "";
},

clearCookie(name) {
    setCookie(name, "", -1);
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
