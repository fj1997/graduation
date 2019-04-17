<template>
  <div>
    <header-bar></header-bar>
    <div class="mian-box">
      <div class="courseHome-wrap clearfix">
        <div class="video-box">
          <video-player></video-player>
        </div>
        <div class="add-course">
          <add-course></add-course>
        </div>
      </div>
      <div class="intro-box">
        <course-intro></course-intro>
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
export default {
  data () {
   return {
        
    }
  },
  components:{
    'video-player': VideoPlayer,
    'header-bar': Header,
    'add-course': AddCourse,
    'course-intro': courseIntro
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
