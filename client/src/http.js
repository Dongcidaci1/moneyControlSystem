const axios = require("axios");
import { Loading } from 'element-ui';
import { Message } from 'element-ui';
const router = require('./router');
// Loading.service(options);
let loading;
function startLoading(){
  loading=Loading.service({
    lock:true,
    text:"拼命加载中...",
    background:'rgba(0,0,0,0.7)'
  })
}

function endLoading(){
  loading.close();
}

//1.请求拦截
axios.interceptors.request.use(config=>{
  //加载动画
  startLoading();
  // 判断token是否存在
  // 存在的话就设置统一的请求头
  if(localStorage.eleToken){
    config.headers.Authorization=localStorage.eleToken;
  }
  return config;
},error=>{
  return Promise.reject(error)
})


//2.响应拦截
axios.interceptors.response.use(response=>{
  endLoading();
  return response;
},error=>{
  // 错误提醒
  endLoading();
  Message.error(error.response.data);
  // 获取状态码，401代表token失效
  const {status} = error.response;
  if(status=='401'){
    Message.error("token失效，请重新登录");
    // 清除token
    localStorage.removeItem("eleToken");
    // 跳转至登录界面
    router.push('/login');
  }

  return Promise.reject(error);
})



export default axios;