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
                    v-model="searchValue"
                    @keyup.enter="changeFilter"
                    placeholder="输入课程名称或教师">
                <span class="search-button" @click="changeFilter">搜索</span>
            </div>
        </div>
        <div class="main-box clearfix">
            <ul >
                <li class="course-list clearfix" v-for="(item ,idx) in list" :key="idx">
                    <img src="../../assets/img/course1.jpg" class="course-img" >
                    <div class="course-info">
                        <p class="course-name ellipsis">{{ item.courseName}}</p>
                        <span class="course-type">校内</span>
                        <p class="teacher-info">
                            <span>{{item.courseTeacher}}</span>
                            <span>{{item.courseSchool}}</span>
                        </p>
                        <p>
                            <dl class="course-attribute-dl clearfix">
                                <dd>
                                    <svg class="icon icon-style" aria-hidden="true" >
                                        <use xlink:href="#icon-shijian"></use>
                                    </svg>
                                    <span class="course-count">{{item.creditHour}}</span>学分
                                    <span class="course-count">{{item.classHour}}</span>课时
                                </dd>
                                <dd class="course-time">
                                    <svg class="icon icon-style" aria-hidden="true" >
                                        <use xlink:href="#icon-rili"></use>
                                    </svg>
                                    <span class="course-count">{{item.runTermCount}}</span>运行学期
                                </dd>
                                <dd class="course-please">
                                    <svg class="icon icon-style" aria-hidden="true" >
                                        <use xlink:href="#icon-manyidu"></use>
                                    </svg>
                                    <span class="course-count">{{item.pleasedDegree}}</span>满意度
                                </dd>
                            </dl>
                        </p>
                    </div>
                </li>
            </ul>
  <!--infinite-loading这个组件要放在列表的底部，滚动的盒子里面！-->
            <infinite-loading @infinite="infiniteHandler" ref="infiniteLoading">
            <span slot="no-more" v-show="!list.length">
                <empty-state>
                    <p slot="tip">{{keyWord}}</p>
                </empty-state>
            </span>
        </infinite-loading>
        </div>
        
    </div>
   
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import EmptyState from '@/components/common/empty-state.vue';
import {emptyText} from '@assets/js/constText';
export default {
    data () {
        let vm = this;
        return {
            searchValue: vm.$route.query.searchName,
            list:  [],
            currentPage:1,
            pageSize:10

        }
    },
    computed:{
        keyWord(){
            let vm = this;
            if(vm.list.length==0){
                    if(!vm.searchValue){
                        return emptyText.noKey;
                    }else{
                        return emptyText.noResult;
                    }
            }
            
        }
    },
    components: {
        InfiniteLoading,
        EmptyState
    },
    methods:{
        search () {
            let vm = this
            if(vm.searchValue) {
                console.log(vm.searchValue)
            }
        },
    /**
     * 滚动分页
     */
    infiniteHandler($state) {
        let vm= this;
        vm.$axios.post(vm.ports.course.search,{
            search:vm.searchValue,
            currentPage:vm.currentPage,
            pageSize: vm.pageSize,
        })
        .then(function(res){
            let data = res.data;
            if(data.success){
                vm.list = vm.list.concat(data.data.list);  //response.data为你请求接口返回的数组列表
                vm.currentPage++;
                $state.loaded();
                if (data.data.list.length== 0) {
                    $state.complete(); //这里是加载了10页数据，设置不在加载
                }
            }else{
               
                $state.complete();
            }
        })
        .catch(function(err){
            return false
        });
    },
    //搜索框触发滚动分页
    changeFilter() {
        let vm = this;
        vm.list = [];
        vm.currentPage = 1;
        vm.$nextTick(() => {
            vm.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        });
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

</style>



