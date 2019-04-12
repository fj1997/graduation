<template>
  <div class="block">
    <el-pagination
      background
      @current-change= "handleCurrentChange"
      :current-page.sync= "currentPage"
      :page-size= "pageSize"
      layout= "prev, pager, next, jumper"
      :total= "total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
       currentPage:1,
       pageSize: 12,
       total:100,
       courseList:[]
      }
    },
    props:{
        url:String
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
                currentPage:vm.currentPage,
                pageSize: vm.pageSize,
            })
            .then(function(res){
                let data = res.data;
                if(data.success){
                    vm.courseList = data.data.courseList,
                    vm.total = data.data.total;
                    vm.$emit('getList', vm.courseList);
                   
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
            vm.currentPage=val;
            console.log(vm.currentPage)
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
