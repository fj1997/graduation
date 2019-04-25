<template>
  <div class="course-box">
    <p class="course-name">{{basicData.courseName}}</p>
    <div class="course-info">
      <p class="course-time">
          <span>课程类型：</span>
          <span>{{courseType}}</span>
      </p>
      <p class="course-time">
          <span>开课时间：</span>
          <span>2019年03月26日 ~ 2019年06月15日</span>
      </p>
      <div class="course-creidt">
        <p class="course-creidt-wrap">
          <svg class="icon icon-style" aria-hidden="true" >
              <use xlink:href="#icon-shijian2"></use>
          </svg>
          <span class="course-count">学分:</span><span class="">{{basicData.courseCount}}</span>
        </p>
        <p class="course-creidt-wrap">
          <svg class="icon icon-style" aria-hidden="true" >
            <use xlink:href="#icon-xueshimao"></use>
        </svg>
        <span class="course-count">课时:</span><span>{{basicData.courseHour}}</span>
        </p>
        <p class="course-creidt-wrap">
          <svg class="icon icon-style teacher-name" aria-hidden="true" >
            <use xlink:href="#icon-rentou"></use>
        </svg>
        <span class="course-count">教师</span><span>{{basicData.courseTeacher}}</span>
        </p>
      </div>
    </div>
    <p class="add-count">共有{{basicData.studentNum}}个人参加</p>
    <p class="add-course-button">立即参加</p>
  </div>
</template>

<script>
import {courseType} from '@assets/js/constText';
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
    basicData:{
      type: Object
    }
  },
  computed:{
    courseType(){
      let vm = this;
      return courseType[vm.basicData.courseType]
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
    .course-creidt{
      line-height: 50px;
      .course-creidt-wrap{
      display: inline-block;
      width: 150px;
      .course-count{
        padding: 0 5px;
        display: inline-block;
        margin-left: -7px;
      }
      .icon-style{
          vertical-align: -5px;
          color: #A0A6AD;
      }
      .teacher-name{
        vertical-align:-2px;
      }
    }
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
