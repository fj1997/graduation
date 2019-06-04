<template>
  <div class="course-manage">
    <el-button :autofocus="true" @click="getPublish" :class="isActive?'active-button':''">已发布</el-button>
    <el-button @click="getUnPublish" :class="!isActive?'active-button':''">未发布</el-button>
    <ul class="course-list-wrap clearfix" v-if="tableData.length">
     
      <li v-for="(item,idx) in tableData" :key="idx" @click='courseDetail(item.courseId,item.courseName)'>
        <img :src="`http://62.234.57.192:8080/file/`+item.coursePhotoUrl" alt="" >
        <span class="course-name">{{item.courseName}}</span>
        <span class="course-type">{{type[item.courseType]}}</span>
        <p class="course-teacher-info">
          <span>开课时间：{{item.courseBeginTime}}</span>-<span> {{item.courseEndTime}}</span>
          <span class="detele" @click.stop='deleteCourse(item.courseId)'>删除</span>
        </p>
      </li>
    </ul>
    <div v-if="!tableData.length" class="empty">
      暂无数据
    </div>
    <!-- 分页 -->
    <div class="block" v-show="pageSwitch">
    <el-pagination
      background
      @current-change= "handleCurrentChange"
      :current-page.sync= "pageNum"
      :page-size= "pageSize"
      layout= "prev, pager, next, jumper"
      :total= "total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import { format } from '@assets/js/date.js';
export default {
  data () {
    return {
      isActive:true,
      pageNum:1,
      pageSize: 10,
      total:10,
      courseStatus: 1, //1未发布，2已发布
      tableData: [],
      pageSwitch:true,
      type:{
       1:'校内',
       2:'校外'
     }
    }
  },
  mounted(){
    let vm = this;
    vm.getPublish();
  },
  methods:{

     /**
     * 获取已发布课程列表
     */
   getPublish() {
      let vm = this;
     vm.isActive = true;
      vm.courseStatus = 2;
      vm.pageNum=1;
      vm.getList();
    },
    /**
     * 获取未发布课程列表
     */
    getUnPublish() {
      let vm = this;
      vm.isActive = false;
      vm.courseStatus = 1;
       vm.pageNum=1;
      vm.getList();
    },
    /**
     * 获取校内课程列表
     */
    getList() {
        let vm= this;
          vm.loading = true;
        vm.$axios.post('/course/status',{
            pageNum:vm.pageNum,
            pageSize:vm.pageSize,
            userId:sessionStorage.getItem('userId'),
            courseStatus:vm.courseStatus
        })
        .then(function(res){
        let data = res.data
        //成功后
         
        if(data.result){
            vm.tableData = data.data.list;
            vm.tableData.forEach(function (item, index, array) {
                item.courseBeginTime = format(item.courseBeginTime);
                item.courseEndTime = format(item.courseEndTime);
            });
            vm.total = data.data.total;
            if(vm.total){
              vm.pageSwitch = true;
            }else{
              vm.pageSwitch = false;
            }
            vm.loading=false;
        }else{
            vm.$message({
            type: 'error',
            message: '未知错误!'
            });
        }
    })
    .catch(function(err){
        return false
    });
    },
     /**
     * 获取当前页的数据
     */
    handleCurrentChange(val) {
        let vm=this;
        vm.pageNum=val;
        vm.getList();
    },
    /**
     * 删除课程
     */
    deleteCourse(courseId){
      let vm= this;
      vm.$axios.delete(`/course/course/${courseId}`)
      .then(function(res){
        let data =res.data;
        if(data.result){
          vm.$message({
              type: 'success',
              message: '删除成功!'
            });
        if( vm.userType ==1){
          vm.getPublish()
        }else{
          vm.getUnPublish();
        }
      }else{
          vm.$message({
          type: 'error',
          message: '删除失败!'
          });
      }
        
      })
      .catch(err => {
        return false
      });
    },
    /**
     * 进去课程详情页面
     */
   courseDetail(id,name){
      let vm = this;
      if(vm.courseStatus == 2){
         vm.$router.push({
            path:'/teacher/courseManage/addSection',
            query:{
              courseId:id,
              courseName:name
            }
        })
      }
       
    }
  }
}
</script>

<style scoped lang="less">
.course-manage{
  // position: relative;
}
.empty{
  text-align: center;
  margin-top: 200px;
}
.active-button{
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.block{
    width: 572px;
    text-align: center;
    position: absolute;
    bottom: 0px;
    left: 50%;
    margin-left: -289px;
}
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
          .delete{
            z-index:100;
            position:relative;
          }
          
        }
      }
      .clearfix {
        clear: both;
        zoom: 1;
      }
    }
    
</style>
