'use strict'
const Controller = require('egg').Controller

class FriendLinkController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.FriendLinkService = ctx.service.friendlink
	}
//获取友链列表
	async getFriendLinkList () {
        const { page, rows } = this.ctx.request.query
		const respponse = await this.FriendLinkService.getFriendLinkList(page, rows)
		this.ctx.body = respponse
    }
//搜索友链
	async getFriendLink () {
        //友链名
        const { page, rows,search } = this.ctx.request.query
		const respponse = await this.FriendLinkService.getFriendLinkList(
            page,
            rows,
            search)
		this.ctx.body = respponse
	}
//添加友链
	async addFriendLink () {
		const FriendLinkInfo = this.ctx.request.body
		const respponse = await this.FriendLinkService.addFriendLink(FriendLinkInfo)
		this.ctx.body = respponse
    }
//删除友链
    async deleteFriendLink () {
		const {id} = this.ctx.params
		const respponse = await this.FriendLinkService.deleteFriendLink(id)
		this.ctx.body = respponse
    }
//更新友链
    async editFriendLink () {
		const {id, ...data} = this.ctx.request.body
		const respponse = await this.FriendLinkService.editFriendLink(id,data)
		this.ctx.body = respponse
	}
}

module.exports = FriendLinkController