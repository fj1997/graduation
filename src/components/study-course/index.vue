<template>
  <div class="study">
      <header-bar></header-bar>
 
  <el-container>
    <el-aside width="200px">
        <el-menu
            default-active="0Stirng"
            class="el-menu-vertical-demo">
            <el-menu-item  v-for="(item,idx) in dataList" :key="idx" :index="idx+'Stirng'">
                <span slot="title" @click="changeSection(item.sectionId,item.sectionType,item.sectionFileUrl,item.sectionDescription)">{{item.sectionName}}</span>
            </el-menu-item>
            <el-menu-item  :index="dataList.length+'Stirng'">
                <span slot="title" @click="changeTest">期末考试</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
    <el-main>
        <div v-show="finalTest&&dataList.length">
            <div class="clearfix">
                <div class="resourse-box">
                    <iframe :src="'http://ow365.cn/?i=18546&furl=http://62.234.57.192:8080/file/'+sectionFileUrl" width='700px' height='500px' v-if="sectionType!=1">点我预览</iframe> 
                    <player :videoSrc="'http://62.234.57.192:8080/file/'+sectionFileUrl" v-if="sectionType==1"></player>
                </div>
          
                <div class="section-description">章节介绍：{{sectionDescription}}</div>
            </div>
            
            <h3 class="sectionwork" v-if="questionData.length">课后作业</h3>
          <div v-for="(item,index) in questionData" :key="index" v-show="questionData.length">
            <p>{{index+1}}、{{item.questionContent}}</p>
            <p v-show="item.whetherDo">答题状态：已答题</p>
            <div class="anwser-box" v-show="!item.whetherDo">
                <el-input
                    type="textarea"
                    :autosize="{ minRows:10, maxRows: 10}"
                    placeholder="请输入内容"
                    v-model="questionAnswer[index]">
                </el-input>
                <p class="questionbutton">
                    <el-button type="primary" :disabled="!questionAnswer[index]" @click="postQuestionAnwser(item.questionId,questionAnswer[index])">提交答案</el-button>
                </p>
            </div>
          </div>
        </div>
        
        <div v-if="!(finalTest&&dataList.length)">
          <final-test></final-test>
        </div>
    </el-main>
  </el-container>

      
      
           
       
   
  </div>
   
 
</template>

<script>
import Header from '@/components/header/index.vue'
import player from '@/components/common/player.vue' 
import Test from'./final-test.vue'
export default {
data () {
    return {
      finalTest:true,
      dataList:[],
      sectionFileUrl:'',
      sectionId:'',
      sectionType:'',
      sectionDescription:'',
      questionData:[],
      questionAnswer:[]
    }
  },
  computed:{
      courseId(){
          let vm = this;
          return vm.$route.query.courseId;
      },
      userId(){
        let vm = this;
          return sessionStorage.getItem('userId');
      }
  },
  mounted(){
      let vm =this;
      vm.getCourse();
  },
  components:{
      'player':player,
      'header-bar': Header,
      'final-test': Test
  },
  methods:{
      /**
        *通过课程id获取章节列表
       */
    getCourse(){
        let vm = this;
        vm.$axios.get(`/section/course/${vm.courseId}`)
            .then(function(res){
            let data =res.data;
            if(data.result){
                //将时间戳转换成日期
                vm.dataList = data.data;
                vm.sectionFileUrl = vm.dataList[0].sectionFileUrl;
                vm.sectionType = vm.dataList[0].sectionType;
                vm.sectionDescription = vm.dataList[0].sectionDescription;
                vm.sectionId = vm.dataList[0].sectionId;
                vm.getQuestionList();
            }
            })
            .catch(err => {
            return false
            });
      },
      handleSelect(key, keyPath) {
        
        let vm = this;
        vm.sectionFileUrl = key;
      },
      changeSection(id,type,url,description){
         let vm = this;
        vm.sectionId = id;
        vm.sectionType = type;
        vm.sectionFileUrl = url;
        vm.sectionDescription = description;
        vm.finalTest = true;
        vm.getQuestionList();
      },
      changeTest(){
        let vm =this;
        vm.finalTest = false;
      },
      /**
        * 获取简答题列表
        */
        getQuestionList(){
          
            let vm = this;
            vm.questionData = [];
            vm.$axios.post('/question/type/courseOrSectionId',{
                questionType:1,
                questionCourseOrSectionId:vm.sectionId
            })
            .then(function(res){
            let data =res.data;
            if(data.result){
                console.log(vm.questionData);
                if(data.data.length){
                    data.data.forEach(function(item){
                    vm.$axios.get('/work/question/'+vm.userId+'/'+item.questionId)
                    .then(function(res){
                        let data1 =res.data;
                        if(data1.result){
                            item.whetherDo= data1.data;
                            vm.questionData= data.data;
                            
                        }
                    })
                    .catch(err => {
                        return false
                    });
                })
                }

            }
            })
            .catch(err => {
                return false
            });
        },

        /**
         * 判断简答题是否做过
         */
        whetherDo(item,questionId){
            let vm = this;
            vm.$axios.get('/work/question/'+vm.userId+'/'+questionId)
            .then(function(res){
            let data =res.data;
            if(data.result){
                item.whetherDo= data.data;
            }
            })
            .catch(err => {
                return false
            });
        },

        /**
         * 提交简答题答案
         */

        postQuestionAnwser(id,anwser){
            let vm = this;
            vm.$axios.post('/work/work',{
                userId:vm.userId,
                workQuestionId:id,
	            workContent:anwser
            })
            .then(function(res){
                let data =res.data;
                if(data.result){
                    vm.$message({
                        type: 'success',
                        message: '提交成功'
                    });
                    vm.getQuestionList();
                }
            })
            .catch(err => {
                return false
            });
        },
  }
   
  
}
</script>

<style scoped lang="less">

.resourse-box{
    float: left;
}
.section-description{
    float: left;
    margin-left: 20px;
}
.sectionwork{
    margin-top: 50px;
}
.study{
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    // background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    margin-top: 70px;
  }
  
  .el-main {
    // background-color: #E9EEF3;
    color: #333;
    // text-align: center;
    line-height: 40px;
    margin-top: 70px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
.radio-choice{
    line-height: 30px;
    margin-left: 20px;
}
.tijiao{
    text-align: center;
}
.anwser-box{
    width: 60%;
}

.questionbutton{
    padding-left: 550px;
    padding-top: 20px;
}
</style>
