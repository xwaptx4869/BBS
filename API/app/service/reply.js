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
  //回复创建规则
    const ReplyRuler = {
        content:{
            type:'string',
            required:true
        },
        user_id:{
            type:'string',
            required:false
        },
    }

module.exports = app =>{
    class ReplyService extends app.Service{
                constructor (ctx) {
        			super(ctx)
        			this.ResponseCode = ctx.response.ResponseCode
        			this.ServerResponse = ctx.response.ServerResponse
                }
        
                //验证数据
                async checkData(key,value){
                    const query = {}
                    query[key] = value;
                    const data = await this.ctx.model.Reply.findOne(
                        {
                            where:query
                        }
                    );
                    return !!data
                }
                //验证回复
                async checkArtcle(key,value){
                    if( key.trim() ){
                        return (await this.checkData(key,value)) 
                        ? this.ServerResponse.error(
                            '回复验证失败'
                        )
                        :this.ServerResponse.success(
                            '回复验证成功'
                        )
                    }
                    return this.ServerResponse.error(
                        '回复创建失败,参数错误'
                    )
                }
        
                // 验证关联者
                async checkUserData(key,value){
                    const query = {}
                    query[key] = value;
                    const data = await this.ctx.model.User.findOne(
                        {
                            where:query
                        }
                    );
                    return !!data
                }
                //验证
                async checkUser(key,value){
                    if( key.trim() ){
                        return (await this.checkUserData(key,value)) 
                        ? this.ServerResponse.success(
                            '关联用户验证成功'
                        ):
                        this.ServerResponse.error(
                            '关联用户验证失败'
                        )
                    }
                    return this.ServerResponse.error(
                        '创建失败,参数错误'
                    )
                }


                //获取回复列表
                async getReplyList(page = PAGE,size = SIZE,data={}){
                    try {
                         const index = page * size
                         const Replys = await this.ctx.model.Reply.findAll(
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
                                 Replys,
                                 '回复获取成功'
                             )
                    }catch(error){
                        console.log(error);
                            return this.ServerResponse.error(
                                '回复获取失败'
                            )
                    }
        
                }
        
                //添加回复
                async addReply(datalist){
                      try{
                        this.ctx.validate(ReplyRuler,datalist)
                      }catch(error){
                        console.log(error)
        			    return this.ServerResponse.error(
        				'回复创建失败，请检查提交参数'
        			)
                      }
                      const validtitle = await this.checkUser('id',datalist.user_id)
                      if (!validtitle.isSuccess()) return validtitle
                        try {
                            let createReply = await this.ctx.model.Reply.create(
                                datalist
                            )
                            if (!createReply) {
                                return this.ServerResponse.error(
                                    '回复创建失败，写入失败'
                                )
                            }
                            createReply = createReply.toJSON()
                            return this.ServerResponse.success(
                                createReply,
                                '回复创建成功'
                            )
                        } catch (error) {
                            console.log(error)
                            return this.ServerResponse.error(
                                '回复创建失败, 操作异常'
                            )
                        }
                }
        
                //更新回复
                async editReply(id,data){
                    try{
                        this.ctx.validate(ReplyRuler,data)
                    }catch(error){
                        console.log(error)
                        return this.ServerResponse.error(
                            '回复更新失败，请检查参数'
                        )
                    }
                    const result = this.checkData('id',id)
                    if( !result ) return result
                    const validtitle = await this.checkUser('id',data.user_id)
                      if (!validtitle.isSuccess()) return validtitle
                    const updateReply = await this.ctx.model.Reply.update(
                        data,
                        {where:{
                            id:id
                        }
                        },
                    )
                    if(!updateReply){
                        return this.ServerResponse.error(
                            '回复更新失败'
                        )
                    }
                    const newReply = await this.ctx.model.Reply.findOne({
                            where:{
                            id:id
                            }
                    })
                    return this.ServerResponse.success(
                        newReply,
                        '回复更新成功'
                    )
                }
        
                //删除回复
                async deleteReply(id){
                    const Reply = await this.ctx.model.Reply.destroy({
                        where:{
                            id:id
                        }
                    })
                    if (!Reply) {
                        return this.ServerResponse.error(10211, '删除回复失败')
                    }
                    return this.ServerResponse.success({}, '删除回复成功')
                }

                
                // 获取某一条回复
                async getOneReply(id){
                    const reply = await this.ctx.model.Reply.findOne({
                        where:{
                            id:id
                        }
                    })
                    if (!reply) {
                        return this.ServerResponse.error(10211, '获取回复失败')
                    }
                    return this.ServerResponse.success(reply, '获取回复成功')
                }
                
        
        
                
            }
            return ReplyService;
}
