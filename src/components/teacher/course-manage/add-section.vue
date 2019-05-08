<template>
  <div>
     <div class="button-position">
      <el-button type="text" @click="outerAddSection = true">添加章节</el-button>
      <el-button type="text" @click="addCourseQuestionButton">添加期末测试</el-button>
    </div>
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
        <el-button @click="addSectionQuestion(scope.row)" type="primary" size="small">添加测试</el-button>
        <el-button @click="LookSectionQuestion(scope.row)" type="primary" size="small">查看测试</el-button>
        <el-button @click="deleteSection(scope.row)" type="danger" size="small">删除章节</el-button>
      </template>
      </el-table-column>
    </el-table>

    <el-card 
      class="box-card question-box" 
      v-loading='questionLoading'
      v-if="questionData.length">
      <div slot="header" class="clearfix">
        <span>期末测试题目</span>
      </div>
      <div v-for="(item,idx) in questionData" :key="idx" class="text item">
        <span>{{idx+1}}</span> <span>{{item.questionContent}}</span>
        <el-button @click="deleteCourseQuestion(item.questionId)" type="text" size="small" style="float:right">删除测试</el-button>
      </div>
    </el-card>
   
    
<!--  添加章节  -->
<el-dialog title="添加章节" :visible.sync="outerAddSection">
    <el-form :model="outerAddForm" :rules="outerRules" ref="outerAddForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="资源类型" prop="sectionType">
      <el-radio-group v-model="outerAddForm.sectionType">
        <el-radio :label="1">视频</el-radio>
        <el-radio :label="2">ppt</el-radio>
        <el-radio :label="3">文章</el-radio>
        
      </el-radio-group>
      </el-form-item>
      <el-form-item label="教学资源" prop="sectionFileUrl">
        <el-input type="file" v-model="outerAddForm.sectionFileUrl" id="file-url"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="uploadFile('outerAddForm')">下一步</el-button>
        <el-button @click="outerAddSection=false">取消</el-button>
      </el-form-item>
    </el-form>
    
  <el-dialog
    title="章节描述"
    :visible.sync="innerAddSection"
    append-to-body>
    <el-form :model="innerAddForm" :rules="innerRules" ref="innerAddForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="章节名称" prop="sectionName">
        <el-input v-model="innerAddForm.sectionName"></el-input>
      </el-form-item>

      <el-form-item label="章节描述" prop="sectionDescription">
        <el-input type="textarea" v-model="innerAddForm.sectionDescription"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('innerAddForm')">立即创建</el-button>
        <el-button @click="innerAddSection =false">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>  
   
</el-dialog>

<!-- 添加测试  -->
<el-dialog :title="title" :visible.sync="dialogTest">
   <el-form :model="questionForm" :rules="questionRules" ref="questionForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="测试题目" prop="questionContent">
    <el-input 
      type="textarea" 
      v-model="questionForm.questionContent"
      placeholder="期末测试可以添加多道，章节测试添加一次"
      ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addCourseQuestion('questionForm',type,id)" :disabled="disabled">添加测试</el-button>
    <el-button @click="dialogTest=false">取消</el-button>
  </el-form-item>
</el-form>
</el-dialog>
<el-dialog title="测试题目" :visible.sync="dialogLookTest">
  <div>
    <div v-for="(item,idx) in questionSectionData" :key="idx" v-if="questionSectionData.length">
    {{item.questionContent}}
    <el-button @click="deleteSectionQuestion(item.questionId)" type="text" size="small" style="float:right">删除测试</el-button>
  </div>
  <div v-if="!questionSectionData.length">
      暂无试题
  </div>
  </div>

</el-dialog>

  </div>
</template>

