'use strict'

module.exports = app => {
	app.router.post(
		'/backend/v1/classifications',
		app.controller.backend.classifications.getClassificationsList
	)
	app.router.post(
        '/backend/v1/classifications/add',
         app.controller.backend.classifications.addClassifications)
    app.router.post(
        '/backend/v1/classifications/delete/:id',
        app.controller.backend.classifications.deleteClassifications)
    app.router.post(
        '/backend/v1/classifications/edit',
        app.controller.backend.classifications.editClassifications)
}