'use strict'
const Controller = require('egg').Controller

class CommentController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.CommentService = ctx.service.comment
	}
//获取评论列表
	async getCommentList () {
		const { page, rows } = this.ctx.request.query
    const { ...data } = this.ctx.request.body
		const respponse = await this.CommentService.getCommentList(page, rows,data)
		this.ctx.body = respponse
    }
//搜索评论
	async getComment () {
        //评论名
        const { page, rows,search } = this.ctx.request.query
		const respponse = await this.CommentService.getCommentList(
            page,
            rows,
            search)
		this.ctx.body = respponse
	}
//添加评论
	async addComment () {
		const CommentInfo = this.ctx.request.body
		const respponse = await this.CommentService.addComment(CommentInfo)
		this.ctx.body = respponse
    }
//删除评论
    async deleteComment () {
		const {id} = this.ctx.params
		const respponse = await this.CommentService.deleteComment(id)
		this.ctx.body = respponse
    }
//更新评论
    async editComment () {
		const {id, ...data} = this.ctx.request.body
		const respponse = await this.CommentService.editComment(id,data)
		this.ctx.body = respponse
	}

	// 获取某条评论
	async getOneComment() {
		const  {id} = this.ctx.params
		const respponse = await this.CommentService.getOneComment(id)
		this.ctx.body = respponse
	}
}

module.exports = CommentController