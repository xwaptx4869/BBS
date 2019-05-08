'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const SensitiveWords  = app.model.define( 'sensitivewords',{
			created_at: DATE,
			updated_at: DATE,
            name:{
                type: STRING(20) ,
            	validate: {
					len: [ 1, 20 ],
				}, },
			id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
		}
    )
    return SensitiveWords;
}