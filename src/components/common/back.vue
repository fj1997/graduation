<template>
    <div>
        <div class="icon-box">
            <svg class="icon icon-chenggong" aria-hidden="true" >
                <use xlink:href="#icon-chenggong"></use>
            </svg>
            <span class="success-tip">{{dscrText}}</span>
        </div>
        
        <p class="forget-password" @click="goBack()"> 
        {{backText}}
        </p>
    </div>
</template>

<script>
import {loginText} from '@assets/js/constText'
import { O_RDONLY } from 'constants';
export default {
  data () {
    return {
      successText: loginText.regSuccess,//注册成功文字提示
    }
  },
  props:{
      dscrText: String,
      backText: String,
      path: String,
      query:Object
      
  },
  methods:{
      goBack () {
        let vm = this;
        vm.$router.push({
            path:vm.path,
            query:vm.query
        })
    //    vm.$router.go(0)
    }
  }
}
</script>

<style scoped lang="less">
.icon-box{
    width: 260px;
    text-align: center;
}
.icon-chenggong{
        color: #409EFF;
        font-size: 20px;
        vertical-align: -10px;
    }
.forget-password{
        text-align: center;
        font-size: 12px;
        // margin-bottom: 20px;
        margin-top: 20px;
        width: 260px;
        color: #4a90e2;
        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    }
</style>
