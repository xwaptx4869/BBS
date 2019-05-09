import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:resolve => require(['@/components/Page.vue'],resolve),
      children:[
        {
          name:'home',
          path:'/',
          component:resolve =>require(['@/components/Home.vue'],resolve)
        },
        {
          name:"articleDetails",
          path:'/articleDetails/:id',
          component:resolve =>require(['@/views/ArticleManage.vue'],resolve)
        }
      ]
    }
  ]
})
