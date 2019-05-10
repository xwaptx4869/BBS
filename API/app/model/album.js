'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const Album  = app.model.define( 'album',{
			title: {
				// 标题
				type: STRING
			},
			poster: { 
                type: STRING(255)
            },
            file_ids:{
                //图片列表
                type:STRING(255)
            },
			created_at: DATE,
			updated_at: DATE,
			id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
		}
    )

    return Album;
}