'use strict'

module.exports = app => {
	app.router.post(
		'/frontend/v1/register',
		app.controller.backend.user.register
	)
	app.router.post('/frontend/v1/login', app.controller.backend.user.login)
}