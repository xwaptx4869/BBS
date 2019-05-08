'use strict'

module.exports = {
	createType (userInfo) {
		const { username } = userInfo
		if (username && /^[\u4E00-\u9FA5A-Za-z0-9_]{4,16}$/.test(username)) {
			console.log(username);
			return { username }
		}
		return false
	},
}