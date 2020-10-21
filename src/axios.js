import axios from 'axios'
import element from 'element-ui'
import router from './router'
import store from './store'

axios.defaults.baseURL="http://localhost:8091"
//前置拦截
axios.interceptors.request.use(config=>{
  return config
})
//后置拦截
axios.interceptors.response.use(response=>{
  let res=response.data
  console.log(res)
  if (res.code===200){
    return response
  } else {
    element.Message.error(res.msg,{duration:2*1000})
    return Promise.reject(res.msg)
  }
},
  error => {
  console.log(error)
    if (error.response.data) {
    error.message=error.response.data.msg
    }
    let status =error.response.status
    if (status===401){
      store.commit("REMOVE_INFO")
      router.push("/login")
    }else {
      element.Message.error(error.message,{duration:2*1000})
      return Promise.reject(error)
    }
  }
)

export default axios
