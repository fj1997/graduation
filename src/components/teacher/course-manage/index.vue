<template>
  <div>
    <ul class="course-list-wrap clearfix">
      <li v-for="(item,idx) in list" :key="idx" @click='courseDetail(item.courseId)'>
        <img src="../../../assets/img/course1.jpg" alt="" >
        <p class="course-name">{{item.courseName}}</p>
        <p class="course-teacher-info">
          <span>{{item.courseBeginTime}}</span><span>{{item.courseEndTime}}</span>
          <span style="z-index:100" @click='deleteCourse(item.courseId)'>删除</span>
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
        list:[
          {
              courseEndTime: "161321311213",
              courseName: "《操作系统》",
              courseType: 1,
              coursePhotoUrl: "xxxxxxxxxx",
              courseBeginTime: "161321319613",
              courseId: 1,
              courseContent: "这里是操作系统的简介哦，操作系统简介可以看这里"
          },
          {
              courseEndTime: "161321311213",
              courseName: "《数据库》",
              courseType: 1,
              coursePhotoUrl: "xxxxxxxxxx",
              courseBeginTime: "161321319613",
              courseId: 2,
              courseContent: "这里是数据库的简介哦，数据库简介可以看这里"
          },
          {
              courseEndTime: "161321311213",
              courseName: "《数据库》",
              courseType: 1,
              coursePhotoUrl: "xxxxxxxxxx",
              courseBeginTime: "161321319613",
              courseId: 2,
              courseContent: "这里是数据库的简介哦，数据库简介可以看这里"
          },{
              courseEndTime: "161321311213",
              courseName: "《数据库》",
              courseType: 1,
              coursePhotoUrl: "xxxxxxxxxx",
              courseBeginTime: "161321319613",
              courseId: 2,
              courseContent: "这里是数据库的简介哦，数据库简介可以看这里"
          },
          {
              courseEndTime: "161321311213",
              courseName: "《数据库》",
              courseType: 1,
              coursePhotoUrl: "xxxxxxxxxx",
              courseBeginTime: "161321319613",
              courseId: 2,
              courseContent: "这里是数据库的简介哦，数据库简介可以看这里"
          },
          {
              courseEndTime: "161321311213",
              courseName: "《数据库》",
              courseType: 1,
              coursePhotoUrl: "xxxxxxxxxx",
              courseBeginTime: "161321319613",
              courseId: 2,
              courseContent: "这里是数据库的简介哦，数据库简介可以看这里"
          },{
              courseEndTime: "161321311213",
              courseName: "《数据库》",
              courseType: 1,
              coursePhotoUrl: "xxxxxxxxxx",
              courseBeginTime: "161321319613",
              courseId: 2,
              courseContent: "这里是数据库的简介哦，数据库简介可以看这里"
          }
      ]
    }
  },
  methods:{
    /**
     * 删除课程
     */
    deleteCourse(courseId){
      let vm= this;
      console.log(courseId)
        // vm.$axios.delete(`/course/course/${courseId}`)
        // .then(function(res){
        //   let data =res.data;
        //   if(data.result){
        //     vm.$message({
        //         type: 'success',
        //         message: '删除成功!'
        //       });
        //   if( vm.userType ==1){
        //     vm.getPublish()
        //   }else{
        //     vm.getUnPublish();
        //   }
        // }else{
        //     vm.$message({
        //     type: 'error',
        //     message: '删除失败!'
        //     });
        // }
          
        // })
        // .catch(err => {
        //   return false
        // });
    },
    /**
     * 进去课程详情页面
     */
   courseDetail(id){
      let vm = this
        vm.$router.push({
            path:'/teacher/courseManage/addSection',
            query:{
              courseId:id
            }
        })
    }
  }
}
</script>

<style scoped lang="less">
.course-list-wrap {
      // width: 1300px;
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
</style>
