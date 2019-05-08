'use strict'
const Controller = require('egg').Controller

class ReplyController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.ReplyService = ctx.service.reply
	}
//获取回复列表
	async getReplyList () {
        const { page, rows } = this.ctx.request.query
		const respponse = await this.ReplyService.getReplyList(page, rows)
		this.ctx.body = respponse
    }
//搜索回复
	async getReply () {
        //回复名
        const { page, rows,search } = this.ctx.request.query
		const respponse = await this.ReplyService.getReplyList(
            page,
            rows,
            search)
		this.ctx.body = respponse
	}
// 获取某一条回复
	async getOneReply(){
		const  {id} = this.ctx.params
		const respponse = await this.ReplyService.getOneReply(id)
		this.ctx.body = respponse
	}

//添加回复
	async addReply () {
		const ReplyInfo = this.ctx.request.body
		const respponse = await this.ReplyService.addReply(ReplyInfo)
		this.ctx.body = respponse
    }
//删除回复
    async deleteReply () {
		const {id} = this.ctx.params
		const respponse = await this.ReplyService.deleteReply(id)
		this.ctx.body = respponse
    }
//更新回复
    async editReply () {
		const {id, ...data} = this.ctx.request.body
		const respponse = await this.ReplyService.editReply(id,data)
		this.ctx.body = respponse
	}
}

module.exports = ReplyController