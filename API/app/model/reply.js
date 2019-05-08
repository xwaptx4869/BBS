'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const Reply  = app.model.define( 'reply',{
			content: {
				// 内容
				type: TEXT
			},
			user_id: { type: INTEGER},
			created_at: DATE,
			updated_at: DATE,
			id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
		}
    )

    return Reply;
}