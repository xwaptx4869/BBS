'use strict'

module.exports = app => {
	app.router.post(
		'/backend/v1/upload/savefile',
		app.controller.backend.uploadapicontroller.saveFile
	)
	app.router.post(
        '/backend/v1/upload/savemultiple',
         app.controller.backend.uploadapicontroller.saveMultiple)
    app.router.post(
        '/backend/v1/upload/upload',
        app.controller.backend.uploadapicontroller.upload)
    app.router.post(
        '/backend/v1/upload/uploadall',
        app.controller.backend.uploadapicontroller.uploadAll)
    app.router.post(
        '/backend/v1/upload/editoruploadall',
        app.controller.backend.uploadapicontroller.editorUploadAll)
}