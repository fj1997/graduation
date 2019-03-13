<template>
  <div class="title-box">
    <div class="title-context">
        <img  class="title-logo" src="../assets/school.png">
        <div class="title-detail-box">
          <p class="title-detail">课程广场</p>
          <p class="title-detail">我的学习</p>
        </div>
      <div class="title-login">
        <p>登录</p>
        <p>注册</p>
      </div>
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
    width: 100%;
    height: 80px;
    .title-context{
      width:1280px;
      position: relative;
      margin: auto;
      .title-logo{
        position: relative;
        top: 20px;
      }
      .title-detail-box{
        border-left: solid 1px #e1e7eb;
        display: inline-block;
        .title-detail{
          width: 115px;
          height: 80px;
          text-align: center;
          line-height: 80px;
          border-right: solid 1px #e1e7eb;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .title-login{
        position: absolute;
        right: 50px;
        top:20px;
        p{
          display: inline-block;
          margin-left: 20px;
        }
      }
    }
  }
</style>
