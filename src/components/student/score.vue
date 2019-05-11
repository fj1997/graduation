<template>
  <div>
    <el-table
      v-loading="loading"
      ref="filterTable"
      :data="dataList"
      style="width: 100%"
      class="table-list">
      <el-table-column
        prop="courseName"
        label="课程名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="courseUserName"
        label="授课老师"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="courseBeginTime"
        label="开始时间"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="courseEndTime"
        label="结束时间"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="normalScore"
        label="满分成绩"
        >
      </el-table-column>
      <el-table-column
        prop="finalScore"
        label="实际得分"
        width="180"
        >
      </el-table-column>
      
    </el-table>
  
  </div>
</template>

<script>
import { format } from '@assets/js/date.js';
export default {
  data () {
    return {
      dataList:[],
      loading:true
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
                  let courseData = data.data;
                  //将时间戳转换成日期
                  courseData.courseBeginTime = format(courseData.courseBeginTime);
                  courseData.courseEndTime = format(courseData.courseEndTime);

                  //回去该课程的分数
                  vm.$axios.get(`/work/score/${courseData.courseId}/${vm.userId}`)
                    .then(function(res){
                      let data = res.data;
                      if(data.result){
                        courseData.finalScore = data.data.finalScore;
                        courseData.normalScore = data.data.normalScore;
                      }
                    })
                    .catch(err => {
                      return false
                    });
                  vm.dataList.push(courseData);
                  vm.loading = false;
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
    }
  }
}
</script>

<style scoped lang="less">
.active-button{
  color: #409EFF;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}
.table-list{
  margin-top: 20px;
}
.block{
    width: 572px;
    text-align: center;
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -289px;
}
</style>
