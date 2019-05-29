<template>
  <div>
    <div class="course-chapter">
      <p>
        <svg class="icon icon-style" aria-hidden="true" >
          <use xlink:href="#icon-dagang"></use>
        </svg>
        <span class="detail-title">课程大纲</span>
      </p>
      <ul class="chapter-list">
          <li v-for="(item,idx) in sectionList" :key="idx" class="chapter-box">
            <!-- <p class="cricle"></p> -->
            <span>{{idx+1}}、</span>
            <span>{{item.sectionName}}:</span>
            <span>{{item.sectionDescription}}</span>
          </li>
        </ul>
        <div v-if="!sectionList.length" class="empty">
          暂无数据
        </div>
    </div>
    <div>
        
    </div>
    

  </div>
</template>

<script>
export default {
  data () {
    return {
      sectionList:[]
    }
  },
 mounted(){
   let vm = this;
   vm.getSectionList();
 },
  methods:{
    /**
      获取章节列表
     */
    getSectionList(){
      let vm= this;
      let courseId = vm.$route.query.courseId;
      vm.$axios.get(`/section/course/${courseId}`)
        .then(function(res){
          let data = res.data
        //成功后
         
        if(data.result){
            vm.sectionList = data.data;
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
.icon-style{
  font-size: 16px;
  color: #409EFF;
   vertical-align:-6px;

}
.detail-title{
  // padding: 0 0 10px 0;
  font-size: 18px;
  font-weight: bold;
 
}
// .course-overview {
  
// }
.course-intro-text{
    margin-bottom: 50px;
    margin-top: 8px;
    text-indent: 28px;
    font-size: 14px;
    word-break: break-word;
    word-wrap: break-word;
    // white-space: pre-wrap;
    color: #666;
}
.chapter-list{
  margin-left: -10px;
  margin-top: 10px;
}
.chapter-box{
  list-style: none;
  height: 25px;
  line-height: 25px;
}
.chapter-title{
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
  color: #3D4059;
}
.cricle{
  width: 6px;
  height: 6px;
  display: inline-block;
  vertical-align: middle;
  border-radius: 50%;
  background: #999999;
}
.chapter-list-wrap{
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  list-style:none;
}
.small-chapter{
  display: inline-block;
}
</style>
