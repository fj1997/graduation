<template>
  <div class="title-box">
    <img  class="school-logo" src="../../assets/img/school_logo.png">
    <input type="text" 
          placeholder="搜索课程名称" 
          class="search" 
          v-model="searchName"
          @keyup.enter="search">
    <span @click="search" class="icon-sousuo">
      <svg class="icon" aria-hidden="true" >
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </span>
    
    <div class="title-bar">
      <p class="course-box">
        <router-link 
          class="course"
          to="/index/incourse">
          <span @click="activeIn" :class="activeName?'active-color':''">校内课程</span>
          
        </router-link>
        <router-link 
          class="course" 
          to="/index/outcourse">
           <span @click="activeOut" :class="!activeName?'active-color':''">校外课程</span>
        </router-link>
      </p>
      <span class="login" @click="goPersonal"> 个人中心</span>
      <span class="register" @click="loginOut">退出</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchName: '',
      activeName:true
    }
  },
  methods: {
    goPersonal() {
      let vm = this
      vm.$router.push({
        path:'/student/courseManage'
      })
    },
    activeIn(){
      let vm = this;
      vm.activeName = true;
    },
    activeOut(){
      let vm = this;
      vm.activeName = false;
    },
    loginOut(){
      let vm = this;
      sessionStorage.clear();
      vm.$router.push({
        path:'/login'
      })
    },
    search () {
      let vm = this
      if(vm.searchName) {
        vm.$router.push({
        path:'/search',
        query: { 
          searchName:vm.searchName
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
  .title-box{
    min-width: 960px;
    width: 100%;
    height: 70px;
    position: fixed;
    z-index: 1;
    margin: auto;
    line-height: 70px;
    background-color: #fff;
    
  }
  .school-logo{
    /*display: inline-block;*/
    margin-left:50px;
    vertical-align: middle;
  }
  .search{
    width: 300px;
    height: 28px;
    color: #fff;
    margin-left: 35px;
    border: 0;
    outline: none;
    text-indent: 20px;
    background-color: #ddd;
    border-radius: 20px;
    -webkit-appearance: none;
    &:focus { outline: none; }
    &::-webkit-input-placeholder{
      color:#fff;
    }
    &::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color:#fff;
    }
    &::-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color:#fff;
    }
    &::-ms-input-placeholder{  /* Internet Explorer 10-11 */
      color:#fff;
    }
  }
  .icon-sousuo{
    color: #fff;
    position: relative;
    left: -32px;
    top:6px;
    cursor: pointer;
  }
  .title-bar{
    line-height: 70px;
    position: absolute;
    right:50px;
    top:0px;
    .course-box{
      display: inline-block;
      padding-right: 40px;
      .active-color{
        color: #00c896
      }
      .course{
        padding-right: 30px;
        color: #777;
        text-decoration: none;
        cursor: pointer;
        &:hover{
          color:#00c896;
        }
      }
      .course-tab{
        color:#00c896;
      }
    }
    .login,
    .register{
      width: 80px;
      height: 30px;
      margin-right: 20px;
      line-height: 30px;
      text-align: center;
      color:#777;
      font-size: 14px;
      display: inline-block;
      cursor: pointer;
      &:hover{
        background-color: #00c896;
        color: #fff;
      }

    }
  }
</style>
