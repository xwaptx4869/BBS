'use strict'
const Controller = require('egg').Controller

class ClassificationsController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.ClassificationsService = ctx.service.classifications
	}
//获取分类列表
	async getClassificationsList () {
		const { page, rows } = this.ctx.request.query
    const { ...data } = this.ctx.request.body
		const respponse = await this.ClassificationsService.getClassificationsList(page, rows,data)
		this.ctx.body = respponse
    }
//搜索分类
	async getClassifications () {
        //分类名
        const { page, rows,search } = this.ctx.request.query
		const respponse = await this.ClassificationsService.getClassificationsList(
            page,
            rows,
            search)
		this.ctx.body = respponse
	}
//添加分类
	async addClassifications () {
		const ClassificationsInfo = this.ctx.request.body
		const respponse = await this.ClassificationsService.addClassifications(ClassificationsInfo)
		this.ctx.body = respponse
    }
//删除分类
    async deleteClassifications () {
		const {id} = this.ctx.params
		const respponse = await this.ClassificationsService.deleteClassifications(id)
		this.ctx.body = respponse
    }
//更新分类
    async editClassifications () {
		const {id, ...data} = this.ctx.request.body
		const respponse = await this.ClassificationsService.editClassifications(id,data)
		this.ctx.body = respponse
	}
}

module.exports = ClassificationsController