<template>
  <div class="index">
     <el-header>
       <p class="title-name">后台管理系统</p>
       <p class="login-out" @click="loginOut">退出</p>
     </el-header>
    <el-container>
     
      <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
          <el-menu-item index="/manage/student">
            <i class="el-icon-menu"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/teacher">
            <i class="el-icon-setting"></i>
            <span slot="title">教师管理</span>
          </el-menu-item>
          <el-menu-item index="/manage/inCourse">
            <i class="el-icon-menu"></i>
            <span slot="title">校内课程</span>
          </el-menu-item>
          <el-menu-item index="/manage/outCourse">
            <i class="el-icon-document"></i>
            <span slot="title">校外课程</span>
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
import Header from '@/components/header/index'

export default {
  data () {
    return {
      tabPosition: 'left'
    }
  },
  components: {
    'header-bar': Header
  },
  methods:{
    loginOut(){
      let vm = this;
      sessionStorage.clear();
      vm.$router.push({
        path:'/manage/login'
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
