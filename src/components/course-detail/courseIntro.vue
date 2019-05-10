<template>
  <div class="course-detail-box clearfix">
    <div class="course-box">
      <el-tabs v-model="activeName" tab-position="left">
      <el-tab-pane label="课程详情" name="first">
        <detail></detail>
      </el-tab-pane>
      <el-tab-pane label="学生提问" name="second">
        <evaluate></evaluate>
      </el-tab-pane>
    </el-tabs>
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
  mounted(){
   
  },
  components:{
    detail,
    evaluate
  },
  methods: {
  }
}
</script>

<style scoped lang="less">
.course-detail-box{
    
    .course-box{
      width: 1000px;
      padding: 0 40px;
      background: #fff;
    }
    .teacher-intro{
      width: 245px;
      padding: 25px;
      // float: left;
      display: inline-block;
      background: #fff;
      .head-portrait{
        width: 55px;
        height: 55px;
        border-radius: 50%;
        display: inline-block;
      }
      .teacher-basic-info{
        display: inline-block;
        line-height: 28px;
        color: #3D4059;
      }
      .teacher-detail-info{
        margin-top: 15px;
        font-size: 13px;
        color: #999;

      }
    }
}
</style>
