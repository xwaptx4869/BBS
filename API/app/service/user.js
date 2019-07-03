'use strict'

const userUtils = require('../utils/user')
const { SIZE, PAGE } = require('../common/row')

// 用户验证
const createRule = {
	username: {
		type: 'string',
		format: /^[\u4E00-\u9FA5A-Za-z0-9_]{4,16}$/,
		required: true,
	},
	password: {
		type: 'string',
		format: /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,16}$/,
		required: true,
	},
}

module.exports = app => {
	class UserService extends app.Service {
		constructor (ctx) {
			super(ctx)
			this.UserModel = ctx.model.User
			this.ServerResponse = ctx.response.ServerResponse
		}

		/**
		 * 验证是否有用户数据
		 * @param {String} query 需要验证的数据对象
		 * @return {Promise.<boolean>} 查询到的数据对象
		 */
		async checkUser (query) {
			const data = await this.UserModel.findOne({
				attributes: [ 'username' ],
				where: query,
			})
			return !!data
		}

		/**
		 * 用户注册
		 * @param {Object} userInfo 用户注册信息
		 * @return {ServerResponse} 返回注册成功后的用户对象
		 */
		async create (userInfo) {
			const { ctx } = this
			try {
				// 验证用户注册信息
				ctx.validate(createRule, userInfo)
			} catch (err) {
				console.log(err)
				return this.ServerResponse.error(100001)
			}
			// 验证是否已经注册
			if (await this.checkUser(userUtils.createType(userInfo))) {
				return this.ServerResponse.error(100002)
			}
			const user = await this.UserModel.create(userInfo)
			return this.ServerResponse.success(user)
		}

		/**
		 * 用户登录
		 * @param {Object} userInfo 用户登录信息
		 * @return {ServerResponse} 返回注册成功后的用户对象
		 */
		async login (userInfo) {
			const { ctx } = this
			try {
				// 验证登录信息
				ctx.validate(createRule, userInfo)
			} catch (err) {
				return this.ServerResponse.error(100001)
			}
			const user = await this.UserModel.findOne({
				where: userUtils.createType(userInfo),
			})
			if (!user) {
				// 未注册
				return this.ServerResponse.error(100003)
			}
			if (!user.comparePassword(userInfo.password)) {
				// 密码不正确
				return this.ServerResponse.error(100004)
			}
			return this.ServerResponse.success(user.unset())

		}

		/**
		 * 获取用户列表
		 * @param {Number} page 下标
		 * @param {Number} size 长度
		 * @return {Array} users 用户列表
		 */
		async list (page = PAGE, size = SIZE) {
			const users = await this.UserModel.findAll({
				offset: page * size,
				limit: size,
				attributes: [ 'username' ],
				where: {
					is_active: true,
				},
			})
			if (!users) return this.ServerResponse.error(100005)
			return users
		}

		/**
		 * 获取用户
		 * @param {Number} page 下标
		 * @param {Number} size 长度
		 * @return {Array} users 用户列表
		 */
		async getUser (id) {
			const users = await this.UserModel.findOne({
				where: {
					id: id,
				},
			})
			if (!users) return this.ServerResponse.error(100005)
			return users
		}


	}
	return UserService
}