<template>
  <div class="title-box">
    <img  class="school-logo" src="../../assets/img/school_logo.png">
    <input type="text" placeholder="搜索课程名称、老师等" class="search">
    <svg class="icon icon-sousuo" aria-hidden="true" >
      <use xlink:href="#icon-sousuo"></use>
    </svg>
    <div class="title-bar">
      <p class="course-box">
        <router-link class="course" to="/index/incourse">校内课程{{msg}}</router-link>
        <router-link class="course" to="/index/outcourse">校外课程</router-link>
      </p>
      <span class="login" @click="goLogin"> 登录</span>
      <span class="register" @click="goRegister">注册</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  created () {
    let vm =this;
    vm.test();
    // this.$axios.get(this.ports.manage.login)
    //   .then(function(res){
      

    //   })
    //   .catch(function(err){

    //   });
        
  },
  methods: {
    goLogin () {
      let vm = this
      vm.$router.push({
        path:'/login',
        query: { 
          activeName:'first'
          }
      })
    },
    goRegister () {
      let vm = this
      vm.$router.push({
        path:'/register',
        query: { 
          activeName:'second'
          }
      })
    },
    test(){
      // this.$axios.post(this.ports.pwd.getcheckcode,{
      //   phone:'15084306826'
      // })
      // .then(function(res){
      // console.log(res.data)

      // })
      // .catch(function(err){

      // });
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
  }
  .title-bar{
    line-height: 70px;
    position: absolute;
    right:50px;
    top:0px;
    .course-box{
      display: inline-block;
      padding-right: 40px;
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
      width: 50px;
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
