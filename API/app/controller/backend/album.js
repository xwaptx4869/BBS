'use strict'
const Controller = require('egg').Controller

class AlbumController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.AlbumService = ctx.service.album
	}
//获取相册列表
	async getAlbumList () {
        const { page, rows } = this.ctx.request.query
		const respponse = await this.AlbumService.getAlbumList(page, rows)
		this.ctx.body = respponse
    }
//搜索相册
	async getAlbum () {
        //标签名/分类/关键字 搜索相册
        const { page, rows,svalue } = this.ctx.request.query
        const search = {svalue};
		const respponse = await this.AlbumService.getAlbumList(
                        page,
						rows,
						search)
		this.ctx.body = respponse
	}
//添加相册
	async addAlbum () {
		const AlbumInfo = this.ctx.request.body
		const respponse = await this.AlbumService.addAlbum(AlbumInfo)
		this.ctx.body = respponse
    }
//删除相册
    async deleteAlbum () {
		const {id} = this.ctx.params
		const respponse = await this.AlbumService.deleteAlbum(id)
		this.ctx.body = respponse
    }
//更新相册
    async editAlbum () {
		const {id, ...data} = this.ctx.request.body
		const respponse = await this.AlbumService.editAlbum(id,data)
		this.ctx.body = respponse
	}
}

module.exports = AlbumController