import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: resolve => require(['@/components/Page.vue'], resolve),
    children: [{
        name: 'home',
        path: '/',
        component: resolve => require(['@/components/Home.vue'], resolve)
      },
      {
        name: "articleDetails",
        path: '/articleDetails/:id',
        component: resolve => require(['@/views/ArticleManage.vue'], resolve)
      },
      {
        name: "photolist",
        path: '/photolist/:id',
        component: resolve => require(['@/views/PhotoList.vue'], resolve)
      },
      {
        name: "photodetails",
        path: '/photodetails/:id',
        component: resolve => require(['@/views/PhotoDetails.vue'], resolve)
      },
      {
        name: "msgboard",
        path: '/msgboard/:id',
        component: resolve => require(['@/views/MessageBoard.vue'], resolve)
      },
      {
        name: "toolmanage",
        path: '/toolmanage/:id',
        component: resolve => require(['@/views/ToolManage.vue'], resolve)
      },
      {
        name: "usercenter",
        path: '/usercenter/:id',
        component: resolve => require(['@/views/UserCenter.vue'], resolve)
      },
      {
        name: "writearticle",
        path: '/writearticle',
        component: resolve => require(['@/views/WriteArticle.vue'], resolve)
      }
    ]
  }]
})
