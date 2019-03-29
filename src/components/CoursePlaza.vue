<template>
 <div>
   <div>
     <ul>
       <li class="course-box">
         <!--<img src="../assets/img/1.png" class="course-logo" >-->
         <div class="course-intro">
           <p>互联网+创新创业</p>
           <ul>
             <li>
               上课时间：30
             </li>
             <li>
               课程时长
             </li>
             <li>
               课程介绍：旨在培养学生独立思考、善于提问、理论联系实际能力，培养大学生创造性思维。互联网思维
             </li>
           </ul>
         </div>
       </li>
     </ul>
   </div>
 </div>

</template>

<script>
export default {
  data () {
    return {
      numbers: [ 1, 2, 3, 4, 5 ]
    }
  }
}
</script>
<style scoped lang="less">
  .course-box{
    width: 1206px;
    list-style: none;
  }
  .course-logo{
    width: 600px;
    height: 375px;
    display: inline-block;
    vertical-align: middle;
  }
  .course-intro{
    display: inline-block;
    width: 600px;
  }
</style>
