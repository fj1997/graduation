<template>
    <div>
        <div class="banner">
            <div class="title-wrap">
                <img  class="school-logo" src="../../assets/img/school_logo.png">
                <span class="banner-title" @click="goIndex">首页</span>
            </div>
            <div class="search-box">
                <input type="text" 
                    class="search-text"
                    v-model="courseName"
                    @keyup.enter="getCourseList"
                    placeholder="输入课程名称">
                <span class="search-button" @click="getCourseList">搜索</span>
            </div>
        </div>
        <ul class="course-list-wrap clearfix">
      <li v-for="(item,idx) in list" :key="idx" @click='courseDetail(item.courseId,item.courseName)'>
        <img :src="`http://62.234.57.192:8080/file/`+item.coursePhotoUrl" alt="" >
        <span class="course-name">{{item.courseName}}</span>
        <span class="course-type">{{type[item.courseType]}}</span>
        <p class="course-teacher-info">
          <span>开课时间：{{item.courseBeginTime}}</span>-<span> {{item.courseEndTime}}</span>
        </p>
      </li>
    </ul>

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
import Pagination from '@/components/common/pagination.vue'
import { format } from '@assets/js/date.js';
export default {
     data () {
    return {
       
       pageNum:1,
       pageSize: 12,
       total:100,
       list:[],
       courseName:this.$route.query.searchName,
       type:{
        1:'校内',
        2:'校外'
        }
      }
    },
    mounted(){
        let vm = this;
        vm.getCourseList();
    },
    computed:{
        
    },
    methods:{
      
    /**
     * 获取课程列表
     */
    getCourseList() {
        let vm= this;
        vm.$axios.post('/course/name',{
            pageNum:vm.pageNum,
            pageSize:vm.pageSize,
            courseName:vm.courseName
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
    },
    /**
     * 进去课程详情页面
     */
   courseDetail(id,name){
      let vm = this;
        vm.$router.push({
            path:'/detail',
            query:{
              courseId:id,
              courseName:name
            }
        })
    },

     //返回首页
    goIndex(){
        let vm = this
        vm.$router.push({
            path:'/index/incourse'
        })
    }
  }

}
</script>
 <style lang="less" scoped>
    @import './index.less';
    .block{
        text-align: center
    }
    .course-list-wrap {
      width: 1300px;
      margin: 30px auto;
      li {
        width: 285px;
        display: inline-block;
        margin: 0 20px 25px;
        background: #fff;
        border-radius: 6px;
        list-style: none ;
        cursor: pointer;
        &:hover{
          -moz-box-shadow: 2px 2px 2px #777; /* 老的 Firefox */
          box-shadow: 2px 2px 2px #ddd;
        }
        img{
          width: 285px;
          height: 160px;
          object-fit: cover;
          border-radius: 6px;
        }
        .course-name{
          padding: 0 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 10px;
          line-height: 22px;
          color: #3D4059;
          font-size: 16px;
          display: inline-block;
        }
        .course-type{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 17px;
          line-height: 22px;
          color: #3D4059;
          font-size: 16px;
          display: inline-block;
          margin-left: 120px;
        }
        .course-teacher-info{
          padding: 0 15px;
          margin-top: 11px;
          line-height: 16px;
          color: #a1a2b2;
          margin-bottom: 50px;
          span{
            color: #777993;
            font-size: 12px;
            margin-right: 10px;
          }
        }
      }
      .clearfix {
        clear: both;
        zoom: 1;
      }
    }
</style>



