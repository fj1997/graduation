<template>
  <div class="empty-state">
    <svg class="icon icon-style" aria-hidden="true" >
        <use xlink:href="#icon-kongzhuangtai"></use>
    </svg>
    <p class="empty-tip"> <slot name="tip"></slot></p>
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
.empty-state{
  width: 527px;
  height: 256px;
  margin: 0 auto;
  padding-top: 50px;
  text-align: center;
  // .empty-tip{
  //   text-align: center
  // }

}
.icon-style{
  font-size: 100px;
}
</style>