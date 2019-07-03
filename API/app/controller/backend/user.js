'use strict'
const Controller = require('egg').Controller

class UserController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.UserService = ctx.service.user
	}

	async register () {
		const userInfo = this.ctx.request.body
		console.log(this.ctx.request)
		const respponse = await this.UserService.create(userInfo)
		this.ctx.body = respponse
	}

	async login () { 
		const userInfo = this.ctx.request.body
		const respponse = await this.UserService.login(userInfo)
		this.ctx.body = respponse
	}
	async getUser () { 
		const  {id} = this.ctx.params
		const respponse = await this.UserService.getUser(id)
		this.ctx.body = respponse
	}
}

module.exports = UserController