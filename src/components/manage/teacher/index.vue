<template>
  <div>
    <el-button :autofocus="true" @click="getChecked" :class="isActive?'active-button':''">已审核</el-button>
    <el-button @click="getUnChecked" :class="!isActive?'active-button':''">未审核</el-button>
    <!-- 已审核 -->
    <el-table
      v-if="userAttest==1"
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
        label="教工号"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.userNumber">{{ scope.row.userNumber }}</span>
          <span style="margin-left: 10px" v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">已审核</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteTeacher(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 未审核 -->
    <el-table
      v-show="userAttest==0"
       v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
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
        label="教工号"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px" v-if="scope.row.userNumber">{{ scope.row.userNumber }}</span>
          <span style="margin-left: 10px" v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核状态"
        >
        <template slot-scope="scope">
          <span style="margin-left: 10px">未审核</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            @click="letPass(scope.$index, scope.row)">通过</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block" v-show="pageSwith">
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
export default {
  data () {
    return {
      isActive:true,
      loading:true,
      userType:3,   //老师列表
      userAttest: 1, //1已审核，0未审核
      pageNum:1,
       pageSize: 10,
       total:10,
      tableData: [],
       multipleSelection: [],
      pageSwith:true
    }
  },
  mounted(){
    let vm = this;
    vm.getChecked()
  },
  methods: {
    /**
     * 获取已审核老师列表
     */
   getChecked() {
      let vm = this;
     vm.isActive = true;
      vm.userAttest = 1;
      vm.pageNum=1;
      vm.getList();
    },
    /**
     * 获取未审核老师列表
     */
    getUnChecked() {
      let vm = this;
      vm.isActive = false;
      vm.userAttest = 0;
       vm.pageNum=1;
      vm.getList();
    },
    /**
     * 获取老师列表
     */
    getList() {
        let vm= this;
          vm.loading = true;
        vm.$axios.post('/user/type/attest',{
            pageNum:vm.pageNum,
            pageSize:vm.pageSize,
            userType:vm.userType,
            userAttest:vm.userAttest
        })
        .then(function(res){
        let data = res.data
        //成功后
        if(data.result){
          vm.tableData = data.data.list;
          vm.total = data.data.total;
          if(vm.total){
            vm.pageSwith = true;
          }else{
            vm.pageSwith = false;
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
     * 删除老师
     */
    deleteTeacher(index, row){
      let vm= this;
        vm.$axios.delete(`/user/${row.userId}`)
        .then(function(res){
          let data =res.data;
          if(data.result){
            vm.$message({
                type: 'success',
                message: '删除成功!'
              });
          if( vm.userType ==1){
            vm.getChecked()
          }else{
            vm.getUnChecked();
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
     * 审核通过
     */
    letPass(index, row) {
      let vm= this;
        vm.$axios.patch(`/user/attest/${row.userId}`)
        .then(function(res){
          let data =res.data;
          if(data.result){
            vm.$message({
                type: 'success',
                message: '审核成功!'
              });
          if( vm.userType ==1){
            vm.getChecked()
          }else{
            vm.getUnChecked();
          }
        }else{
            vm.$message({
            type: 'error',
            message: '审核失败!'
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
