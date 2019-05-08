'use strict'

const userUtils = require('../utils/user')
const { SIZE, PAGE } = require('../common/row')
/**
 * 获取列表数据
 * @param {Int} page 分页页数
 * @param {Int} SIZE 分页长度
 * @param {Object} search 搜索对象
 * @return {ServerResponse} 返回的消息对象
 */
//友链创建规则
    const FriendLinkRuler = {
        name:{
            type:'string',
            required:true
        },
        src:{
            type:'url',
            required:true,
        }
    }

module.exports = app =>{
    class FriendLinkService extends app.Service{
        constructor (ctx) {
			super(ctx)
			this.ResponseCode = ctx.response.ResponseCode
			this.ServerResponse = ctx.response.ServerResponse
        }

        //验证数据
        async checkData(key,value){
            const query = {}
            query[key] = value;
            const data = await this.ctx.model.Friendlink.findOne(
                {
                    where:query
                }
            );
            return !!data
        }
        //验证友链
        async checkArtcle(key,value){
            if( key.trim() ){
                return (await this.checkData(key,value)) 
                ? this.ServerResponse.error(
                    '友链已经存在'
                )
                :this.ServerResponse.success(
                    '友链验证成功'
                )
            }
            return this.ServerResponse.error(
                '友链创建失败,参数错误'
            )
        }

        //获取友链列表
        async getFriendLinkList(page = PAGE,size = SIZE,data={}){
            try {
                 const index = page * size
                 const FriendLinks = await this.ctx.model.Friendlink.findAll(
                         {
                            offset: index,
                            limit: size,
                            // where:{
                            //     type:data.type,
                            //     connect_id:data.connect_id
                            // }
                         }
                     )
                 return this.ServerResponse.success(
                         FriendLinks,
                         '友链获取成功'
                     )
            }catch(error){
                console.log(error);
                    return this.ServerResponse.error(
                        '友链获取失败'
                    )
            }

        }

        //添加友链
        async addFriendLink(datalist){
              try{
                this.ctx.validate(FriendLinkRuler,datalist)
              }catch(error){
                console.log(error)
			    return this.ServerResponse.error(
				'友链创建失败，请检查提交参数'
			)
              }
            //   检查友链是否存在
            const validtitle = await this.checkArtcle('src',datalist.src)
            if (!validtitle.isSuccess()) return validtitle
                try {
                    let createFriendLink = await this.ctx.model.Friendlink.create(
                        datalist
                    )
                    if (!createFriendLink) {
                        return this.ServerResponse.error(
                            '友链创建失败，写入失败'
                        )
                    }
                    createFriendLink = createFriendLink.toJSON()
                    return this.ServerResponse.success(
                        createFriendLink,
                        '友链创建成功'
                    )
                } catch (error) {
                    console.log(error)
                    return this.ServerResponse.error(
                        '友链创建失败, 操作异常'
                    )
                }


        }

        //更新友链
        async editFriendLink(id,data){
            try{
                this.ctx.validate(FriendLinkRuler,data)
            }catch(error){
                console.log(error)
                return this.ServerResponse.error(
                    '友链更新失败，请检查参数'
                )
            }
            const result = this.checkData('id',id)
            if( !result ) return result
            const isMe = await this.ctx.model.Friendlink.findOne(
                {
                    where:{
                        src:data.src,
                        $not:[
                            {'id':[id]}
                        ]
                    }
                }
            )
            if(isMe){
                return this.ServerResponse.error('友链已经存在')
            }

            const updateFriendLink = await this.ctx.model.Friendlink.update(
                data,
                {where:{
                    id:id
                }
                },
            )
            if(!updateFriendLink){
                return this.ServerResponse.error(
                    '友链更新失败'
                )
            }
            const newFriendLink = await this.ctx.model.Friendlink.findOne({
                    where:{
                    id:id
                    }
            })
            return this.ServerResponse.success(
                newFriendLink,
                '友链更新成功'
            )
            return this.ServerResponse.error('heehda')
        }

        //删除友链
        async deleteFriendLink(id){
            const FriendLink = await this.ctx.model.Friendlink.destroy({
                where:{
                    id:id
                }
            })
            if (!FriendLink) {
                return this.ServerResponse.error(10211, '删除友链失败')
            }
            return this.ServerResponse.success({}, '删除友链成功')
        }
        


        
    }
    return FriendLinkService;
}
