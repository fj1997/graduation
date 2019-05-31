<template>
  <div>
    <!-- <el-button :autofocus="true" @click="getPublish" :class="isActive?'active-button':''">已发布</el-button>
    <el-button @click="getUnPublish" :class="!isActive?'active-button':''">未发布</el-button> -->
    <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="问题：">
                    <span>{{ props.row.questionContent }}</span>
                </el-form-item>
                <el-form-item label="答案：">
                    <span>{{ props.row.workContent }}</span>
                </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
            prop="userName"
            label="学生姓名"
            width="180">
        </el-table-column>
        
        <!-- 打分 -->
        <el-table-column
            label="操作"
            align="right">
            <template slot-scope="scope">
            <el-input-number v-model="scope.row.score" :step="10" :min="0" :max="100" class="number"></el-input-number>
            <el-button
                size="mini"
                type="success"
                @click="postScore(scope.row)">打分</el-button>
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
      url:''
      
    }
  },
  computed:{
    courseId(){
        let vm = this;
        return vm.$route.query.courseId;
    },
    type(){
        let vm = this;
        return vm.$route.query.type;
    }
  },
  mounted(){
    let vm = this;
    vm.getCourseScore()
  },
  methods: {
    /**
     * 
     */
   getCourseScore() {
      let vm = this;
     vm.isActive = true;
      vm.getList();
    },
    /**
     * 
     */
    getUnPublish() {
      let vm = this;
      vm.isActive = false;
      vm.getList();
    },
    /**
     * 获取课程答案列表
     */
    getList() {
        let vm= this;
        vm.loading = true;
        if(vm.type==1){
            vm.url='/work/section/'+vm.courseId;
        }else{
             vm.url='/work/course/'+vm.courseId;
        }
        vm.$axios.get(vm.url)
        .then(function(res){
        let data = res.data
        //成功后
         
        if(data.result){
            vm.tableData = data.data;
            vm.tableData.forEach(function(item){
                item.score = 0;
            })
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
     * 打分
     */
    postScore(row){
        let vm= this;
          
            vm.$axios.put('/work/score',{
                workId:row.workId,
	            workScore:row.score
            })
            .then(function(res){
                let data = res.data
                //成功后
                
                if(data.result){
                   vm.$message({
                    type: 'success',
                    message: '成功打分!'
                    });
                   vm.getCourseScore();
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
  .number{
      position: relative;
      z-index: 100;
  }
</style>
