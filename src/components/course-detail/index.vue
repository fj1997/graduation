<template>
  <div>
    <header-bar></header-bar>
    <div class="mian-box">
      <div class="courseHome-wrap clearfix">
        <div class="img-box">
          <img :src="`http://62.234.57.192:8080/file/`+basicData.coursePhotoUrl" alt="" >
        </div>
        <div class="add-course">
          <add-course :basicData="basicData" :courseId="courseId"></add-course>
        </div>
      </div>
      <div class="intro-box">
        <course-intro :courseDetail="courseDetail"></course-intro>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header/index'
import AddCourse from './addCourse'
import courseIntro from './courseIntro.vue';
import { format } from '@assets/js/date.js';
export default {
  data () {
   return {
      count:0,
      basicData:{},
      courseDetail:{},
      evaluateDetail:{}
    }
  },
  components:{
    'header-bar': Header,
    'add-course': AddCourse,
    'course-intro': courseIntro
  },
  computed:{
    courseId (){
      let vm = this;
      return vm.$route.query.courseId;
    },
    courseName(){
      let vm = this;
      return vm.$route.query.courseName;
    }
  },
  mounted(){
    let vm = this;
    vm.getBasicInfo();
  },
  methods:{
    /**
     * 获取课程信息
     */
    getBasicInfo(){
      let vm = this;
      vm.$axios.get(`/course/course/${vm.courseId}`)
        .then(function(res){
          let data = res.data;
            if(data.result){
              vm.basicData = data.data;
              vm.basicData.courseBeginTime = format(vm.basicData.courseBeginTime);
              vm.basicData.courseEndTime = format(vm.basicData.courseEndTime);
            }
          })
          .catch(function(err){
              return false
          });
    },
    
    getCourseDetail2(){
      let vm = this;
      vm.$axios.post(vm.ports.course.detail.coursedetail,{
          courseID: "95651"
        }).then(function(res){
          let data = res.data.data;
            if(res.data.success){
              vm.videoSrc = data.videoSrc;
              vm.videoPoster = data.VideoPlayer;
              vm.basicData = data;
              
            }
          })
          .catch(function(err){

          });
    },
    getEvaluate(){
      let vm = this;
      vm.$axios.post(vm.ports.course.detail.evaluate,{
          courseID: "95651"
        }).then(function(res){
          let data = res.data.data;
            if(res.data.success){
              vm.videoSrc = data.videoSrc;
              vm.videoPoster = data.VideoPlayer;
              vm.basicData = data;
              
              
            }
          })
          .catch(function(err){

          });
    }
  }
  }

</script>

<style scoped lang="less">
.mian-box{
  
  position: relative;
  // z-index: -1;
  .courseHome-wrap{
    width: 1205px;
    margin: 0 auto;
    padding: 120px 72px 20px 72px;
    background: #fff;
    .img-box{
        float: left;
        img{
          width:480px;
        }
      }
      .add-course{
        float: right;
        margin-right: 70px;
      }
  }
  .intro-box{
    padding-top: 25px;
    background: #f5f5f5;
    
  }
  
}
</style>
