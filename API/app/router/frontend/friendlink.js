'use strict'

module.exports = app => {
	app.router.post(
		'/frontend/v1/friendlink',
		app.controller.backend.friendlink.getFriendLinkList
	)
	app.router.post(
        '/frontend/v1/friendlink/add',
         app.controller.backend.friendlink.addFriendLink)
    app.router.post(
        '/frontend/v1/friendlink/delete/:id',
        app.controller.backend.friendlink.deleteFriendLink)
    app.router.post(
        '/frontend/v1/friendlink/edit',
        app.controller.backend.friendlink.editFriendLink)
}