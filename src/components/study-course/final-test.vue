<template>
  <div>
      <div>
          <p>一、单选题</p>
          <p>最终得分：{{score}}</p>
          <div v-for="(item,idx) in radioData" :key="idx">
              <p>{{idx+1}}、{{item.choiceQuestion}}</p>
            <el-radio-group v-model="checkedValue[idx]">
                <p class="radio-choice">
                    <el-radio :label="item.choiceA">{{item.choiceA}}</el-radio>
                </p>
                <p class="radio-choice">
                    <el-radio :label="item.choiceB">{{item.choiceB}}</el-radio>
                </p>
                <p class="radio-choice">
                    <el-radio :label="item.choiceC">{{item.choiceC}}</el-radio>
                </p>
                <p class="radio-choice">
                    <el-radio :label="item.choiceD">{{item.choiceD}}</el-radio>
                </p>
            </el-radio-group>
          </div>
          <p class="tijiao">
              <el-button type="primary" @click="btnfun" :disabled="disabled">提交单选答案</el-button>
          </p>
          
      </div>
      <div>
          <p>二、简答题</p>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled:false,
      radioData:[],         //单选题列表
      checkedValue:[],         //选择的答案列表
      testData:[],              //复制的 checkedValue
      answerData:[],            //后台返回的正确答案列表
      yesCount:0,               //答对的题数
      score:0                   //最后得分
    }
  },
  computed:{
      courseId(){
          let vm =this;
         return vm.$route.query.courseId;
      },
      userId(){
          let vm =this;
          return window.localStorage.userId;
      }
  },
  mounted(){
      let vm = this;
      vm.getradioList();
      vm.getRadioScore();
  },
  methods:{

      /**
      *获取单选列表
       */
      getradioList(){
        let vm = this;
        vm.$axios.get(`/choice/course/${vm.courseId}`)
            .then(function(res){
            let data =res.data;
            if(data.result){
                vm.radioData= data.data;

                vm.radioData.forEach(function(item,idx){
                    vm.answerData.push(item.ChoiceAnswer);
                    
                })
            }
            })
            .catch(err => {
            return false
            });
      },

      /**
        *提交单选答案
       */
       btnfun(){
           let vm = this;

            for (var i = 0; i < vm.checkedValue.length; i++) {
                vm.testData[i] = vm.checkedValue[i];
            }
            
            
            for (var i = 0; i < vm.checkedValue.length; i++) {
               
                if (vm.testData[i] === '' ||typeof(vm.testData[i]) === 'undefined' ) {
                    vm.testData.splice(i, 1)
                  
                }
            }
            

            
           if(vm.testData.length!= vm.radioData.length){
              vm.$message({
                type: 'error',
                message: '答案没有选择完毕'
                });
           }else{
               for (var i = 0; i < vm.checkedValue.length; i++) {
                    if(vm.answerData[i] == vm.checkedValue[i]){
                        vm.yesCount++;
                    }
                }

                vm.score=parseInt((vm.yesCount/vm.checkedValue.length)*100);

                //提交成绩
                vm.$axios.post('/score/score',{
                    scoreUserId:vm.userId,
                    scoreCourseId:vm.courseId,
                    scoreScore:vm.score
                }).then(function(res){
                    let data =res.data;
                    if(data.result){
                        vm.$message({
                            type: 'success',
                            message: '提交成功'
                            });
                        vm. getRadioScore();
                    }
                    })
                    .catch(err => {
                    return false
                    });
           }
       },

       getRadioScore(){
           let vm =this;
            vm.$axios.get(`/score/user/course/${vm.userId}/${vm.courseId}`)
                .then(function(res){
                    let data =res.data;
                    if(data.result){
                        vm.score= data.data;
                        if(vm.score!=0){
                            vm.disabled = true;
                        }
                        
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
.radio-choice{
    line-height: 30px;
    margin-left: 20px;
}
.tijiao{
    text-align: center;
}
</style>
