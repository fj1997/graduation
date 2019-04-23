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
        人格理论所描述的人格类型，并没有好坏之别，只不过不同类型的人回应世界的方式不同而已。人格理论作为一张详尽描绘人类性格特征的活地图，是我们了解自己、认识和理解他人的一把金钥匙，是一件与人沟通及有效交流的利器。本课程选取生动有趣的案例教学为切入点，描绘“完美主义者”“好好先生”“追求关注者”“被动攻击者”等不同人格类型者的心理模式，试图探索各种人格特点的成因，追溯他们的早期经历和原生家庭。
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
        人格理论所描述的人格类型，并没有好坏之别，只不过不同类型的人回应世界的方式不同而已。人格理论作为一张详尽描绘人类性格特征的活地图，是我们了解自己、认识和理解他人的一把金钥匙，是一件与人沟通及有效交流的利器。本课程选取生动有趣的案例教学为切入点，描绘“完美主义者”“好好先生”“追求关注者”“被动攻击者”等不同人格类型者的心理模式，试图探索各种人格特点的成因，追溯他们的早期经历和原生家庭。
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
          <li v-for="i in 10" :key="i" class="chapter-box">
            <div class="chapter-list">
              <p class="chapter-title">第一章 中国传统文化的基本精神</p>
              <ul>
                <li v-for="i in 5" :key="i" class="chapter-list-wrap">
                  <p class="cricle"></p>
                  <p class="small-chapter">人格理论所描述的人格类型，并没有好坏之别</p>
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
