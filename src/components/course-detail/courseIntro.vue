<template>
  <div class="course-detail-box clearfix">
    <div class="course-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="课程详情" name="first">
        <detail></detail>
      </el-tab-pane>
      <el-tab-pane label="课程评价" name="second">
        <evaluate></evaluate>
      </el-tab-pane>
    </el-tabs>
    </div>
    <div class="techer-intro">
      老师介绍
    </div>
  </div>
</template>

<script>
import detail from './detail/index.vue'
import evaluate from './evaluate/index.vue'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  components:{
    detail,
    evaluate
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped lang="less">
.course-detail-box{
    width: 1205px;
    margin: 0 auto;
    .course-box{
      width: 808px;
      float: left;
      margin-right: 20px;
      padding: 0 40px;
      background: #fff;
    }
    .techer-intro{
      width: 245px;
      height: 250px;
      padding: 25px;
      display: inline-block;
      background: #fff;
      
    }
}
</style>
