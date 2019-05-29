<template>
  <div>
 
    <h3>{{courseName}}</h3>
    <el-table
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
            prop="userName"
            label="姓名"
            width="180">
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
            prop="userAttest"
            label="身份">
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
export default {
 data() {
      return {

        tableData:[],
        loading:true
      }
},
computed:{
    courseId(){
        let vm = this;
        return vm.$route.query.courseId;
    },
    courseName(){
        let vm = this;
        return vm.$route.query.courseName;
    },
    userId(){
        let vm = this;
        return sessionStorage.getItem('userId');
    }
},
mounted(){
    let vm = this;
    vm.getList();
},
methods: {
        /**
     * 获取课程列表
     */
    getList() {
        let vm= this;
        vm.loading = true;
        vm.$axios.get('/user/course/'+vm.courseId)
        .then(function(res){
            let data = res.data;
        //成功后
    
        if(data.result){
            vm.tableData = data.data;
            vm.tableData.forEach(function(item){
                if(item.userAttest==0){
                    item.userAttest = '自由学习人员';
                }else{
                    item.userAttest = '重邮学生'
                }
                vm.$axios.get(`/work/score/${vm.courseId}/${item.userId}`)
                    .then(function(res){
                    let data = res.data;
                    if(data.result){
                        item.finalScore = data.data.finalScore;
                        item.normalScore = data.data.normalScore;
                        vm.$axios.get(`/score/user/course/${item.userId}/${vm.courseId}`)
                        .then(function(res){
                            let data =res.data;
                            if(data.result){
                                item.score= data.data;
                                item.totalScore =parseInt(item.normalScore*0.3+0.42*item.finalScore*0.6+item.score*0.28);
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

                })
                    
        }else{
                vm.$message({
                type: 'error',
                message: '未知错误!'
                });
            }
        })
        .catch(function(err){
            return false
        })
    }
}
    
}
</script>

<style scoped lang="less">
.line{
    margin-top: 20px;
}
.empty{
  text-align: center;
  margin-top: 200px;
}
</style>
