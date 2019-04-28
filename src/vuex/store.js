import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state={
  count:1,
  userPassword: '', //用户密码
  userPhone: '', //用户手机号
  userType: '', //用户类型
  userName: '', //用户名
  userNumber: ''  //教工号/学号
}
const mutations={
  getUserPassword(state,n){
    state.userPassword = n;
  },
  getUserPhone(state,n){
    state.userPassword = n;
  },
  getUserType(state,n){
    state.userType = n;
  },
  getUseruserName(state,n){
    state.useruserName = n;
  },
  getUserNumber(state,n){
    state.Number = n;
  },

}
const getters={
  count:function (state) {
    return state.count+=10;
  }
}
const actions ={
  //context:上下文对象，可以理解为store本身
  addAction(context){
    context.commit('add',10);
    setTimeout(()=>{context.commit('reduce')},5000);
    console.log('我比reduce先输出')
  },
  //直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了
  reduceAction({commit}){
    commit('reduce')
  }
}

//普通导出
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
