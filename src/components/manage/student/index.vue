<template>
  <div>
    <el-button :autofocus="true" @click="getStudent" :class="isActive?'active-button':''">本校学生</el-button>
    <el-button @click="getOther" :class="!isActive?'active-button':''">自由学习人员</el-button>
    <el-table
       v-loading="loading"
      ref="filterTable"
      :data="tableData"
      style="width: 100%"
      class="table-list">
      <el-table-column
        prop="userName"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userPhone"
        label="手机号"
        width="320"
        >
      </el-table-column>
      <el-table-column
        prop="userNumber"
        label="学号"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.userNumber">{{ scope.row.userNumber }}</span>
          <span style="margin-left: 10px" v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
import { runInDebugContext } from 'vm';
export default {
  data () {
    return {
      isActive:true,
      loading:true,
      userType:2,
      pageNum:1,
       pageSize: 10,
       total:100,
       courseList:[],
      tableData: []
    }
  },
  mounted(){
    let vm = this;
    vm.getStudent()
  },
  methods: {
    /**
     * 获取本校学生列表
     */
    getStudent() {
      let vm = this;
     vm.isActive = true;
      vm.userType = 2;
      vm.pageNum=1;
      vm.getList();
    },
    /**
     * 获取自由学习者列表
     */
    getOther() {
      let vm = this;
      vm.isActive = false;
      vm.userType = 1;
       vm.pageNum=1;
      vm.getList();
    },
    /**
     * 获取学生列表
     */
    getList() {
        let vm= this;
          vm.loading = true;
        vm.$axios.post('user/type',{
          pageNum:vm.pageNum,
          pageSize:vm.pageSize,
          userType:vm.userType
            
        })
        .then(function(res){
        let data = res.data
        //成功后
        if(data.result){
          vm.tableData = data.data.list;
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
     * 删除学生
     */
    handleDelete(index, row) {
      let vm= this;
        vm.$axios.delete(`/user/${row.userId}`)
        .then(function(res){
          let data =res.data;
          if(data.result){
            vm.$message({
                type: 'success',
                message: '删除成功!'
              });
          if( vm.userType ==2){
            vm.getStudent()
          }else{
            vm.getOther();
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
