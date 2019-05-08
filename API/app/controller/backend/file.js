'use strict'
const Controller = require('egg').Controller

class FileController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session = ctx.session
		this.FileService = ctx.service.file
	}
//获取文件列表
	async getFileList () {
		const { page, rows } = this.ctx.request.query
    const { ...data } = this.ctx.request.body
		const respponse = await this.FileService.getFileList(page, rows,data)
		this.ctx.body = respponse
    }
//搜索文件
	async getFile () {
        //文件名
        const { page, rows,search } = this.ctx.request.query
		const respponse = await this.FileService.getFileList(
            page,
            rows,
            search)
		this.ctx.body = respponse
	}
// 获取某一文件信息
async getOneFile(){
	const  {id} = this.ctx.params
	const respponse = await this.FileService.getOneFile(id)
	this.ctx.body = respponse
}

//添加文件
	async addFile () {
		const FileInfo = this.ctx.request.body
		const respponse = await this.FileService.addFile(FileInfo)
		this.ctx.body = respponse
    }
//删除文件
    async deleteFile () {
		const {id} = this.ctx.params
		const respponse = await this.FileService.deleteFile(id)
		this.ctx.body = respponse
    }
//更新文件
    async editFile () {
		const {id, ...data} = this.ctx.request.body
		const respponse = await this.FileService.editFile(id,data)
		this.ctx.body = respponse
	}
}

module.exports = FileController