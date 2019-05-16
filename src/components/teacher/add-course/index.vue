<template>
  <div class="course-form">
    <!-- <span @click="dialogFormVisible = true" class="icon-tianjia">
      <svg class="icon icon-style" aria-hidden="true" >
        <use xlink:href="#icon-tianjia"></use>
      </svg>
    </span> -->
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="课程名称" prop="courseName">
    <el-input v-model="ruleForm.courseName"></el-input>
  </el-form-item>
  <el-form-item label="开课时间" required>
    <el-col :span="11">
      <el-form-item prop="courseBeginTime">
        <el-date-picker type="date" 
            placeholder="选择日期" 
            v-model="ruleForm.courseBeginTime" 
            style="width: 100%;"
            value-format="timestamp">
        </el-date-picker>
      </el-form-item>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-form-item prop="courseEndTime">
        <el-date-picker type="date" 
            placeholder="选择日期" 
            v-model="ruleForm.courseEndTime" 
            style="width: 100%;"
            value-format="timestamp"></el-date-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="课程类型" prop="courseType">
    <el-radio-group v-model="ruleForm.courseType">
      <el-radio :label='1'>校内课程</el-radio>
      <el-radio :label='2'>校外课程</el-radio>
    </el-radio-group>
  </el-form-item>
    <el-form-item label="上传封面" prop="coursePhotoUrl">
    <el-upload
      class="upload-demo"
      action="http://62.234.57.192:8080/studywebsite/file/upload"
      :show-file-list="false"
      :limit="1"
      :on-success="handleAvatarSuccess">
      <el-button slot="trigger" size="small" type="primary">上传图片</el-button>
    </el-upload>
  </el-form-item>
  <el-form-item label="课程介绍" prop="courseContent">
    <el-input type="textarea" v-model="ruleForm.courseContent"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
       fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
     ruleForm: {
          courseName: '',
          courseBeginTime: '',
          courseEndTime: '',
          courseType: '',
          courseContent: '',
          coursePhotoUrl: ''
        },
        rules: {
         courseName: [
            { required: true, message: '请输入课程名称', trigger: 'blur' }
          ],
          courseBeginTime: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          courseEndTime: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          courseType: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          courseContent: [
            { required: true, message: '请填写课程介绍', trigger: 'blur' }
          ],
          coursePhotoUrl: [
              { required: true, message: '请上传封面', trigger: 'blur' }
          ]
        }
    }
  },
    methods: {
      submitForm(formName) {
        let vm =this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
    
            vm.ruleForm.userId = sessionStorage.getItem('userId');
            //【课程】添加课程（需要登陆）
            vm.$axios.post('/course/course',vm.ruleForm)
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
      
      handleAvatarSuccess(response, file, fileList) {
        let vm = this;
        vm.$message({
          type: 'success',
          message: '上传成功'
          });
        vm.ruleForm.coursePhotoUrl=response.data;
      }
    }
}
</script>

<style scoped lang="less">
.course-form{
    width: 400px;
}
.icon-tianjia{
    cursor: pointer;
    .icon-style{
        width: 100px;
        height: 100px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -50px;

        color: #ccc;
    }
}
</style>
