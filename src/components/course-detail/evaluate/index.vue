<template>
  <div>
    <div>
        <span class="average-score-text">{{evaluate.averageScore}}</span>
        <div class="average-score">
            <el-rate
                v-model="value"
                disabled
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>
            <p>共{{evaluate.total}}条数据</p>
        </div>
        <span class="my-evaluate">
            <el-button type="primary"  @click="dialogFormVisible = true">我要评论</el-button>
        </span>
        <el-dialog title="撰写《女子防身术》的评价" :visible.sync="dialogFormVisible">
        <p class="total-eva">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-bitian"></use>
            </svg>
            <span>总评</span>
        </p>
        <p class="total-eva-content">
            <el-rate
                v-model="value2"
                show-text
                :texts="['非常失望', '比较失望，不推荐', '马马虎虎，不太推荐', '课程很不错，有待提高', '满意！，强烈推荐']"
                @change="getScore">
            </el-rate>
        </p>
        
        <p class="eva-content">
            <svg class="icon" aria-hidden="true" >
                <use xlink:href="#icon-bitian"></use>
            </svg>
            <span>评价内容</span>
        </p>
        
        <el-input
            type="textarea"
            required
            :rows="10"
            placeholder="可以从课程内容组织、授课方式的角度评价课程，或者分享课程给你带来了什么收获和启发"
            v-model="textarea">
        </el-input>

        <div slot="footer" class="dialog-footer">
            <el-button @click="consleEvaluate">取消</el-button>
            <el-button :disabled="disabled" type="primary" @click="sumbmitEvaluate">提交</el-button>
        </div>
        </el-dialog>
    </div>
    
    <ul>
        <li class="evaluate-list" v-for="(item,idx) in evaluate.evaluateList" :key="idx"> 
            <img src="../../../assets/img/portrait.png" class="head-portrait">
            <div class="evaluate-info">
                
                <p class="evaluate-name">{{item.name}}</p>
                <div class="evaluate-per-score">
                    <el-rate
                        v-model="aa[0]"
                        disabled
                        text-color="#ff9900"
                        score-template="{value}"
                        >
                </el-rate>
                </div>
                <div class="evaluate-content">
                    {{item.content}}
                </div> 
                <p class="evaluate-time clearfix">
                    <span>发表于{{item.time}}</span>
                    <span class="delete-evaluate">删除</span>
                    <span @click="dialogFormVisible = true" class="edit-evaluate">编辑</span>
            
                </p>
            </div>
        </li>
    </ul>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
    value:3.7,
    value2: 5,
    aa:[2,3,3,5],
    textarea:'',
    dialogFormVisible: false
    
    }
  },
  props:{
    evaluate:{
      type: Object
    }
  },
  computed:{
    disabled(){
        let vm = this;
        if(vm.textarea){
            return false;
        }else{
            return true;
        }
    }
  },
  methods:{
      consleEvaluate(){
        this.dialogFormVisible = false;
       
      },
      getScore(score){
          console.log(score);
          
          this.$message({
            type: 'success',
            message: '评论成功!'
          })
      },
      sumbmitEvaluate(){
          this.dialogFormVisible = false;
          this.$message({
            type: 'success',
            message: '评论成功!'
          })
      }
  }
}
</script>

<style scoped lang="less">
.average-score-text{
    line-height: 64px;
    font-size: 48px;
    width: 73px;
    color: #FF7A3E;
    font-weight: bold;
    margin-right: 15px;
}
.average-score{
    display: inline-block;
}
.my-evaluate{
    float: right;
    margin-top: 10px;
}
.total-eva{
    margin-top: -14px;
    margin-bottom: 10px;
}
.total-eva-content{
    margin-left: 9px;
    text-indent:5px;
}
.eva-content{
    margin-top: 25px;
    margin-bottom: 10px;
}
.evaluate-list{
    list-style: none;
    margin-top: 20px;
    .head-portrait{
        width: 55px;
        height: 55px;
        border-radius: 50%;
    }
    .evaluate-info{
        font-size: 13px;
        margin-top: -50px;
        margin-left: 70px;
        .evaluate-name{
            vertical-align: -3px;
            display: inline-block;
            color: #333;
        }
        .evaluate-per-score{
            display: inline-block;
        }
        .evaluate-content{
            margin-top: 15px;
            color: #666;
        }
        .evaluate-time{
            margin-top: 15px;
            color: #999;
            .edit-evaluate,
            .delete-evaluate{
                margin-left: 5px;
                display: inline-block;
                float: right;
                cursor: pointer;
            }
        }
    }
}
</style>
