module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:7001',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/frontend/v1'
				}
			},
			'/upload': {
				target: 'http://127.0.0.1:7001',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/upload': '/frontend/v1'
				}
			}
		}
	}
}