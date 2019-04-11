<template>
  <div class="register-banner">
    <div class="register-box">
      <el-tabs v-model="activeName" >
        <el-tab-pane label="登陆" name="first">
         <login></login>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <register></register>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import Register from '@/components/register/register' 
import Login from '@/components/register/login' 
export default {
  data () {
    let vm = this;
    return {
     activeName: vm.$route.query.activeName
    }
  },
  components:{
    'Register' : Register,
    'Login': Login
  },
   methods:{
     /** */
      handleClick(tab) {
        let vm = this;
        if(tab.name == "first") {
          
          vm.$router.push({
            path:'/login',
            query: { 
              activeName:'first'
              }
          })
        } else if(tab.name == "second") {
          vm.$router.push({
            path:'/register',
            query: { 
              activeName:'second'
              }
          })
        }
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
    width: 362px;
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
