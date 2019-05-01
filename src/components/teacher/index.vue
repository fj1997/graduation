<template>
  <div>
    <div class="header">
      头部
    </div>
    <div class="mian-container clearfix">
      <div class="main-nav">
        <ul>
          <li>
            <router-link to="/teacher/addCourse">添加课程</router-link>|
          </li>
          <li>
            <router-link to="/teacher/courseManage">课程管理</router-link>|
            
          </li>
          <li>
            <router-link to="/teacher/publishWork">发布作业</router-link>|
          </li>
          <li>
            <router-link to="/teacher/correctWork">作业批改</router-link>|
          </li>
          <li>
             <router-link to="/teacher/studentManage">学生管理</router-link>|
          </li>
          <li>
             <router-link to="/teacher/replyQuestion">回答问题</router-link>|
          </li>
          
        </ul>
      </div>
      <div class="mian-content">
        <router-view/>
      </div>
    </div>
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

 
 
  }
</style>
