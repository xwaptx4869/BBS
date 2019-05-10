'use strict'

module.exports = app => {
	app.router.post(
		'/frontend/v1/file',
		app.controller.backend.file.getFileList
    )
    app.router.get(
		'/frontend/v1/file/:id',
		app.controller.backend.file.getOneFile
	)
	app.router.post(
        '/frontend/v1/file/add',
         app.controller.backend.file.addFile)
    app.router.post(
        '/frontend/v1/file/delete/:id',
        app.controller.backend.file.deleteFile)
    app.router.post(
        '/frontend/v1/file/edit',
        app.controller.backend.file.editFile)
}