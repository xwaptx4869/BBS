'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const File  = app.model.define( 'file',{
        type: {
				// 0:图片；1:多媒体；2:文档；
				type: INTEGER
			},
			file_src: { 
                type: STRING(255),
            },
			created_at: DATE,
			updated_at: DATE,
			id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
		}
    )

    return File;
}