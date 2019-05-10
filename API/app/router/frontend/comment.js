'use strict'

module.exports = app => {
	app.router.post(
		'/frontend/v1/comment',
		app.controller.backend.comment.getCommentList
    )
    app.router.get(
		'/frontend/v1/comment/:id',
		app.controller.backend.comment.getOneComment
	)
	app.router.post(
        '/frontend/v1/comment/add',
         app.controller.backend.comment.addComment)
    app.router.post(
        '/frontend/v1/comment/delete/:id',
        app.controller.backend.comment.deleteComment)
    app.router.post(
        '/frontend/v1/comment/edit',
        app.controller.backend.comment.editComment)
}