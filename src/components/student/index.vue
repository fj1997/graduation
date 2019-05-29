<template>
  <div class="index">
    <el-header>
      <img  class="school-logo" src="../../assets/img/school_logo.png">
       <p class="title-name">个人中心</p>
       <p class="home" @click="goIndex">首页</p>
       <p class="login-out" @click="loginOut">退出</p>
     </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
          <el-menu-item index="/student/courseManage">
            <i class="el-icon-document"></i>
            <span slot="title">课程管理</span>
          </el-menu-item>
          <el-menu-item index="/student/studentScore">
            <i class="el-icon-menu"></i>
            <span slot="title">课程成绩</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-main>
          <transition>
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/header/index.vue'
export default {
  name: 'Index',
  data() {
    return{
      
    }
    },
  components:{
      
    'header-bar': Header
  },
  methods:{
    loginOut(){
      let vm = this;
      sessionStorage.clear();
      vm.$router.push({
        path:'/login'
      })
    },
    goIndex(){
      let vm = this;
      vm.$router.push({
        path:'/index/incourse'
      })
    }
  }
    
}
</script>

<style scoped lang="less">
  .index{

.mian-container{
  margin: 10px 0;
  // background: #ccc;
  }
.main-nav{
  float: left;
  background: #fff;
  width: 200px;
  position: fixed;
  li{
    list-style: none;
    height: 50px;
    line-height: 50px;
    a {
      text-decoration: none;
    }
    .router-link-active {
      text-decoration: none;
    }
  }
  }
.mian-content{
  width: calc(100% - 200px);
  float: right;/*或者float:left*/
  position: relative;
  min-height: 500px;
 
 
  }
  .el-menu {
    height: calc(100vh - 60px);
  }

  .el-header {
    background-color:rgb(84, 92, 100);
    color: #fff;
    line-height: 60px;
  }
  .title-name{
    font-size: 24px;
    display: inline-block;
  }
  .home{
    display: inline-block;
    margin-left: 80px;
    cursor: pointer;
  }
  .login-out{
    display: inline-block;
    float:right;
    cursor: pointer;
  }
  .el-aside {
    height: calc(100vh - 60px);
    color: #333;
  }

  .el-container {
    height: calc(100vh - 60px);
  }
}
</style>

