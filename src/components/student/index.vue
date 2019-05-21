<template>
  <div class="index">
    <!-- <header-bar></header-bar> -->
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
    },
  components:{
      
    'header-bar': Header
  },
   
    
}
</script>

<style>
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

