'use strict'

module.exports = app => {
	class WeappController extends app.Controller {
		async login () {
			const { ctx, app } = this
			const loginService = app.weapp.LoginService.create(
				ctx.request,
				ctx.response
			)
			const data = await loginService.login()
			const userInfo = data.userInfo
			const user = await ctx.service.user.getOauthUser(userInfo, 'WEAPP')

			const managers = await ctx.model.models.school_managers.findAll({
				attributes: { exclude: [ 'createdAt', 'updatedAt' ] },
				where: {
					userId: user.id,
				},
			})
			data.userInfo = Object.assign(
				{
					id: user.id,
					name: user.name,
					avatar: user.avatar,
					inChargeOf: managers.map(item => item.schoolId),
				},
				data.userInfo
			)
			ctx.body = data
		}

		async user () {
			const { ctx } = this
			const user = await ctx.service.user.checkWeappUser()
			ctx.body = { code: 0, msg: 'ok', user }
		}
	}
	return WeappController
}