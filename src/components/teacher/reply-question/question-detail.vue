<template>
  <div>
    <el-button :autofocus="true" @click="getComment" :class="comment?'active-button':''">已评论</el-button>
    <el-button @click="getUnComment" :class="uncomment?'active-button':''">未评论</el-button>
    <el-button @click="getIgnore" :class="ignore?'active-button':''">忽略</el-button>
    <div>
        <div class="average-score">
            <p>共{{total}}条数据</p>
        </div>
        <span class="my-evaluate">
            <el-button type="primary"  @click="dialogFormVisible = true">我要评论</el-button>
        </span>
        <!-- 添加评论 -->
        <el-dialog :title="courseName" :visible.sync="dialogFormVisible">
        
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
                placeholder="可以向老师提出与课程相关的问题"
                v-model="commentContent">
            </el-input>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" :disabled="!commentContent" @click="sumbmitEvaluate">提交</el-button>
            </div>
        </el-dialog>
    </div>
    <!--评论展示  -->
    <ul>
        <li class="evaluate-list" v-for="(item,idx) in tableData" :key="idx"> 
            <img src="../../../assets/img/portrait.png" class="head-portrait">
            <div class="evaluate-info">
                
                <p class="evaluate-name">{{item.userName}}</p>
                <div class="evaluate-per-score">
                    <!-- <el-rate
                        v-model="aa[0]"
                        disabled
                        text-color="#ff9900"
                        score-template="{value}"
                        >
                </el-rate> -->
                </div>
                <div class="evaluate-content">
                    {{item.commentContent}}
                </div> 
                <p class="evaluate-time clearfix">
                    <span>发表于{{item.commentTime}}</span>
                    <span class="look-evaluate">查看老师回复</span>
                </p>
            </div>
        </li>
    </ul>
    <!-- 分页 -->
    <div class="block">
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
import { format } from '@assets/js/date.js';
export default {
  data () {
    return {
        pageNum:1,
        pageSize: 10,
        total:100,
        tableData: [],
        commentStatus:1,//commentStatus: 1、老师未评论 2、已评论（会有个commentAnswer字段） 3、忽略（老师忽略，即老师不再评论）
        commentContent:'',
        dialogFormVisible: false,
        ignore:false,
        uncomment:false,
        comment:true
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
        return window.localStorage.userId;
    }
  },
  mounted(){
    let vm = this;
    vm. getComment();
  },
  methods:{

      /**
       * 获取已经评论的列表
       */
      getComment(){
        let vm = this;
        vm.comment= true;
        vm.uncomment=false;
        vm.ignore = false;
        vm.commentStatus = 2;
        vm.pageNum=1;
        vm.getList();
      },
      /**
       * 获取未评论的列表
       */
      getUnComment(){
        let vm = this;
        vm.comment= false;
        vm.uncomment=true;
        vm.ignore = false;
        vm.commentStatus = 1;
        vm.pageNum=1;
        vm.getList();
      },
      /**
       * 获取忽略的列表
       */
      getIgnore(){
        let vm = this;
        vm.comment= false;
        vm.uncomment=false;
        vm.ignore = true;
        vm.commentStatus = 3;
        vm.pageNum=1;
        vm.getList();
      },
      /**
       * 获取评论列表
       */
      getList() {
        let vm= this;
        //   vm.loading = true;
        vm.$axios.post('/comment/course/status',{
            pageNum:vm.pageNum,
            pageSize:vm.pageSize,
            commentCourseId:vm.courseId,
            commentStatus:vm.commentStatus
        })
        .then(function(res){
            let data = res.data
            //成功后
            
            if(data.result){
                vm.tableData = data.data.list;
                vm.tableData.forEach(function (item, index, array) {
                        item.commentTime = format(item.commentTime);
                    });
                vm.total = data.data.total;
            }else{
                vm.$message({
                type: 'error',
                message: '获取提问列表错误!'
                });
            }
        }).catch(function(err){
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
     * 添加评论
     */
    sumbmitEvaluate(){
        let vm= this;
        //   vm.loading = true;
        vm.$axios.post('/comment/comment',{
            userId:vm.userId,
            commentContent:vm.commentContent,
            commentCourseId:vm.courseId
        })
        .then(function(res){
        let data = res.data

        //成功后
        if(data.result){
            vm.$message({
                type: 'success',
                message: '评论成功!'
            })
            vm.dialogFormVisible = false;
        }else{
            vm.$message({
                type: 'error',
                message: '评论错误!'
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
.block{
    text-align: center
}
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
            .look-evaluate{
                margin-left: 5px;
                display: inline-block;
                float: right;
                cursor: pointer;
            }
        }
    }
}
</style>
