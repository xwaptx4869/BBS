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
//分类创建规则
    const ClassificationsRuler = {
        name:{
            type:'string',
            required:true
        },
        d_id:{
            type:'number',
            required:true
        },
        p_id:{
            type:'number',
            required:true
        }
    }

module.exports = app =>{
    class ClassificationsService extends app.Service{
        constructor (ctx) {
			super(ctx)
			this.ResponseCode = ctx.response.ResponseCode
			this.ServerResponse = ctx.response.ServerResponse
        }

        //验证数据
        async checkData(key,value){
            const query = {}
            query[key] = value;
            const data = await this.ctx.model.Classifications.findOne(
                {
                    where:query
                }
            );
            return !!data
        }
        //验证分类
        async checkArtcle(key,value){
            if( key.trim() ){
                return (await this.checkData(key,value)) 
                ? this.ServerResponse.error(
                    '分类验证失败'
                )
                :this.ServerResponse.success(
                    '分类验证成功'
                )
            }
            return this.ServerResponse.error(
                '分类创建失败,参数错误'
            )
        }

        //获取分类列表
        async getClassificationsList(page = PAGE,size = SIZE,data={}){
            try {
                 const index = page * size
                 const Classificationss = await this.ctx.model.Classifications.findAll(
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
                         Classificationss,
                         '分类获取成功'
                     )
            }catch(error){
                console.log(error);
                    return this.ServerResponse.error(
                        '分类获取失败'
                    )
            }

        }

        //添加分类
        async addClassifications(datalist){
              try{
                this.ctx.validate(ClassificationsRuler,datalist)
              }catch(error){
                console.log(error)
			    return this.ServerResponse.error(
				'分类创建失败，请检查提交参数'
			)
              }
            //   检查分类是否存在
            const validtitle = await this.checkArtcle('name',datalist.name)
            if (!validtitle.isSuccess()) return validtitle
                try {
                    let createClassifications = await this.ctx.model.Classifications.create(
                        datalist
                    )
                    if (!createClassifications) {
                        return this.ServerResponse.error(
                            '分类创建失败，写入失败'
                        )
                    }
                    createClassifications = createClassifications.toJSON()
                    return this.ServerResponse.success(
                        createClassifications,
                        '分类创建成功'
                    )
                } catch (error) {
                    console.log(error)
                    return this.ServerResponse.error(
                        '分类创建失败, 操作异常'
                    )
                }


        }

        //更新分类
        async editClassifications(id,data){
            try{
                this.ctx.validate(ClassificationsRuler,data)
            }catch(error){
                console.log(error)
                return this.ServerResponse.error(
                    '分类更新失败，请检查参数'
                )
            }
            const result = this.checkData('id',id)
            if( !result ) return result
            //  const cheaktitle = await this.checkArtcle('name',data.name); 
            // if( !cheaktitle.isSuccess()){
            //     return cheaktitle
            // }
            const isMe = await this.ctx.model.Classifications.findOne(
                {
                    where:{
                        name:data.name,
                        $not:[
                            {'id':[id]}
                        ]
                    }
                }
            )
            if(isMe){
                return this.ServerResponse.error('标签名已经存在')
            }
            const updateClassifications = await this.ctx.model.Classifications.update(
                data,
                {where:{
                    id:id
                }
                },
            )
            if(!updateClassifications){
                return this.ServerResponse.error(
                    '分类更新失败'
                )
            }
            const newClassifications = await this.ctx.model.Classifications.findOne({
                    where:{
                        id:id
                    }
            })
            return this.ServerResponse.success(
                newClassifications,
                '分类更新成功'
            )
        }

        //删除分类
        async deleteClassifications(id){
            const Classifications = await this.ctx.model.Classifications.destroy({
                where:{
                    id:id
                }
            })
            if (!Classifications) {
                return this.ServerResponse.error(10211, '删除分类失败')
            }
            return this.ServerResponse.success({}, '删除分类成功')
        }
        


        
    }
    return ClassificationsService;
}
