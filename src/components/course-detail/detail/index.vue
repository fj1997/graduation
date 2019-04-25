<template>
  <div>
    <div class="course-overview">
      <p>
        <svg class="icon icon-style" aria-hidden="true" >
          <use xlink:href="#icon-gaishu"></use>
        </svg>
        <span class="detail-title">课程概述</span>
      </p>
      <p class="course-intro-text">
        {{courseDetail.courseOverview}}
      </p>
    </div>
    <div class="course-target">
      <p>
        <svg class="icon icon-style" aria-hidden="true" >
          <use xlink:href="#icon-xueshimao2"></use>
        </svg>
        <span class="detail-title">授课目标</span>
      </p>
      <p class="course-intro-text">
        {{courseDetail.courseTarget}}
      </p>
    </div>
    <div class="course-chapter">
      <p>
        <svg class="icon icon-style" aria-hidden="true" >
          <use xlink:href="#icon-dagang"></use>
        </svg>
        <span class="detail-title">课程大纲</span>
      </p>
      <ul>
          <li v-for="(item,idx) in courseDetail.courseChapter" :key="idx" class="chapter-box">
            <div class="chapter-list">
              <p class="chapter-title">第一章 {{item.bigChapter}}</p>
              <ul>
                <li v-for="(i,index) in item.smallChapter" :key="index" class="chapter-list-wrap">
                  <p class="cricle"></p>
                  <p class="small-chapter">{{i}}</p>
                </li>
              </ul>
            </div>
            
          </li>
        </ul>
    </div>
    <div>
        
    </div>
    

  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:{
    courseDetail:{
      type: Object
    }
  },
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
.chapter-box{
  list-style: none;
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
