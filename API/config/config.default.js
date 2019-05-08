'use strict'

module.exports = appInfo => {
	const config = (exports = {})

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1534389869319_7185'

	// add your config here
	config.middleware = []

	// mysql 配置
	config.sequelize = {
		dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
		database: 'api',
		host: 'localhost',
		port: '3306',
		username: 'root',
		password: 'aptx4869',
	}

	// 文件大小配置
	config.multipart = {
		fileSize: '20mb',
	}

	//
	config.cors = {
		origin: '*',
		allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS',
		credentials: true,
	}

	config.security = {
		domainWhiteList: [ 'http://localhost:8080/' ],
		csrf: {
			enable: false, // 临时关闭
			ignoreJSON: true,
		},
	}

	return config
}