'use strict'

const bcrypt = require('bcrypt-nodejs')
const _ = require('lodash')


module.exports = app => {
	const { STRING, INTEGER,DATE,TEXT } = app.Sequelize
    const FriendLink  = app.model.define( 'friendlink',{
			created_at: DATE,
            updated_at: DATE,
            name:{
                type: STRING(20) ,
            	validate: {
					len: [ 2, 20 ],
                }
            },
            src:{
                type: STRING(255) ,
                validate: {
					isUrl: true,
                }
            },
			id:{ type: INTEGER, primaryKey: true, autoIncrement: true },
		}
    )
    return FriendLink;
}