<template>
  <div>
    <header-bar></header-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/header/index'
import Footer from '@/components/footer/index'
export default {
  data () {
    return {
     
    }
  },
  components: {
    'header-bar': Header,
    'footer-bar': Footer
  },
  methods: {
    goLogin () {
      let vm = this
      vm.$router.push('/login')
    },
    goRegister () {
      let vm = this
      vm.$router.push('/register')
    }
  }
}
</script>

<style scoped lang="less">

</style>
