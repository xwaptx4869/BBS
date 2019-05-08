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
          path:'/',
          component:resolve =>require(['@/components/Home.vue'],resolve)
        }
      ]
    }
  ]
})
