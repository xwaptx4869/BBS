'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')
const Label = require("./label")


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const Article  = app.model.define( 'article',{
        classification_ids: {
				// 目录分类
				type: STRING(1000),
			},
			label_ids: {
				// 标签索引
				type: STRING,
			},
			
			content: {
				// 内容
				type: TEXT
			},
			user_id:{ type: INTEGER},
			created_at: DATE,
			updated_at: DATE,
            title:{
                type:STRING(20),
                validate: {
					len: [ 1, 20 ],
				}, },
			browse_num:{
				type:INTEGER,
				defaultValue:0
			},
			praise:{
				type:INTEGER,
				defaultValue:0
			},
			article_id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
			comment_num: {
				// 评论数
				type: INTEGER,
				defaultValue: 0,
			},
			poster:{
				type: STRING(255),
			},
			introduction:{
				type: STRING(255),
			}
		}
	)
	// Article.belongsTo(Label,{foreignKey:'label_ids',targetKey:'id' })
	// Article.belongsTo(Label)
	// Article.belongsTo(Label,{foreignKey:'article_id',targetKey:'id' })
    return Article;
}