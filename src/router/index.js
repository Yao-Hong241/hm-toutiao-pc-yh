import Router from 'vue-router'
import Vue from 'vue'
import store from '@/store'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Article from '@/views/article'
import Images from '@/views/images'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Fans from '@/views/fans'
import Setting from '@/views/setting'
import NotFound from '@/views/404'

Vue.use(Router)
const router = new Router({
  routes: [
    // 登录
    { path: '/login', component: Login },
    // 首页
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎页面
        { path: '/', component: Welcome },
        // 内容管理
        { path: '/article', component: Article },
        // 素材管理
        { path: '/images', component: Images },
        // 发布文章
        { path: '/publish', component: Publish },
        // 评论
        { path: '/comment', component: Comment },
        // 粉丝
        { path: '/fans', component: Fans },
        // 个人设置
        { path: '/setting', component: Setting }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})
export default router
