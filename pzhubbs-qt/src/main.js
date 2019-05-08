// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './plugins/element.js'
import Utils from './utils/utils'
import Common from './utils/common'
import '@/style/index.scss'

import './plugins/axios'
Vue.config.productionTip = false
Vue.prototype.xutils = Utils
Vue.prototype.xcommon = Common

// 用户是否登录钩子
// router.beforeEach((to, from, next) => {
// 	if (to.path === '/login/') return next()
// 	const token = ls.get('token')
// 	if (token) {
// 		if (!store.state.User.token) {
// 			// 获取用户信息
// 			store.dispatch('setUser')
// 			// 设置全局信息
// 			store.dispatch('setSystem')
// 		}
// 		next()
// 	} else {
// 		next('/login/')
// 	}
// })


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
