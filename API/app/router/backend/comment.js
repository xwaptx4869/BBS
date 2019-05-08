'use strict'

module.exports = app => {
	app.router.post(
		'/backend/v1/comment',
		app.controller.backend.comment.getCommentList
    )
    app.router.get(
		'/backend/v1/comment/:id',
		app.controller.backend.comment.getOneComment
	)
	app.router.post(
        '/backend/v1/comment/add',
         app.controller.backend.comment.addComment)
    app.router.post(
        '/backend/v1/comment/delete/:id',
        app.controller.backend.comment.deleteComment)
    app.router.post(
        '/backend/v1/comment/edit',
        app.controller.backend.comment.editComment)
}