<template>
  <div>
    <el-button :autofocus="true" @click="getPublish" :class="isActive?'active-button':''">已发布</el-button>
    <el-button @click="getUnPublish" :class="!isActive?'active-button':''">未发布</el-button>
    <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="课程封面：">
                    <img src="../../../assets/img/book.jpg" style="width:50px;height:50px;">
                </el-form-item>
                <el-form-item label="课程名称：">
                    <span>{{ props.row.courseName }}</span>
                </el-form-item>
                <el-form-item label="开始时间：">
                    <span>{{ props.row.courseBeginTime }}</span>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <span>{{ props.row.courseEndTime}}</span>
                </el-form-item>
                <el-form-item label="课程类型：">
                    <span>校内课程</span>
                </el-form-item>
                <el-form-item label="课程介绍：">
                    <span>{{ props.row.courseContent }}</span>
                </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
            prop="courseName"
            label="课程名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="courseBeginTime"
            label="开始时间"
            width="320"
            >
        </el-table-column>
        <el-table-column
            prop="courseEndTime"
            label="结束时间"
            width="320"
            >
        </el-table-column>
        <el-table-column
            label="课程类型"
            >
            <template slot-scope="scope">
            <span style="margin-left: 10px">校内课程</span>
            </template>
        </el-table-column>
        <!-- 已发布 -->
        <el-table-column
            v-if="courseStatus==2"
            label="操作"
            align="right">
            <template slot-scope="scope">
            <el-button
                size="mini"
                type="danger"
                @click="deleteCourse(scope.$index, scope.row)">删除</el-button>
            </template>
        </el-table-column>
        <!-- 未发布 -->
        <el-table-column
            v-if="courseStatus==1"
            label="操作"
            align="right">
            <template slot-scope="scope">
            <el-button
                size="mini"
                type="success"
                @click="publish(scope.$index, scope.row)">发布</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
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
      loading:true,
      courseType:1,   //校内课程
      courseStatus: 1, //1未发布，2已发布
      pageNum:1,
       pageSize: 10,
       total:100,
      tableData: [],
       multipleSelection: []
    }
  },
  mounted(){
    let vm = this;
    vm.getPublish()
  },
  methods: {
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
        vm.$axios.post('/course/type/status',{
            pageNum:vm.pageNum,
            pageSize:vm.pageSize,
            courseType:vm.courseType,
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
    deleteCourse(index, row){
      let vm= this;
        vm.$axios.delete(`/course/course/${row.courseId}`)
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
     * 发布课程
     */
    publish(index, row) {
      let vm= this;
        vm.$axios.patch(`/course/publish/${row.courseId}`)
        .then(function(res){
          let data =res.data;
          if(data.result){
            vm.$message({
                type: 'success',
                message: '发布成功!'
              });
          if( vm.userType ==1){
            vm.getPublish()
          }else{
            vm.getUnPublish();
          }
        }else{
            vm.$message({
            type: 'error',
            message: '发布失败!'
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
.demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
