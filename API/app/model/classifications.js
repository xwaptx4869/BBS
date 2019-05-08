'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const Classifications  = app.model.define( 'classifications',{
			name: {
				// 标题
				type: STRING
			},
			id:{
				type: INTEGER, primaryKey: true, autoIncrement: true
			},
			created_at: DATE,
			updated_at: DATE,
            d_id:{ 
                //自身id
                type: INTEGER, defaultValue: 0 },
			p_id:{ 
                //父级id
                type: INTEGER, defaultValue: 1 },            
		}
    )

    return Classifications;
}