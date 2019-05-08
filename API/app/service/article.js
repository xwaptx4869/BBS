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
//文章创建规则
    const ArticleRuler = {
        classification_ids:{
            type:'string',
            required:true
        },
        label_ids:{
            type:'string',
            required:true
        },
        content:{
            type:'string',
            required:true
        },
        title:{
            type:'string',
            required:true
        }
    }



module.exports = app =>{
    class ArticleService extends app.Service{
        constructor (ctx) {
			super(ctx)
			this.ResponseCode = ctx.response.ResponseCode
			this.ServerResponse = ctx.response.ServerResponse
        }

        //验证数据
        async checkData(key,value){
            const query = {}
            query[key] = value;
            const data = await this.ctx.model.Article.findOne(
                {
                    where:query
                }
            );
            return !!data
        }
        //验证文章
        async checkArtcle(key,value){
            if( key.trim() ){
                return (await this.checkData(key,value)) 
                ? this.ServerResponse.error(
                    '文章验证失败，标题已经存在'
                )
                :this.ServerResponse.success(
                    '文章验证成功，标题未创建'
                )
            }
            return this.ServerResponse.error(
                '文章创建失败,参数错误'
            )
        }

        //获取文章列表
        async getArticleList(page = PAGE,size = SIZE,search={}){
            try {
                 const index = page * size
                 let articles = await this.ctx.model.Article.findAndCount(
                         {
                            offset: index,
                            limit: size,
                            // where:{
                            //     search
                            // }
                            // include:[{
                            //     model:this.ctx.model.Label,
                            //     'where':{
                            //         'label_ids':1
                            //     }
                            // }]
                         }
                     )
                const newarticles = JSON.parse(JSON.stringify(articles))
                const data = newarticles.rows
                 for(let i = 0 ; i < data.length;i++){
                    let labels = []
                    let labelids = data[i].label_ids.split("/")
                            let label = await this.ctx.model.Label.findAll(
                                {
                                    where:{
                                        id:labelids
                                    }
                                }
                            )
                            if(label){
                                labels = label
                            }
                    data[i].labels = labels; 
                    let classifis = []
                    let classifiids = data[i].classification_ids.split("/")
                    if(classifiids.length > 0){
                            let classifi = await this.ctx.model.Classifications.findAll(
                                {
                                    where:{
                                        id:classifiids
                                    }
                                }
                            )
                            if(classifi){
                                classifis = classifi
                            }
                    } 
                    data[i].classifications = classifis; 
                 }
                 return this.ServerResponse.success(
                         newarticles,
                         '文章获取成功'
                     )
            }catch(error){
                console.log(error);
                    return this.ServerResponse.error(
                        '文章获取失败'
                    )
            }

        }

        //添加文章
        async addArticle(datalist){
              try{
                this.ctx.validate(ArticleRuler,datalist)
              }catch(error){
                console.log(error)
			    return this.ServerResponse.error(
				'文章创建失败，请检查提交参数'
			)
              }
              //检查文章是否存在
            // const validtitle = await this.checkArtcle('title',datalist.title)
            // if (!validtitle.isSuccess()) return validtitle
                try {
                    let createArticle = await this.ctx.model.Article.create(
                        datalist
                    )
                    if (!createArticle) {
                        return this.ServerResponse.error(
                            '文章创建失败，写入失败'
                        )
                    }
                    createArticle = createArticle.toJSON()
                    return this.ServerResponse.success(
                        createArticle,
                        '文章创建成功'
                    )
                } catch (error) {
                    console.log(error)
                    return this.ServerResponse.error(
                        '文章创建失败, 操作异常'
                    )
                }


        }

        //更新文章
        async editArticle(id,data){
            // data = JSON.parse(data)
            try{
                this.ctx.validate(ArticleRuler,data)
            }catch(error){
                console.log(error)
                return this.ServerResponse.error(
                    '文章更新失败，请检查参数'
                )
            }
            const result = this.checkData('article_id',id)
            if( !result ) return result
            //  const cheaktitle = await this.checkArtcle('title',data.title); 
            // if( !cheaktitle.isSuccess()){
            //     return cheaktitle
            // }
            const updateArticle = await this.ctx.model.Article.update(
                data,
                {where:{
                    article_id:id
                }
                },
            )
            if(!updateArticle){
                return this.ServerResponse.error(
                    '文章更新失败'
                )
            }
            const newArticle = await this.ctx.model.Article.findOne({
                    where:{
                    article_id:id
                    }
            })
            return this.ServerResponse.success(
                newArticle,
                'Articl更新成功'
            )
        }

        //删除文章
        async deleteArticle(id){
            const article = await this.ctx.model.Article.destroy({
                where:{
                    article_id:id
                }
            })
            if (!article) {
                return this.ServerResponse.error(10211, '删除文章失败')
            }
            return this.ServerResponse.success({}, '删除文章成功')
        }

        // 获取某一篇文章
        async getOneArticle(id){
            const articles = await this.ctx.model.Article.findOne({
                where:{
                    article_id:id
                }
            })
            const newarticles = JSON.parse(JSON.stringify(articles))
               let labels = []
               let labelids = newarticles.label_ids.split("/")
               if(labelids.length > 0){
                   for( let key of labelids){
                       let label = await this.ctx.model.Label.findOne(
                           {
                               where:{
                                   id:key
                               }
                           }
                       )
                       if(label){
                        labels.push(label.id)
                       }
                   }
               }
               newarticles.labels = labels; 

               let classifis = []
               let classifiids = newarticles.classification_ids.split("/")
               if(classifiids.length > 0){
                   for( let key of classifiids){
                       let classifi = await this.ctx.model.Classifications.findOne(
                           {
                               where:{
                                   id:key
                               }
                           }
                       )
                       if(classifi){
                        classifis.push(classifi.id)
                       }
                   }
               }    
               newarticles.classifications = classifis; 
            if (!newarticles) {
                return this.ServerResponse.error(10211, '获取文章失败')
            }
            return this.ServerResponse.success(newarticles, '获取文章成功')
        }
        


        
    }
    return ArticleService;
}
