'use strict'

const { SUCCESS, SUCCESS_MSSAGE, DOCS_URL } = require('./responseCode')
const CodeMssage = require('./codeMssage')

module.exports = class ServerResponse {
	// 构造函数初始化对象字段
	constructor (status, message, data, url) {
		this.status = status
		this.message = message
		this.data = data
		this.documentation_url = url
	}
	// 判断是否成功
	isSuccess () {
		return this.status === SUCCESS
	}
	// 获取状态码
	getStatus () {
		return this.status
	}
	// 获取JSON数据源
	getData () {
		return this.data
	}
	// 获取消息描述
	getMessage () {
		return this.message
	}
	// 成功数据对象
	static success (data, message = SUCCESS_MSSAGE) {
		return new ServerResponse(SUCCESS, message, data, null)
	}
	// 失败返回对象
	static error (status, docs_url = DOCS_URL) {
		return new ServerResponse(status, CodeMssage[status], {}, docs_url)
	}
}