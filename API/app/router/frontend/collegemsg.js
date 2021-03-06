'use strict'

module.exports = app => {
	app.router.post(
		'/frontend/v1/collegemsg',
		app.controller.backend.collegemsg.getCollegeMsgList
	)
	app.router.post(
        '/frontend/v1/collegemsg/add',
         app.controller.backend.collegemsg.addCollegeMsg)
    app.router.post(
        '/frontend/v1/collegemsg/delete/:id',
        app.controller.backend.collegemsg.deleteCollegeMsg)
    app.router.post(
        '/frontend/v1/collegemsg/edit',
        app.controller.backend.collegemsg.editCollegeMsg)
}