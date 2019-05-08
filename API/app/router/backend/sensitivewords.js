'use strict'

module.exports = app => {
	app.router.post(
		'/backend/v1/sensitivewords',
		app.controller.backend.sensitivewords.getSensitiveWordsList
	)
	app.router.post(
        '/backend/v1/sensitivewords/add',
         app.controller.backend.sensitivewords.addSensitiveWords)
    app.router.post(
        '/backend/v1/sensitivewords/delete/:id',
        app.controller.backend.sensitivewords.deleteSensitiveWords)
    app.router.post(
        '/backend/v1/sensitivewords/edit',
        app.controller.backend.sensitivewords.editSensitiveWords)
}