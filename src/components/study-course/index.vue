<template>
  <div>
    <ul>
        <li v-for="(item,idx) in dataList" :key="idx">


            <iframe :src="'http://ow365.cn/?i=18546&furl=http://62.234.57.192:8080/file/'+item.sectionFileUrl" width='700px' height='500px' v-if="item.sectionType!=1">点我预览</iframe> 
        <player :videoSrc="'http://62.234.57.192:8080/file/'+item.sectionFileUrl" v-if="item.sectionType==1"></player>
        </li>
    </ul>
  </div>
</template>

<script>
import player from '@/components/common/player.vue' 
export default {
  data () {
    return {
      dataList:[]
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
      player
  },
  methods:{
      getCourse(){
          let vm = this;
          vm.$axios.get(`/section/course/${vm.courseId}`)
              .then(function(res){
                let data =res.data;
                if(data.result){
                  
                  //将时间戳转换成日期
                 vm.dataList = data.data;
                 
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
</style>
