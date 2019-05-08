'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const Comment  = app.model.define( 'comment',{
        reply_ids: {
				// 回复者列表
				type: STRING(1000),
				defaultvlue:null
			},
			content: {
				// 内容
				type: TEXT
			},
			connect_id: { 
                //关联用户的id
                type: INTEGER},
			created_at: DATE,
			updated_at: DATE,
            type:INTEGER,
			id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
		}
    )

    return Comment;
}