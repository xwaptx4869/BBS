'use strict'
const Controller = require('egg').Controller

class LabelController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.LabelService = ctx.service.label
	}
//获取标签列表
	async getLabelList () {
        const { page, rows } = this.ctx.request.query
		const respponse = await this.LabelService.getLabelList(page, rows)
		this.ctx.body = respponse
    }
//搜索标签
	async getLabel () {
        //标签名
        const { page, rows,search } = this.ctx.request.query
		const respponse = await this.LabelService.getLabelList(
            page,
            rows,
            search)
		this.ctx.body = respponse
	}
//添加标签
	async addLabel () {
		const LabelInfo = this.ctx.request.body
		const respponse = await this.LabelService.addLabel(LabelInfo)
		this.ctx.body = respponse
    }
//删除标签
    async deleteLabel () {
		const {id} = this.ctx.params
		const respponse = await this.LabelService.deleteLabel(id)
		this.ctx.body = respponse
    }
//更新标签
    async editLabel () {
		const {id, ...data} = this.ctx.request.body
		const respponse = await this.LabelService.editLabel(id,data)
		this.ctx.body = respponse
	}
}

module.exports = LabelController