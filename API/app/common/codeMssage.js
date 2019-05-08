'use strict'

// CODE_MSSAGE 对应码解析
// 1-2位表示    对应业务对象
// 3位表示      对应业务异常所处处理阶段 0是 service  1是 controller
// 4-6位表示    对应业务异常具体异常码
// 1-2位对应业务码如下：
// 		1	user  		对应用户业务code
//		2	mosca		对应mosca业务code
//		3	footprint	对应足迹业务code
// 		4	comment		对应评论业务code
//		5	fans		对应粉丝业务code
//		6	follow		对应关注业务code

module.exports = {
	100001: '参数验证失败',
	100002: '用户已注册',
	100003: '账户未被注册',
	100004: '登录密码错误',
	100005: '用户列表获取失败',
}