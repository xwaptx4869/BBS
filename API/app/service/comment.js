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
//评论创建规则
    const CommentRuler = {
        content:{
            type:'string',
            required:true
        },
        type:{
            type:'string',
            required:true
        },
        connect_id:{
            type:'string',
            required:true
        },
        reply_ids:{
            type:'string',
            required:false
        }
    }
    //评论更新规则
    const CommentRuler2 = {
        content:{
            type:'string',
            required:false
        },
        type:{
            type:'string',
            required:false
        },
        connect_id:{
            type:'string',
            required:false
        },
        reply_ids:{
            type:'string',
            required:false
        }
    }

module.exports = app =>{
    class CommentService extends app.Service{
        constructor (ctx) {
			super(ctx)
			this.ResponseCode = ctx.response.ResponseCode
			this.ServerResponse = ctx.response.ServerResponse
        }

        //验证数据
        async checkData(key,value){
            const query = {}
            query[key] = value;
            const data = await this.ctx.model.Comment.findOne(
                {
                    where:query
                }
            );
            return !!data
        }
        //验证评论
        async checkArtcle(key,value){
            if( key.trim() ){
                return (await this.checkData(key,value)) 
                ? this.ServerResponse.error(
                    '评论验证失败'
                )
                :this.ServerResponse.success(
                    '评论验证成功'
                )
            }
            return this.ServerResponse.error(
                '评论创建失败,参数错误'
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

        //获取评论列表
        async getCommentList(page = PAGE,size = SIZE,data={}){
            try {
                 const index = page * size
                 const Comments = await this.ctx.model.Comment.findAll(
                         {
                            offset: index,
                            limit: size,
                            where: data.type ? {
                                type:data.type,
                                connect_id:data.connect_id
                            } : {}
                         }
                     )
                const newComments = JSON.parse(JSON.stringify(Comments))
                 for(let i =0;i<newComments.length;i++){
                    let conncetid = newComments[i].id;
                    const replys = await this.ctx.model.Reply.findAll(
                                {
                                   offset: index,
                                   limit: size,
                                   where:{
                                       connect_id:conncetid
                                   }
                                }
                            )
                    newComments[i].replylist = replys;
                 };
                 return this.ServerResponse.success(
                          newComments,
                         '评论获取成功'
                     )
            }catch(error){
                console.log(error);
                    return this.ServerResponse.error(
                        '评论获取失败'
                    )
            }

        }
        //添加评论
        async addComment(datalist){
              try{
                this.ctx.validate(CommentRuler,datalist)
              }catch(error){
                console.log(error)
			    return this.ServerResponse.error(
				'评论创建失败，请检查提交参数'
			)
              }
            //   检查关联ID是否存在
            // const validtitle = await this.checkUser('id',datalist.connect_id)
            // if (!validtitle.isSuccess()) return validtitle
                try {
                    let createComment = await this.ctx.model.Comment.create(
                        datalist
                    )
                    if (!createComment) {
                        return this.ServerResponse.error(
                            '评论创建失败，写入失败'
                        )
                    }
                    createComment = createComment.toJSON()
                    return this.ServerResponse.success(
                        createComment,
                        '评论创建成功'
                    )
                } catch (error) {
                    console.log(error)
                    return this.ServerResponse.error(
                        '评论创建失败, 操作异常'
                    )
                }


        }

        //更新评论
        async editComment(id,data){
            try{
                this.ctx.validate(CommentRuler2,data)
            }catch(error){
                console.log(error)
                return this.ServerResponse.error(
                    '评论更新失败，请检查参数'
                )
            }
            const result = this.checkData('id',id)
            if( !result ) return result
            //   检查关联ID是否存在
              const validtitle = await this.checkUser('id',data.connect_id)
              if (!validtitle.isSuccess()) return validtitle
            //  const cheaktitle = await this.checkArtcle('title',data.title); 
            // if( !cheaktitle.isSuccess()){
            //     return cheaktitle
            // }
            const updateComment = await this.ctx.model.Comment.update(
                data,
                {where:{
                    id:id
                }
                },
            )
            if(!updateComment){
                return this.ServerResponse.error(
                    '评论更新失败'
                )
            }
            const newComment = await this.ctx.model.Comment.findOne({
                    where:{
                    id:id
                    }
            })
            return this.ServerResponse.success(
                newComment,
                '评论更新成功'
            )
        }

        //删除评论
        async deleteComment(id){
            const Comment = await this.ctx.model.Comment.destroy({
                where:{
                    id:id
                }
            })
            if (!Comment) {
                return this.ServerResponse.error(10211, '删除评论失败')
            }
            return this.ServerResponse.success({}, '删除评论成功')
        }
        
        // 获取某一条评论
        async getOneComment(id){
            const comment = await this.ctx.model.Comment.findOne({
                where:{
                    id:id
                }
            })
            if (!comment) {
                return this.ServerResponse.error(10211, '获取评论失败')
            }
            return this.ServerResponse.success(comment, '获取评论成功')
        }


        
    }
    return CommentService;
}
