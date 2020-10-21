import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

export default new vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  mutations: {
    //set
    SET_TOKEN:(state,token)=>{
      state.token=token
      localStorage.setItem("token",token)
    },
    SET_USERINFO:(state,userInfo)=>{
      state.userInfo=userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE_INFO:(state)=>{
      state.token=''
      state.userInfo={}
      localStorage.setItem("token",'')
      sessionStorage.setItem("userInfo",JSON.stringify(''))

    }
  },
  getters: {
    //get
    getUser: state =>{
      return state.userInfo
    }
  },
  actions: {

  },
  modules: {

  }
})
