'use strict'
const Controller = require('egg').Controller

class ArticleController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.ArticleService = ctx.service.article
	}
//获取文章列表
	async getArticleList () {
        const { page, rows } = this.ctx.request.query
		const respponse = await this.ArticleService.getArticleList(page, rows)
		this.ctx.body = respponse
    }
//搜索文章
	async getArticle () {
        //标签名/分类/关键字 搜索文章
        const { page, rows, search } = this.ctx.request.query
		const respponse = await this.ArticleService.getArticleList(
            page,
						rows,
						search)
		this.ctx.body = respponse
	}
//添加文章
	async addArticle () {
		const articleInfo = this.ctx.request.body
		const respponse = await this.ArticleService.addArticle(articleInfo)
		this.ctx.body = respponse
    }
//删除文章
    async deleteArticle () {
		const {id} = this.ctx.params
		const respponse = await this.ArticleService.deleteArticle(id)
		this.ctx.body = respponse
    }
//更新文章
    async editArticle () {
		const {article_id, ...data} = this.ctx.request.body
		const respponse = await this.ArticleService.editArticle(article_id,data)
		this.ctx.body = respponse
	}
// 获取一篇文章
		async getOneArticle() {
			const  {id} = this.ctx.params
			const respponse = await this.ArticleService.getOneArticle(id)
			this.ctx.body = respponse
		}
}

module.exports = ArticleController