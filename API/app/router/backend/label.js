'use strict'

module.exports = app => {
	app.router.get(
		'/backend/v1/label',
		app.controller.backend.label.getLabelList
	)
	app.router.post(
        '/backend/v1/label/add',
         app.controller.backend.label.addLabel)
    app.router.post(
        '/backend/v1/label/delete/:id',
        app.controller.backend.label.deleteLabel)
    app.router.post(
        '/backend/v1/label/edit',
        app.controller.backend.label.editLabel)
}