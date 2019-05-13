<template>
  <div>
    
    <el-button type="primary" @click="LookCourseTest" >查看期末测试</el-button>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        prop="sectionName"
        label="章节名称"
        width="280">
      </el-table-column>
      <el-table-column
        prop="sectionDescription"
        label="章节描述">
      </el-table-column>
      <el-table-column
        label="章节类型"
        width="380"
        prop="sectionType">
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        width="300">
      <template slot-scope="scope">
        <el-button @click="lookWork(scope.row)" type="primary" size="small">查看作业</el-button>
      </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import { format } from '@assets/js/date.js';
export default {
  data () {
    return {
      isActive:true,
      loading:true,
      tableData: [],
      
    }
  },
  computed:{
    courseId(){
        let vm = this;
        return vm.$route.query.courseId;
    }
  },
  mounted(){
    let vm = this;
    vm.getSectionList()
  },
  methods: {
    /**
      获取章节列表
     */
    getSectionList(){
      let vm= this;
      
      vm.loading = true;
      vm.$axios.get(`/section/course/${vm.courseId}`)
        .then(function(res){
          let data = res.data
        //成功后
         
        if(data.result){
            vm.tableData = data.data;
            vm.tableData.forEach(function (item, index, array) {
              if(item.sectionType == 1){
                item.sectionType = '视频';
              }else if(item.sectionType == 2){
                item.sectionType = 'ppt';
              }else{
                item.sectionType = '文章';
              }
            });
            vm.loading=false;
          }
        })
      .catch(err => {
        return false
      });
    },

    /**
     * 查看章节测试
     */
    lookWork(row){
        let vm = this;
        vm.$router.push({
            path:'/correctWork/workDetail',
            query:{
              courseId:row.sectionId,
              type:1
            }
        })
    },
    
    /**
     * 查看期末测试
     */
    LookCourseTest(){
        let vm = this;
        vm.$router.push({
            path:'/correctWork/workDetail',
            query:{
              courseId:vm.courseId,
              type:2
            }
        })
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
