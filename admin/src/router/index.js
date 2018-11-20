import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//引入登录组件
import Login from '@/components/Login'
//引入主页面组件
import List from '@/components/List'

import Tag from '@/components/Tag'

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/list',
      component:List
    },
    {
      path:'/tag',
      component:Tag
    },
    {path:'*',redirect:'/login'}
  ]
})
