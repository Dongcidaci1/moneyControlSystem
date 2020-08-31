import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 操作类型,就相当于给函数定义了一个类型吧像c++里面那样定义一个 int add() 这样  
const types={
  SET_AUTHENTICATED:"SET_AUTHENTICATED",
  SET_USER:"SET_USER"
}

const state={
  // 是否是授权状态
  isAuthenticated:false,
  // 用户信息
  user:{}
}
// 相当于计算属性
const getters={
  // 获取信息
  isAuthenticated:state =>state.isAuthenticated,
  user:state=>state.user
}

const mutations={
  // 设置是否授权
  [types.SET_AUTHENTICATED](state,isAuthenticated){
    if(isAuthenticated){
      state.isAuthenticated=isAuthenticated;
    }else{
      state.isAuthenticated=false
    }
  },
  // 判断user是否存在
  [types.SET_USER](state,user){
    if(user){
      state.user=user;
    }
    else{
      state.user={}
    }
  }
}
const actions={
  // 接收dispatch
  setAuthenticated:({commit},isAuthenticated)=>{
    commit(types.SET_AUTHENTICATED,isAuthenticated);
  },
  setUser:({commit},user)=>{
    commit(types.SET_USER,user);
  },
  clearCurrentState:({commit})=>{
    commit(types.SET_AUTHENTICATED,false);
    commit(types.SET_USER,null)
  }
}



export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
