import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/index.vue"
import register from "../views/register.vue"
import NotFound from "../views/404.vue"
import Login from "../views/login.vue"
import InfoShow from "../views/InfoShow.vue"
import Home from "../views/home.vue"
import FundList from "../views/FundList.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    children:[
      {path:"/infoshow",name:"infoshow",component:InfoShow},
      {path:"/home",name:"home",component:Home},
      {path:"/fundlist",name:"fundlist",component:FundList}
    ]
  },
  {
    path: "/register",
    name: "register",
    component: register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "*",
    name: "404",
    component: NotFound
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫---就是当前不登陆就没有办法进行访问 
router.beforeEach((to, from, next) => {
  // 判断是否登录
  const isLogin = localStorage.eleToken ? true : false;
  // login和register在任何时候都可以进行访问
  if (to.path == "/register" || to.path == "/login") {
    next()
  } else {
    // 如果在登录状态，就直接进行下一步
    // 如果不是登陆状态，则访问其他的页面就会被重定向到login页面
    isLogin ? next() : next('/login')
  }
})


export default router
