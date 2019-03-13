<template>
  <div id="app">
    <title-bar></title-bar>
  </div>
</template>

<script>
import titleBar from '@/components/TitleBar'
export default {
  components: {
    titleBar
  }
}
</script>

<style scoped>
  @import '../src/assets/less/global.less';
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
</style>
