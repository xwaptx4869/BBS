'use strict'

const Controller = require('egg').Controller
const path = require('path')
const fs = require('fs')
const sendToWormhole = require('stream-wormhole')
const { PATH, SETPATH } = require('../../common/image')

class UploadApiController extends Controller {
	constructor (ctx) {
		super(ctx)
		this.session  = ctx.session
		this.resquest = ctx.request
		this.ResponseCode = ctx.response.ResponseCode
		this.ServerResponse = ctx.response.ServerResponse
	}
	/**
	 * 保存单个文件
	 * @param {stream} stream 流对象
	 * @return {ServerResponse} 返回的消息对象
	 */
	async saveFile (stream) {
		let response
		const extname = path.extname(stream.filename)
		const name = path.basename(stream.filename, extname)
		const filename = name + Date.now() + extname
		try {
			// 本地上传
			const ws = fs.createWriteStream(path.resolve(SETPATH + filename))
			stream.pipe(ws)
		} catch (e) {
			await sendToWormhole(stream)
			response = this.ServerResponse.error(20601, '上传图片失败')
		} finally {
			await sendToWormhole(stream)
		}
		response = this.ServerResponse.success(
			PATH + filename,
			'上传图片成功'
		)
		return response
	}
	/**
	 * 保存多个文件
	 * @param {stream} parts 流对象集合
	 * @return {ServerResponse} 返回的消息对象
	 */
	async saveMultiple (parts) {
		let part
		const images = []
		while ((part = await parts()) != null) {
			if (!part.length) {
				if (!part.filename) {
					return this.ServerResponse.createByError(
						20702,
						'上传图片失败，上传图片为空'
					)
				}
				const response = await this.saveFile(part)
				if (!response.isSuccess()) {
					return this.ServerResponse.createByError(
						20703,
						'批量上传失败，某一个图片保存失败'
					)
				}
				images.push(response.data)
			}
		}
		return this.ServerResponse.createBySuccess(images, '批量上传成功')
	}
	// 单个文件上传
	async upload () {
		const stream = await this.ctx.getFileStream()
		const response = await this.saveFile(stream)
		this.ctx.body = response
	}
	// 多个文件上传
	async uploadAll () {
		const ctx = this.ctx
		const parts = ctx.multipart()
		const response = await this.saveMultiple(parts)
		this.ctx.body = response
	}
	// 后台文本编辑器图片上传
	async editorUploadAll () {
		const ctx = this.ctx
		const parts = ctx.multipart()
		let response = await this.saveMultiple(parts)
		if (response.isSuccess()) {
			response = {
				errno: 0,
				data: response.data,
			}
		}
		this.ctx.body = response
	}
}

module.exports = UploadApiController