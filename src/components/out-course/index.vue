<template>
  <div class="main-box">
    <!-- <p class="course-img">
      重庆邮电大学优质校内课程
    </p>
    <div class="course-title">
      <img src="../../assets/img/book.jpg" alt="" class="course-logo">
      <div class="course-wrap-intro">
        <p class="excellent-course">精品课程</p>
        <p class="couser-explain">自主学习，让优秀成为一种习惯</p>
      </div>
    </div> -->
    <ul class="course-list-wrap clearfix">
      <li v-for="(item,idx) in list" :key="idx" @click='courseDetail(item.courseId,item.courseName)'>
        <img :src="`http://62.234.57.192:8080/file/`+item.coursePhotoUrl" alt="" >
        <span class="course-name">{{item.courseName}}</span>
        <span class="course-type">{{type[item.courseType]}}</span>
        <p class="course-teacher-info">
          <span>开课时间：{{item.courseBeginTime}}</span>-<span> {{item.courseEndTime}}</span>
        </p>
      </li>
    </ul>
    <div v-if="!list.length" class="empty">
      暂无数据
    </div>
    <pagination 
      v-on:getList="getCourseList1"
      :url="url"
      :courseType="courseType"
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
     list:[],
     url:'/course/type/status',
     courseType:2,
     type:{
       1:'校内',
       2:'校外'
     }
    }
  },
  components:{
    'pagination': Pagination
  },
  mounted(){
    
  },
  methods:{
    /**
     * 获取课程列表
     */
    getCourseList1(list){
      let vm = this;
      vm.list = list;
    },
    /**
     * 进去课程详情页面
     */
   courseDetail(id,name){
      let vm = this;
        vm.$router.push({
            path:'/detail',
            query:{
              courseId:id,
              courseName:name
            }
        })
    }
  }
}
</script>

<style scoped lang="less">
  .main-box {
    padding-top: 70px;
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
          margin-top: 10px;
          line-height: 22px;
          color: #3D4059;
          font-size: 16px;
          display: inline-block;
        }
        .course-type{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 17px;
          line-height: 22px;
          color: #3D4059;
          font-size: 16px;
          display: inline-block;
          margin-left: 120px;
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
