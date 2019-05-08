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
//院系创建规则
    const CollegeMsgRuler = {
        college:{
            type:'string',
            required:true
        },
        major:{
            type:'string',
            required:true
        }
    }



module.exports = app =>{
    class CollegeMsgService extends app.Service{
        constructor (ctx) {
			super(ctx)
			this.ResponseCode = ctx.response.ResponseCode
			this.ServerResponse = ctx.response.ServerResponse
        }

        // 验证数据
        async checkData(key,value){
            const query = {}
            query[key] = value;
            const data = await this.ctx.model.Collegemsg.findOne(
                {
                    where:query
                }
            );
            return !!data
        }
        // 验证院系
        async checkArtcle(key,value){
            if( key.trim() ){
                return (await this.checkData(key,value)) 
                ? this.ServerResponse.error(
                    '院系信息已经存在'
                )
                :this.ServerResponse.success(
                    '院系验证成功，标题未创建'
                )
            }
            return this.ServerResponse.error(
                '院系创建失败,参数错误'
            )
        }

        //获取院系列表
        async getCollegeMsgList(page = PAGE,size = SIZE,search={}){
            try {
                 const index = page * size
                 const CollegeMsgs = await this.ctx.model.Collegemsg.findAll(
                         {
                            offset: index,
                            limit: size,
                            // where:{
                            //     search
                            // }
                         }
                     )
                 return this.ServerResponse.success(
                          CollegeMsgs,
                         '院系获取成功'
                     )
            }catch(error){
                    console.log(error);
                    return this.ServerResponse.error(
                        '院系获取失败'
                    )
            }

        }

        //添加院系
        async addCollegeMsg(datalist){
              try{
                this.ctx.validate(CollegeMsgRuler,datalist)
              }catch(error){
                console.log(error)
			    return this.ServerResponse.error(
				'院系创建失败，请检查提交参数'
			)
              }
              //检查院系是否存在
            const validtitle = await this.checkArtcle('college',datalist.college)
            const validtitle2 = await this.checkArtcle('major',datalist.major)
            if (!validtitle.isSuccess() && !validtitle2.isSuccess()) return validtitle
                try {
                    let createCollegeMsg = await this.ctx.model.Collegemsg.create(
                        datalist
                    )
                    if (!createCollegeMsg) {
                        return this.ServerResponse.error(
                            '院系创建失败，写入失败'
                        )
                    }
                    createCollegeMsg = createCollegeMsg.toJSON()
                    return this.ServerResponse.success(
                        createCollegeMsg,
                        '院系创建成功'
                    )
                } catch (error) {
                    console.log(error)
                    return this.ServerResponse.error(
                        '院系创建失败, 操作异常'
                    )
                }


        }

        //更新院系
        async editCollegeMsg(id,data){
            // data = JSON.parse(data)
            try{
                this.ctx.validate(CollegeMsgRuler,data)
            }catch(error){
                console.log(error)
                return this.ServerResponse.error(
                    '院系更新失败，请检查参数'
                )
            }
            const result = this.checkData('id',id)
            if( !result ) return result
            //  const cheaktitle = await this.checkArtcle('college',data.college); 
            // if( !cheaktitle.isSuccess()){
            //     return cheaktitle
            // }
            const isMe = await this.ctx.model.Collegemsg.findOne(
                {
                    where:{
                        college:data.college,
                        major:data.major,
                        $not:[
                            {'id':[id]}
                        ]
                    }
                }
            )
            if(isMe){
                return this.ServerResponse.error('院系信息已经存在')
            }

            const updateCollegeMsg = await this.ctx.model.Collegemsg.update(
                data,
                {where:{
                    id:id
                }
                },
            )
            if(!updateCollegeMsg){
                return this.ServerResponse.error(
                    '院系更新失败'
                )
            }
            const newCollegeMsg = await this.ctx.model.Collegemsg.findOne({
                    where:{
                    id:id
                    }
            })
            return this.ServerResponse.success(
                newCollegeMsg,
                '院系更新成功'
            )
        }

        //删除院系
        async deleteCollegeMsg(id){
            const CollegeMsg = await this.ctx.model.Collegemsg.destroy({
                where:{
                    id:id
                }
            })
            if (!CollegeMsg) {
                return this.ServerResponse.error(10211, '删除院系失败')
            }
            return this.ServerResponse.success({}, '删除院系成功')
        }
        


        
    }
    return CollegeMsgService;
}
