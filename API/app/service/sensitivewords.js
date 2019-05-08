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
//敏感词创建规则
    const SensitiveWordsRuler = {
        name:{
            type:'string',
            required:true
        }
    }

module.exports = app =>{
    class SensitiveWordsService extends app.Service{
        constructor (ctx) {
			super(ctx)
			this.ResponseCode = ctx.response.ResponseCode
			this.ServerResponse = ctx.response.ServerResponse
        }

        //验证数据
        async checkData(key,value){
            const query = {}
            query[key] = value;
            const data = await this.ctx.model.Sensitivewords.findOne(
                {
                    where:query
                }
            );
            return !!data
        }
        //验证敏感词
        async checkArtcle(key,value){
            if( key.trim() ){
                return (await this.checkData(key,value)) 
                ? this.ServerResponse.error(
                    '敏感词验证失败'
                )
                :this.ServerResponse.success(
                    '敏感词验证成功'
                )
            }
            return this.ServerResponse.error(
                '敏感词创建失败,参数错误'
            )
        }

        //获取敏感词列表
        async getSensitiveWordsList(page = PAGE,size = SIZE,data={}){
            try {
                 const index = page * size
                 const SensitiveWordss = await this.ctx.model.Sensitivewords.findAll(
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
                         SensitiveWordss,
                         '敏感词获取成功'
                     )
            }catch(error){
                console.log(error);
                    return this.ServerResponse.error(
                        '敏感词获取失败'
                    )
            }

        }

        //添加敏感词
        async addSensitiveWords(datalist){
              try{
                this.ctx.validate(SensitiveWordsRuler,datalist)
              }catch(error){
                console.log(error)
			    return this.ServerResponse.error(
				'敏感词创建失败，请检查提交参数'
			)
              }
            //   检查敏感词是否存在
            const validtitle = await this.checkArtcle('name',datalist.name)
            if (!validtitle.isSuccess()) return validtitle
                try {
                    let createSensitiveWords = await this.ctx.model.Sensitivewords.create(
                        datalist
                    )
                    if (!createSensitiveWords) {
                        return this.ServerResponse.error(
                            '敏感词创建失败，写入失败'
                        )
                    }
                    createSensitiveWords = createSensitiveWords.toJSON()
                    return this.ServerResponse.success(
                        createSensitiveWords,
                        '敏感词创建成功'
                    )
                } catch (error) {
                    console.log(error)
                    return this.ServerResponse.error(
                        '敏感词创建失败, 操作异常'
                    )
                }


        }

        //更新敏感词
        async editSensitiveWords(id,data){
            try{
                this.ctx.validate(SensitiveWordsRuler,data)
            }catch(error){
                console.log(error)
                return this.ServerResponse.error(
                    '敏感词更新失败，请检查参数'
                )
            }
            const result = this.checkData('id',id)
            if( !result ) return result
            //  const cheaktitle = await this.checkArtcle('name',data.name); 
            // if( !cheaktitle.isSuccess()){
            //     return cheaktitle
            // }
            const isMe = await this.ctx.model.Sensitivewords.findOne(
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
                return this.ServerResponse.error('敏感词已经存在')
            }

            const updateSensitiveWords = await this.ctx.model.Sensitivewords.update(
                data,
                {where:{
                    id:id
                }
                },
            )
            if(!updateSensitiveWords){
                return this.ServerResponse.error(
                    '敏感词更新失败'
                )
            }
            const newSensitiveWords = await this.ctx.model.Sensitivewords.findOne({
                    where:{
                    id:id
                    }
            })
            return this.ServerResponse.success(
                newSensitiveWords,
                '敏感词更新成功'
            )
        }

        //删除敏感词
        async deleteSensitiveWords(id){
            const SensitiveWords = await this.ctx.model.Sensitivewords.destroy({
                where:{
                    id:id
                }
            })
            if (!SensitiveWords) {
                return this.ServerResponse.error(10211, '删除敏感词失败')
            }
            return this.ServerResponse.success({}, '删除敏感词成功')
        }
        


        
    }
    return SensitiveWordsService;
}
