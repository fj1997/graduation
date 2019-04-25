<template>
  <div class="course-detail-box clearfix">
    <div class="course-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="课程详情" name="first">
        <detail :courseDetail="courseDetail"></detail>
      </el-tab-pane>
      <el-tab-pane label="课程评价" name="second">
        <evaluate :evaluate="evaluate"></evaluate>
      </el-tab-pane>
    </el-tabs>
    </div>
    <div class="teacher-intro">
      <img src="../../assets/img/portrait.png" class="head-portrait">
      <div class="teacher-basic-info">
        <p>
          <span>{{courseDetail.teacherInfo.name}}</span> · <span>{{courseDetail.teacherInfo.college}}</span>
        </p>
        <p>
          <span>{{courseDetail.teacherInfo.college}}</span> <span>{{courseDetail.teacherInfo.degree}}</span>
        </p>
      </div>
      <div class="teacher-detail-info">
        {{courseDetail.teacherInfo.intro}}
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
      activeName: 'first',
      courseDetail:{
        teacherInfo:{
          name:''
        }
      },
      evaluate:{}
    }
  },
  mounted(){
    let vm = this;
    vm.getCourseDetail();
    vm.getEvaluate();
  },
  components:{
    detail,
    evaluate
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
     getCourseDetail(){
      let vm = this;
      vm.$axios.post(vm.ports.course.detail.coursedetail,{
          courseID: "95651"
        }).then(function(res){
          let data = res.data.data;
            if(res.data.success){
              vm.courseDetail = data;
              
            }
          })
          .catch(function(err){

          });
    },
    getEvaluate(){
      let vm = this;
      vm.$axios.post(vm.ports.course.detail.evaluate,{
          "currentPage": 1,
          "pageSize": 86886,
          "courseID": "79922"
        }).then(function(res){
          let data = res.data.data;
            if(res.data.success){
              vm.evaluate = data;
              
            }
          })
          .catch(function(err){

          });
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
