'use strict'
const Controller = require('egg').Controller

class CollegeMsgController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.CollegeMsgService = ctx.service.collegemsg
	}
//获取院系信息列表
	async getCollegeMsgList () {
        const { page, rows } = this.ctx.request.query
		const respponse = await this.CollegeMsgService.getCollegeMsgList(page, rows)
		this.ctx.body = respponse
    }
//搜索院系信息
	async getCollegeMsg () {
        const { page, rows,svalue } = this.ctx.request.query
        const search = {svalue};
		const respponse = await this.CollegeMsgService.getCollegeMsgList(
                        page,
						rows,
						search)
		this.ctx.body = respponse
	}
//添加院系信息
	async addCollegeMsg () {
		const CollegeMsgInfo = this.ctx.request.body
		const respponse = await this.CollegeMsgService.addCollegeMsg(CollegeMsgInfo)
		this.ctx.body = respponse
    }
//删除院系信息
    async deleteCollegeMsg () {
		const {id} = this.ctx.params
		const respponse = await this.CollegeMsgService.deleteCollegeMsg(id)
		this.ctx.body = respponse
    }
//更新院系信息
    async editCollegeMsg () {
		const {id, ...data} = this.ctx.request.body
		const respponse = await this.CollegeMsgService.editCollegeMsg(id,data)
		this.ctx.body = respponse
	}
}

module.exports = CollegeMsgController