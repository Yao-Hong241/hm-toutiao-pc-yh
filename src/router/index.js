import Router from 'vue-router'
import Vue from 'vue'

import Login from '@/views/Login'
Vue.use(Router)
const router = new Router({
  routes: [
    // 登录
    { path: '/login', component: Login }
  ]
})
export default router
