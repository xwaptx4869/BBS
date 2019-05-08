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
//标签创建规则
    const LabelRuler = {
        name:{
            type:'string',
            required:true
        }
    }



module.exports = app =>{
    class LabelService extends app.Service{
        constructor (ctx) {
			super(ctx)
			this.ResponseCode = ctx.response.ResponseCode
			this.ServerResponse = ctx.response.ServerResponse
        }

        // 验证数据
        async checkData(key,value){
            const query = {}
            query[key] = value;
            const data = await this.ctx.model.Label.findOne(
                {
                    where:query
                }
            );
            return !!data
        }
        // 验证标签
        async checkArtcle(key,value){
            if( key.trim() ){
                return (await this.checkData(key,value)) 
                ? this.ServerResponse.error(
                    '标签已经存在'
                )
                :this.ServerResponse.success(
                    '标签验证成功，标题未创建'
                )
            }
            return this.ServerResponse.error(
                '标签创建失败,参数错误'
            )
        }

        //获取标签列表
        async getLabelList(page = PAGE,size = SIZE,search={}){
            try {
                 const index = page * size
                 const labels = await this.ctx.model.Label.findAll(
                         {
                            offset: index,
                            limit: size,
                            // where:{
                            //     search
                            // }
                         }
                     )
                 return this.ServerResponse.success(
                          labels,
                         '标签获取成功'
                     )
            }catch(error){
                    console.log(error);
                    return this.ServerResponse.error(
                        '标签获取失败'
                    )
            }

        }

        //添加标签
        async addLabel(datalist){
              try{
                this.ctx.validate(LabelRuler,datalist)
              }catch(error){
                console.log(error)
			    return this.ServerResponse.error(
				'标签创建失败，请检查提交参数'
			)
              }
              //检查标签是否存在
            const validtitle = await this.checkArtcle('name',datalist.name)
            if (!validtitle.isSuccess()) return validtitle
                try {
                    let createLabel = await this.ctx.model.Label.create(
                        datalist
                    )
                    if (!createLabel) {
                        return this.ServerResponse.error(
                            '标签创建失败，写入失败'
                        )
                    }
                    createLabel = createLabel.toJSON()
                    return this.ServerResponse.success(
                        createLabel,
                        '标签创建成功'
                    )
                } catch (error) {
                    console.log(error)
                    return this.ServerResponse.error(
                        '标签创建失败, 操作异常'
                    )
                }


        }

        //更新标签
        async editLabel(id,data){
            // data = JSON.parse(data)
            try{
                this.ctx.validate(LabelRuler,data)
            }catch(error){
                console.log(error)
                return this.ServerResponse.error(
                    '标签更新失败，请检查参数'
                )
            }
            const result = this.checkData('id',id)
            if( !result ) return result
             const cheaktitle = await this.checkArtcle('name',data.name); 
            if( !cheaktitle.isSuccess()){
                return cheaktitle
            }
            const updatelabel = await this.ctx.model.Label.update(
                {name:data.name},
                {where:{
                    id:id
                }
                },
            )
            if(!updatelabel){
                return this.ServerResponse.error(
                    '标签更新失败'
                )
            }
            const newlabel = await this.ctx.model.Label.findOne({
                    where:{
                    id:id
                    }
            })
            return this.ServerResponse.success(
                newlabel,
                '标签更新成功'
            )
        }

        //删除标签
        async deleteLabel(id){
            const label = await this.ctx.model.Label.destroy({
                where:{
                    id:id
                }
            })
            if (!label) {
                return this.ServerResponse.error(10211, '删除标签失败')
            }
            return this.ServerResponse.success({}, '删除标签成功')
        }
        


        
    }
    return LabelService;
}
