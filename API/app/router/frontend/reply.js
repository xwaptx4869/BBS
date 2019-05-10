'use strict'

module.exports = app => {
	app.router.post(
		'/frontend/v1/reply',
		app.controller.backend.reply.getReplyList
    )
    app.router.get(
		'/frontend/v1/reply/:id',
		app.controller.backend.reply.getOneReply
	)
	app.router.post(
        '/frontend/v1/reply/add',
         app.controller.backend.reply.addReply)
    app.router.post(
        '/frontend/v1/reply/delete/:id',
        app.controller.backend.reply.deleteReply)
    app.router.post(
        '/frontend/v1/reply/edit',
        app.controller.backend.reply.editReply)
}