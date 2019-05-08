'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const CollegeMsg  = app.model.define( 'collegemsg',{
			created_at: DATE,
			updated_at: DATE,
            college:{
                type: STRING(20) ,
            	validate: {
					len: [ 2, 20 ],
                }, },
            major:{
                type: STRING(20) ,
            	validate: {
					len: [ 2, 20 ],
                }, },
			id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
		}
    )
    return CollegeMsg;
}