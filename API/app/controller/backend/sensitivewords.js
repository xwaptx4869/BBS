'use strict'
const Controller = require('egg').Controller

class SensitiveWordsController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.SensitiveWordsService = ctx.service.sensitivewords
	}
//获取敏感词列表
	async getSensitiveWordsList () {
        const { page, rows } = this.ctx.request.query
		const respponse = await this.SensitiveWordsService.getSensitiveWordsList(page, rows)
		this.ctx.body = respponse
    }
//搜索敏感词
	async getSensitiveWords () {
        //敏感词名
        const { page, rows,search } = this.ctx.request.query
		const respponse = await this.SensitiveWordsService.getSensitiveWordsList(
            page,
            rows,
            search)
		this.ctx.body = respponse
	}
//添加敏感词
	async addSensitiveWords () {
		const SensitiveWordsInfo = this.ctx.request.body
		const respponse = await this.SensitiveWordsService.addSensitiveWords(SensitiveWordsInfo)
		this.ctx.body = respponse
    }
//删除敏感词
    async deleteSensitiveWords () {
		const {id} = this.ctx.params
		const respponse = await this.SensitiveWordsService.deleteSensitiveWords(id)
		this.ctx.body = respponse
    }
//更新敏感词
    async editSensitiveWords () {
		const {id, ...data} = this.ctx.request.body
		const respponse = await this.SensitiveWordsService.editSensitiveWords(id,data)
		this.ctx.body = respponse
	}
}

module.exports = SensitiveWordsController