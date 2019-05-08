'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')

module.exports = app => {
	const { STRING, INTEGER,DATE } = app.Sequelize

	const User = app.model.define(
		'user',
		{
			username: {
				// 用户名
				type: STRING(32),
			},
			password: {
				// 密码
				type: STRING(60),
				validate: {
					len: [ 6, 60 ],
				},
			},
			
			avatar: {
				// 头像
				type: STRING(255),
				validate: {
					isUrl: true,
				},
			},
			id: { type: INTEGER, primaryKey: true, autoIncrement: true },
			created_at: DATE,
			updated_at: DATE,
			nickname:STRING(10),
			like_count:INTEGER,
			college_ids:STRING(1000),
			mood:STRING(40),
			like_ids:STRING(1000),
			role: {
				// 权限等级
				type: INTEGER,
				defaultValue: 0,
			},
		},
		{
			indexes: [
				{
					fields: [ 'username' ],
				}
			],
		}
	)

	User.beforeCreate((user, options) => {
		// 进行加密（加盐）
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(user.password, salt)
		user.password = hash
		return user
	})

	// 对比密码
	User.prototype.comparePassword = function (candidatePassword) {
		return bcrypt.compareSync(candidatePassword, this.password)
	}

	// 移除一个私有属性
	User.prototype.unset = function () {
		const user = this.toJSON()
		_.unset(user, 'password')
		_.unset(user, 'role')
		return user
	}
	return User
}