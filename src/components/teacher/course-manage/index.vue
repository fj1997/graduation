<template>
  <div>
   <el-collapse accordion>
  <el-collapse-item>
    <template slot="title">
     线性代数<i class="header-icon el-icon-info"></i>
     
     <span>开课时间</span>
     <span>参加人数：122</span>
    </template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="章节名称"
        width="280">
      </el-table-column>
      <el-table-column
        prop="name"
        label="章节描述">
      </el-table-column>
      <el-table-column
        label="章节类型"
        width="380"
        prop="address">
      </el-table-column>
      <el-table-column
      fixed="right"
      width="100">
      <template slot-scope="scope">
        <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div class="button-position">
      <el-button type="text" @click="dialogFormVisible = true">添加章节</el-button>
    </div>
    

<el-dialog title="添加章节" :visible.sync="dialogFormVisible">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="章节名称" prop="sectionName">
    <el-input v-model="ruleForm.sectionName"></el-input>
  </el-form-item>
  <el-form-item label="课程类型" prop="sectionType">
    <el-radio-group v-model="ruleForm.sectionType">
      <el-radio label="视频"></el-radio>
      <el-radio label="文章"></el-radio>
      <el-radio label="ppt"></el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label="教学资源" prop="sectionFileUrl">
    <el-input type="file" v-model="ruleForm.sectionFileUrl"></el-input>
  </el-form-item>
  <el-form-item label="章节描述" prop="sectionDescription">
    <el-input type="textarea" v-model="ruleForm.sectionDescription"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</el-dialog>
  </el-collapse-item>
 
</el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        sectionId:1
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
         sectionId:2
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        sectionId:1
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
         sectionId:1
      }],
      dialogFormVisible: false,
        ruleForm: {
          sectionName: '',
          sectionType: '',
          sectionDescription: '',
          sectionFileUrl: ''
        },
        rules: {
         sectionName: [
            { required: true, message: '请输入章节名称', trigger: 'blur' }
          ],
          sectionType: [
            { required: true, message: '请选择课程类型', trigger: 'change' }
          ],
          sectionDescription: [
            { required: true, message: '请填写课程描述', trigger: 'blur' }
          ],
          sectionFileUrl: [
              { required: true, message: '请上传教学资源', trigger: 'blur' }
          ]
        },
        formLabelWidth: '120px'
    }
  },
  methods:{
    //删除章节
    deleteClick(row){
      console.log(row);
      let vm =this;
      vm.$axios.post('/section/section/'+row.sectionId)
        .then(function(res){
            let data = res.data

            //成功后
            if(data.result){
                vm.$message({
                type: 'success',
                message: '删除成功'
                });
            }else{
                vm.$message({
                type: 'error',
                message: '删除失败!'
                });
            }
        })
        .catch(function(err){
            return false
        });
    },
    //添加章节
    submitForm(formName) {
        let vm =this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            if(vm.ruleForm.sectionType =='视频'){
                vm.ruleForm.sectionType = 1
            }else if(vm.ruleForm.sectionType =='文章'){
                    vm.ruleForm.sectionType = 2
            }else if(vm.ruleForm.sectionType =='ppt'){
                    vm.ruleForm.sectionType = 3
            }
            console.log(' submit!!',vm.ruleForm);

            vm.ruleForm.sectionCourseId = 1;
            vm.$axios.post('/section/section',vm.ruleForm)
                .then(function(res){
                    let data = res.data

                    //成功后
                    if(data.result){
                        vm.$message({
                        type: 'success',
                        message: '该课程创建成功'
                        });
                    }else{
                        vm.$message({
                        type: 'error',
                        message: '课程错误!'
                        });
                    }
                })
                .catch(function(err){
                    return false
                });

            
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handlePreview(file) {
        console.log(file);
      }
  }
}
</script>

<style scoped lang="less">
.button-position{
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
</style>
