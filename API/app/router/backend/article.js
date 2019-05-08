'use strict'

module.exports = app => {
	app.router.get(
		'/backend/v1/article',
		app.controller.backend.article.getArticleList
    )
    app.router.get(
		'/backend/v1/article/:id',
		app.controller.backend.article.getOneArticle
	)
	app.router.post(
        '/backend/v1/article/add',
         app.controller.backend.article.addArticle)
    app.router.post(
        '/backend/v1/article/delete/:id',
        app.controller.backend.article.deleteArticle)
    app.router.post(
        '/backend/v1/article/edit',
        app.controller.backend.article.editArticle)
}