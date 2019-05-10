<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
          <el-menu-item index="/teacher/addCourse">
            <i class="el-icon-menu"></i>
            <span slot="title">添加课程</span>
          </el-menu-item>
          <el-menu-item index="/teacher/courseManage">
            <i class="el-icon-setting"></i>
            <span slot="title">课程管理</span>
          </el-menu-item>
          <el-menu-item index="/teacher/correctWork">
            <i class="el-icon-menu"></i>
            <span slot="title">作业批改</span>
          </el-menu-item>
          <el-menu-item index="/teacher/studentManage">
            <i class="el-icon-document"></i>
            <span slot="title">学生管理</span>
          </el-menu-item>
          <el-menu-item index="/teacher/replyQuestion">
            <i class="el-icon-setting"></i>
            <span slot="title">回答问题</span>
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
}
</script>

<style scoped lang="less">
.header{
  width: 100%;
  height: 55px;
}
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
    height: 100vh;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    height: 100vh;
    color: #333;
  }

  .el-container {
    height: 100vh;
  }
</style>
