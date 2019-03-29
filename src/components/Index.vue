<template>
  <div class="title-box">
    <img  class="school-logo" src="../assets/img/school_logo.png">
    <input type="text" placeholder="搜索课程名称、老师等" class="search">
    <svg class="icon icon-sousuo" aria-hidden="true" >
      <use xlink:href="#icon-sousuo"></use>
    </svg>
    <div>
      <span> 登陆</span>
      <span>注册</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style scoped lang="less">
  .title-box{
    min-width: 960px;
    margin: auto;
    height: 70px;
    line-height: 70px;
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
  /*.title-box{*/
    /*width: 100%;*/
    /*height: 80px;*/
    /*.title-context{*/
      /*width:1280px;*/
      /*position: relative;*/
      /*margin: auto;*/
      /*.title-logo{*/
        /*position: relative;*/
        /*top: 20px;*/
      /*}*/
      /*.title-detail-box{*/
        /*border-left: solid 1px #e1e7eb;*/
        /*display: inline-block;*/
        /*.title-detail{*/
          /*width: 115px;*/
          /*height: 80px;*/
          /*text-align: center;*/
          /*line-height: 80px;*/
          /*text-decoration: none;*/
          /*display: inline-block;*/
          /*vertical-align: middle;*/
          /*color: #6b767e;*/
          /*border-right: solid 1px #e1e7eb;*/
        /*}*/
      /*}*/
      /*.title-login{*/
        /*position: absolute;*/
        /*right: 50px;*/
        /*top:20px;*/
        /*p{*/
          /*display: inline-block;*/
          /*margin-left: 20px;*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/
  /*.course-intro{*/
    /*height: 100%;*/
    /*background-color: #f4f4f4;*/
  /*}*/
</style>
