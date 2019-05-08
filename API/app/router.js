'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const { router, controller } = app
	router.get('/', controller.home.index)
	require('./router/backend/user')(app)
	require('./router/backend/article')(app)
	require('./router/backend/label')(app)
	require('./router/backend/comment')(app)
	require('./router/backend/reply')(app)
	require('./router/backend/album')(app)
	require('./router/backend/file')(app)
	require('./router/backend/classifications')(app)
	require('./router/backend/sensitivewords')(app)
	require('./router/backend/friendlink')(app)
	require('./router/backend/collegemsg')(app)
	require('./router/backend/upload')(app)
	require('./router/frontend/user')(app)


}