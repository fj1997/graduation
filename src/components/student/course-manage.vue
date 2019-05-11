<template>
  <div>
    <ul class="course-list-wrap clearfix">
      <li v-for="(item,idx) in dataList" :key="idx" v-if="dataList.length">
        <img :src="`http://62.234.57.192:8080/file/`+item.coursePhotoUrl" alt="" >
        <p class="course-name">{{item.courseName}}</p>
        <div class="course-teacher-info">
          <p>授课老师：{{item.courseUserName}}</p>
          <span>开课时间：{{item.courseBeginTime}}</span>-<span> {{item.courseEndTime}}</span>
          <p class="event">
            <span class="study">继续学习</span>
            <span class="cancleCourse" @click="cancleCourse(item.courseId)">取消课程</span>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { format } from '@assets/js/date.js';
export default {
  data () {
    return {
      dataList:[]
    }
  },
  computed:{
    userId(){
      let vm = this;
      return window.localStorage.userId;
    }
  },
  mounted(){
    let vm = this;
    vm.getCourseList();
  },
  methods:{
    /**
     * 获取已添加课程ID
     */
    getCourseList(){
      let vm= this;
      vm.$axios.get(`/curriculum/course/${vm.userId}`)
      .then(function(res){
        let data =res.data;
        if(data.result){
          //如果数据不为空
          if(data.data.length){

            data.data.forEach(function(item){

            //根据课程ID获取课程
            vm.$axios.get(`/course/course/${item.curriculumCourseId}`)
              .then(function(res){
                let data =res.data;
                if(data.result){
                  
                  //将时间戳转换成日期
                  data.data.courseBeginTime = format(data.data.courseBeginTime);
                  data.data.courseEndTime = format(data.data.courseEndTime);
                  vm.dataList.push(data.data);
                }
              })
              .catch(err => {
                return false
              });
            })
          }else{
            vm.dataList=[];
          }
        }else{
          vm.$message({
          type: 'error',
          message: '获取已添加课程失败!'
          });
      }
        
      })
      .catch(err => {
        return false
      });
    },

    /**
     * 取消课程
     */

    cancleCourse(id){
      let vm= this;
        vm.$axios.delete(`/curriculum/course/${id}/${vm.userId}`)
        .then(function(res){
          let data =res.data;
          if(data.result){
            //刷新页面
            vm.getCourseList();
            vm.$message({
              type: 'success',
              message: '取消成功!'
            });
            
            
        }else{
            vm.$message({
            type: 'error',
            message: '取消失败!'
            });
        }
          
        })
        .catch(err => {
          return false
        });
    }
  }
}
</script>

<style scoped lang="less">
.course-list-wrap {
      margin: 30px auto;
      li {
        width: 285px;
        display: inline-block;
        margin: 0 20px 25px;
        background: #fff;
        border-radius: 6px;
        list-style: none ;
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
          margin-bottom: 20px;
          p,span{
            color: #777993;
            font-size: 12px;
            margin-right: 10px;
          }
          .study{
            cursor: pointer;
            &:hover{
              color: #409EFF;
            }
          }
          .event{
            margin-top: 10px;
          }
          .cancleCourse{
            margin-left: 105px;
            cursor: pointer;
            &:hover{
              color:#409EFF;
            }
          }
        }
      }
      .clearfix {
        clear: both;
        zoom: 1;
      }
    }
</style>
