<template>
  <div class="study">
      <header-bar></header-bar>
 
  <el-container>
    <el-aside width="200px">
        <el-menu
            default-active="0Stirng"
            class="el-menu-vertical-demo">
            <el-menu-item  v-for="(item,idx) in dataList" :key="idx" :index="idx+'Stirng'">
                <span slot="title" @click="changeSection(item.sectionId,item.sectionType,item.sectionFileUrl)">{{item.sectionName}}</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
    <el-main>
        
        <iframe :src="'http://ow365.cn/?i=18546&furl=http://62.234.57.192:8080/file/'+sectionFileUrl" width='700px' height='500px' v-if="sectionType!=1">点我预览</iframe> 
        <player :videoSrc="'http://62.234.57.192:8080/file/'+sectionFileUrl" v-if="sectionType==1"></player>
       
    </el-main>
  </el-container>

      
      
           
       
   
  </div>
   
 
</template>

<script>
import Header from '@/components/header/index.vue'
import player from '@/components/common/player.vue' 
export default {
  data () {
    return {
      dataList:[],
      sectionFileUrl:'',
      sectionId:'',
      sectionType:''
    }
  },
  computed:{
      courseId(){
          let vm = this;
          return vm.$route.query.courseId;
      }
  },
  mounted(){
      let vm =this;
      vm.getCourse()
  },
  components:{
      'player':player,
      'header-bar': Header
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
      changeSection(id,type,url){
         let vm = this;
        vm.sectionId = id;
        vm.sectionType = type;
        vm.sectionFileUrl = url;
      }
  }
  
}
</script>

<style scoped lang="less">
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
    text-align: center;
    line-height: 160px;
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

</style>
