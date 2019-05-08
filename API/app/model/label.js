'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const Label  = app.model.define( 'label',{
			created_at: DATE,
			updated_at: DATE,
            name:{
                type: STRING(20) ,
            	validate: {
					len: [ 2, 20 ],
				}, },
			id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
		}
    )
    return Label;
}