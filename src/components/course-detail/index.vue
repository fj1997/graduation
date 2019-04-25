<template>
  <div>
    <header-bar></header-bar>
    <div class="mian-box">
      <div class="courseHome-wrap clearfix">
        <div class="video-box">
          <video-player :videoSrc="videoSrc" :videoPoster="videoPoster"></video-player>
        </div>
        <div class="add-course">
          <add-course :basicData="basicData" ></add-course>
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
import VideoPlayer from '@/components/common/player'
import AddCourse from './addCourse'
import CouserIntro from './courseIntro'
import courseIntro from './courseIntro.vue';
import { ifError } from 'assert';
export default {
  data () {
   return {
      videoSrc:'',
      videoPoster:'',
      basicData:{},
      courseDetail:{},
      evaluateDetail:{}
    }
  },
  components:{
    'video-player': VideoPlayer,
    'header-bar': Header,
    'add-course': AddCourse,
    'course-intro': courseIntro
  },
  mounted(){
    let vm = this;
    vm.getBasicInfo();
    
  },
  methods:{
    getBasicInfo(){
      let vm = this;
      vm.$axios.post(vm.ports.course.detail.courseintro,{
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
    .video-box{
        float: left;
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
