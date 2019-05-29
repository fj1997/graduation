<template>
  <div class="block" v-show="pageSwitch">
    <el-pagination
      background
      @current-change= "handleCurrentChange"
      :current-page.sync= "pageNum"
      :page-size= "pageSize"
      layout= "prev, pager, next, jumper"
      :total= "total">
    </el-pagination>
  </div>
</template>

<script>
import { format } from '@assets/js/date.js';
export default {
  data () {
    return {
       pageNum:1,
       pageSize: 12,
       total:10,
       list:[],
      pageSwitch:true
      }
    },
    props:{
        url:String,
        courseType:Number
    },
    mounted(){
        let vm = this;
        vm.getCourseList();
    },
    methods: {
        /**
         * 获取课程列表
         */
        getCourseList() {
            let vm= this;
            vm.$axios.post(vm.url,{
                pageNum:vm.pageNum,
                pageSize:vm.pageSize,
                courseType:vm.courseType
            })
            .then(function(res){
                let data = res.data;
                if(data.result){
                    vm.list = data.data.list,
                    vm.list.forEach(function (item, index, array) {
                        item.courseBeginTime = format(item.courseBeginTime);
                        item.courseEndTime = format(item.courseEndTime);
                    });
                    vm.total = data.data.total;
                    if(vm.total){
                    vm.pageSwitch = true;
                    }else{
                    vm.pageSwitch = false;
                    }
                    vm.$emit('getList', vm.list);
                   
                }else{
                    return false
                }
            })
            .catch(function(err){
                return false
            });
        },
        /**
         * 获取当前页的数据
         */
        handleCurrentChange(val) {
            let vm=this;
            vm.pageNum=val;
            console.log(vm.pageNum)
            vm.getCourseList();
        }
    }
        
}
</script>

<style scoped lang="less">
.block{
    text-align: center
}
</style>
