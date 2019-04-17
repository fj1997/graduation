<template>
  <div class="main-box">
    <p class="course-img">
      重庆邮电大学优质校内课程
    </p>
    <div class="course-title">
      <img src="../../assets/img/book.jpg" alt="" class="course-logo">
      <div class="course-wrap-intro">
        <p class="excellent-course">精品课程</p>
        <p class="couser-explain">自主学习，让优秀成为一种习惯</p>
      </div>
    </div>
   <ul class="course-list-wrap clearfix">
      <li v-for="(item,idx) in courseList" :key="idx">
        <img src="../../assets/img/course1.jpg" alt="" >
        <p class="course-name">{{item.name}}</p>
        <p class="course-teacher-info">
          <span>{{item.school}}</span><span>{{item.teacher}}</span>
        </p>
      </li>
    </ul>
    <pagination 
      v-on:getList="getCourseList1"
      :url="url"
      >
    </pagination>
  </div>
</template>

<script>
import Pagination from '@/components/common/pagination.vue'
export default {
  data () {
    let vm = this;
    return {
     courseList:[],
     url:vm.ports.course.out
    }
  },
  components:{
    'pagination': Pagination
  },
  methods:{
    getCourseList1(courseList){
      let vm = this;
      vm.courseList = courseList;
      console.log(vm.courseList)
    }
  }
}
</script>

<style scoped lang="less">
  .main-box {
    position: relative;
    top: 70px;
    .course-img {
      width: 100%;
      height: 476px;
      background-image: url("../../assets/img/inschool.jpg");
      background-repeat: no-repeat;
      background-size: 100%;
    }
    .course-title {
      width: 1300px;
      margin: 30px auto;
      .course-logo {
        width: 100px;
        height: 80px;
        margin-left: 100px;
        vertical-align: -9px;
      }
      .course-wrap-intro {
        display: inline-block;
        .excellent-course {
          font-size: 24px;
          color: #3D4059;
        }
        .couser-explain {
          margin-top: 10px;
          font-size: 12px;
          color: #777;
        }
      }
    }
    .course-list-wrap {
      width: 1300px;
      margin: 30px auto;
      li {
        width: 285px;
        display: inline-block;
        margin: 0 20px 25px;
        background: #fff;
        border-radius: 6px;
        list-style: none ;
        cursor: pointer;
        &:hover{
          -moz-box-shadow: 2px 2px 2px #777; /* 老的 Firefox */
          box-shadow: 2px 2px 2px #ddd;
        }
        img{
          width: 285px;
          height: 160px;
          object-fit: cover;
          border-radius: 6px;
        }
        .course-name{
          padding: 0 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 17px;
          line-height: 22px;
          color: #3D4059;
          font-size: 16px;
        }
        .course-teacher-info{
          padding: 0 15px;
          margin-top: 11px;
          line-height: 16px;
          color: #a1a2b2;
          margin-bottom: 50px;
          span{
            color: #777993;
            font-size: 12px;
            margin-right: 10px;
          }
        }
      }
      .clearfix {
        clear: both;
        zoom: 1;
      }
    }
  }
</style>
