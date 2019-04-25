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
    <div class="teacher-intro">
      <img src="../../assets/img/portrait.png" class="head-portrait">
      <div class="teacher-basic-info">
        <p>
          <span>李芳菲</span> · <span>计算机学院</span>
        </p>
        <p>
          <span>博士</span> <span>副教授</span>
        </p>
      </div>
      <div class="teacher-detail-info">
        目前在吉林大学材料学院无机非金属材料工程专业，从事相关的教学与科研工作，研究领域为无机功能材料、矿物材料功能化利用、工业废弃物资源循环利用。所在专业设有国土资源部功能矿物物化性能检测方法开放研究实验室，和吉林省固体废弃物资源化利用工程研究中心。
      </div>
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
