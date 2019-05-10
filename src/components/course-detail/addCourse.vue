<template>
  <div class="course-box">
    <p class="course-name">{{basicData.courseName}}</p>
    <div class="course-info">
      <p class="course-time">
          <span>课程类型：</span>
          <span>{{type}}</span>
      </p>
      <p class="course-time">
          <span>授课教师：</span>
          <span>{{basicData.courseUserName}}</span>
      </p>
      <p class="course-time">
          <span>开课时间：</span>
          <span>{{basicData.courseBeginTime}} ~ {{basicData.courseEndTime}}</span>
      </p>
      <p class="course-time">
          <span>课程介绍：</span>
          <span>{{basicData.courseContent}}</span>
      </p>
    
    </div>
    <p class="add-count">共有{{count}}个人参加</p>
    <el-button type="primary" @click="addCourse">立即参加</el-button>
    <!-- <input type="button" class="add-course-button" value="立即参加" disabled="disabled"> -->
  </div>
</template>

<script>
import {courseType} from '@assets/js/constText';
export default {
  data () {
    return {
      disabled:true,
      count:0
    }
  },
  props:{
    basicData:{
      type: Object
    }
  },
  mounted(){
    let vm = this;
    vm.getCourseCount();
  },
  computed:{
    type(){
      let vm = this;
      return courseType[vm.basicData.courseType];
    },
    userId(){
      let vm = this;
      return window.localStorage.userId;
    },
    courseId (){
      let vm = this;
      return vm.$route.query.courseId;
    }
  },
  methods:{
     /**
     * 获取课程报名人数
     */
     getCourseCount(){
      let vm = this;
      vm.$axios.get(`/curriculum/course/count/${vm.courseId}`)
        .then(function(res){
          let data = res.data;
            if(data.result){
              vm.count = data.data;
            }
          })
          .catch(function(err){
              return false
          });
    },  
   /**
     * 报名参加课程
     */
     addCourse(){
       
      let vm = this;
      vm.$axios.post('/curriculum/course/'+vm.courseId+'/'+vm.userId)
        .then(function(res){
          let data = res.data;
            if(data.result){
              vm.$message({
                type: 'success',
                message: '成功报名,请进入个人中心进行学习！'
              });
            }else{
              vm.$message({
                type: 'error',
                message: data.msg
              });
            }
          })
          .catch(function(err){
              return false
          });
    }
  }
}
</script>

<style scoped lang="less">
.course-box{
  width: 600px;
  height: 284px;
  .course-name{
    margin-bottom: 20px;
    font-size: 24px;
    color: 24px;
  }
  .course-info{
    padding: 5px 10px 0px 10px;
    margin-bottom: 30px;
    background-color: #f5f5f5;
    font-size: 12px;
    .course-time{
      padding-top: 10px;
    }
  }
  .add-count{
    font-size: 13px;
    color: #999999;
    margin-bottom: 10px;
  }
  .add-course-button{
    width: 220px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    color: #fff;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    font-size: 18px;
    background-color: #ff7a3e;
    border-color: #ff7a3e;
    
  }
}
</style>
