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
        width="100">
      </el-table-column>
      <el-table-column
        prop="courseUserName"
        label="授课老师"
        width="100"
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
        
        label="平时作业成绩"
        >
        <template slot-scope="scope">
          {{scope.row.normalScore}}*30%
        </template>
      </el-table-column>
      <el-table-column
        label="期末简答题成绩"
        width="180"
        >
        <template slot-scope="scope">
          {{scope.row.finalScore}}*42%
        </template>
        </el-table-column>
        <el-table-column
        label="期末单选成绩"
        >
        <template slot-scope="scope">
          {{scope.row.score}}*28%
        </template>
      </el-table-column>
      <el-table-column
        prop="totalScore"
        label="总成绩"
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
      return sessionStorage.getItem('userId');
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

                        vm.$axios.get(`/score/user/course/${vm.userId}/${courseData.courseId}`)
                          .then(function(res){
                              let data =res.data;
                              if(data.result){
                                  courseData.score= data.data;
                                  courseData.totalScore =parseInt(courseData.normalScore*0.3+0.42*courseData.finalScore*0.6+courseData.score*0.28);
                                  vm.dataList.push(courseData);
                                  vm.loading = false;
                                  
                              }
                              })
                              .catch(err => {
                              return false
                              });
                       
                      }
                    })
                    .catch(err => {
                      return false
                    });
                  
                }
              })
              .catch(err => {
                return false
              });
            })
          }else{
            vm.dataList=[];
            vm.loading = false;
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
