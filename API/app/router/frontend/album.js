'use strict'

module.exports = app => {
    app.router.post(
        '/frontend/v1/album',
        app.controller.backend.album.getAlbumList
    )
    app.router.post(
        '/frontend/v1/album/add',
        app.controller.backend.album.addAlbum)
    app.router.post(
        '/frontend/v1/album/delete/:id',
        app.controller.backend.album.deleteAlbum)
    app.router.post(
        '/frontend/v1/album/getonealbum/:id',
        app.controller.backend.album.getOneAlbum)
    app.router.post(
        '/frontend/v1/album/edit',
        app.controller.backend.album.editAlbum)
}