import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import User from '@/store/modules/User'
import System from '@/store/modules/System'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const state ={
	username:'',
	userId:'',
	role:false
} 
const mutations= {
	changeuername(state,username){
		state.username = username
	},
	changeuserid(state,id){
		state.userId = id
	},
	changerole(state,role){
		state.role = role
	}
}
export default new Vuex.Store({
	modules: {
		User,
		System
	},
	strict: debug,
	state,
	mutations,
	plugins: debug ? [createLogger()] : []
})