<script>
export default {
  data () {
    return {
      loading:true,
      questionLoading:false,
      tableData: [],
      questionData:[],
      questionSectionData:[],
      disabled:false,
      title:'添加期末测试',
      type:1,
      id:1,
      outerAddSection: false,
      innerAddSection:false,
      outerAddForm: {
        sectionType: '',
        sectionFileUrl: ''
      },
      innerAddForm:{
        sectionName: '',
        sectionDescription: '',
        sectionType: '',
        sectionFileUrl: '',
        sectionCourseId:''
      },
      questionForm:{
        questionType:'',   //1、章节问题 （平时作业）2、课程问题（课程测试）
        questionCourseOrSectionId:'',//若type为1，指章节ID 为2指课程ID
        questionContent:''    
      },
      outerRules:{          //添加章节的外部框规则
        sectionType: [
          { required: true, message: '请选择章节类型', trigger: 'change' }
        ],
        sectionFileUrl: [
          { required: true, message: '请上传教学资源', trigger: 'blur' }
        ]
      },
      innerRules: {           //添加章节的内部框规则
        sectionName: [
          { required: true, message: '请输入章节名称', trigger: 'blur' }
        ],
        sectionDescription: [
          { required: true, message: '请填写课程描述', trigger: 'blur' }
        ]
        
      },
      questionRules:{
        questionContent:[
           { required: true, message: '请填写测试题目', trigger: 'blur' }
        ]
         
        
      },
      formLabelWidth: '120px',
      dialogTest:false,
      dialogLookTest:false
    }
  },
  computed:{
    courseId (){
      let vm = this;
      return vm.$route.query.courseId;
    }
  },

  mounted(){
    this.getSectionList();
    this.getQuestionList(2,this.courseId)
  },
  methods:{

    /**
      获取章节列表
     */
    getSectionList(){
      let vm= this;
      let courseId = vm.$route.query.courseId;
      vm.loading = true;
      vm.$axios.get(`/section/course/${courseId}`)
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

    //删除章节
    deleteSection(row){
      let vm =this;
      vm.$axios.delete('/section/section/'+row.sectionId)
        .then(function(res){
            let data = res.data

            //成功后
            if(data.result){
                vm.$message({
                type: 'success',
                message: '删除成功'
                });

                vm.getSectionList();
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

    //上传视频，ppt，文章等
    uploadFile(formName){
      let vm =this;
      vm.$refs[formName].validate((valid) => {
        if (valid) {

          vm.innerAddForm.sectionType = vm.outerAddForm.sectionType;
          let formData = new FormData();
          formData.append('file',document.getElementById("file-url").files[0]);
          vm.$axios.post('/file/upload',formData)
            .then(function(res){
              let data = res.data

              //成功后
              if(data.result){
                vm.$message({
                  type: 'success',
                  message: '上传教学资源成功'
                });

                vm.innerAddForm.sectionFileUrl = res.data.data;
                vm.innerAddSection= true;
              }else{
                vm.$message({
                  type: 'error',
                  message: '上传失败!!'
                });
              }
            })
          } else {
            return false;
          }
        });
    },

    //添加章节
    submitForm(formName) {
        let vm =this;
        vm.$refs[formName].validate((valid) => {

          if (valid) {
            // let formData = new FormData();
            // formData.append('sectionFileUrl',document.getElementById("file-url").files[0]);
            // formData.append('sectionName',vm.ruleForm.sectionName);
            // formData.append('sectionType',vm.ruleForm.sectionType);
            // formData.append('sectionDescription',vm.ruleForm.sectionDescription);
            // formData.append('sectionCourseId',vm.$route.query.courseId);
            vm.innerAddForm.sectionCourseId = vm.$route.query.courseId;
            vm.$axios.post('/section/section',vm.innerAddForm)
                .then(function(res){
                    let data = res.data

                    //成功后
                    if(data.result){
                        vm.$message({
                        type: 'success',
                        message: '该课程创建成功'
                        });
                        
                        vm.innerAddSection=false;
                        vm.outerAddSection=false;
                        vm.getSectionList();
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

    addCourseQuestionButton(){
      let vm = this;
      vm.type = 2;
      vm.id = vm.courseId;
      vm.title = '添加期末测试';
      vm.dialogTest = true;
       vm.disabled = false;
    },
    addSectionQuestion(row){
      let vm = this;
      vm.type = 1;
      vm.id = row.sectionId;
      vm.title = '添加章节测试';
      vm.dialogTest = true;
      vm.getQuestionList(vm.type,vm.id);
    },
    LookSectionQuestion(row){
      let vm = this;
      vm.type = 1;
      vm.id = row.sectionId
      vm.dialogLookTest=true;
      vm.getQuestionList(vm.type,vm.id);
    },
    /**
      *添加测试
      */
    addCourseQuestion(formName,type,id){
      let vm = this;
      vm.questionForm.questionType = type;
      vm.questionForm.questionCourseOrSectionId = id;
        
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.$axios.post('/question/question',vm.questionForm)
            .then(function(res){
                  let data = res.data

                  //成功后
                  if(data.result){
                      vm.$message({
                      type: 'success',
                      message: '添加测试成功'
                      });
                    
                      vm.getQuestionList(type,id);
                      vm.dialogTest=false
                  }else{
                      vm.$message({
                      type: 'error',
                      message: '添加测试错误!'
                      });
                  }
              })
              .catch(function(err){
                  return false
              });
          }else{
            return false;
          }
        })
    },
    /**
    获取测试列表
      */
    getQuestionList(type,id){
      let vm= this;
    
        if(type==2){
          vm.questionLoading = true;
        }
        vm.$axios.post('/question/type/courseOrSectionId',{
          questionType:type,
          questionCourseOrSectionId:id
        })
          .then(function(res){
            let data = res.data;
          //成功后
          
          if(data.result){
              
              if(type==2){
                vm.questionData = data.data;
                vm.questionLoading=false;
              }else{
                vm.questionSectionData = data.data;
                if(vm.questionSectionData.length){
                  vm.disabled = true;
                }
              }
            }
          })
        .catch(err => {
          return false
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * 删除章节测试
     */
    deleteSectionQuestion(questionId){
      let vm =this;
    vm.$axios.delete('/question/question/'+questionId)
      .then(function(res){
          let data = res.data

          //成功后
          if(data.result){
              vm.$message({
              type: 'success',
              message: '删除成功'
              });
              vm.dialogLookTest = false;
            vm.getSectionList();
            
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
    /**
     * 删除期末测试
     */
    deleteCourseQuestion(questionId){
      let vm =this;
      vm.$axios.delete('/question/question/'+questionId)
        .then(function(res){
            let data = res.data;

            //成功后
            if(data.result){
                vm.$message({
                type: 'success',
                message: '删除成功'
                });
                debugger
                vm.getQuestionList(2,vm.courseId);
              
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
    }

  }
}
</script>

<style scoped lang="less">
.button-position{
  width: 100%;
  text-align:right;
  margin-top: 10px;
}
.question-box{
  margin-top: 20px;
}
</style>
