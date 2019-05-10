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
//相册创建规则
    const AlbumRuler = {
        title:{
            type:'string',
            required:true
        },
        poster:{
            type:'string',
            required:false
        },
        user_id:{
          type:'string',
          require:true  
        },
        file_ids:{
            type:'string',
            required:false,
        }
    }

module.exports = app =>{
    class AlbumService extends app.Service{
        constructor (ctx) {
			super(ctx)
			this.ResponseCode = ctx.response.ResponseCode
			this.ServerResponse = ctx.response.ServerResponse
        }

        //验证数据
        async checkData(key,value){
            const query = {}
            query[key] = value;
            const data = await this.ctx.model.Album.findOne(
                {
                    where:query
                }
            );
            return !!data
        }
        //验证相册
        async checkArtcle(key,value){
            if( key.trim() ){
                return (await this.checkData(key,value)) 
                ? this.ServerResponse.error(
                     1,
                    '相册验证失败'
                )
                :this.ServerResponse.success(
                    '相册验证成功'
                )
            }
            return this.ServerResponse.error(
                '相册创建失败,参数错误'
            )
        }

        //获取相册列表
        async getAlbumList(page = PAGE,size = SIZE,data={}){
            try {
                 const index = page * size
                 const Albums = await this.ctx.model.Album.findAll(
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
                         Albums,
                         '相册获取成功'
                     )
            }catch(error){
                console.log(error);
                    return this.ServerResponse.error(
                        '相册获取失败'
                    )
            }

        }

        //添加相册
        async addAlbum(datalist){
              try{
                this.ctx.validate(AlbumRuler,datalist)
              }catch(error){
                console.log(error)
			    return this.ServerResponse.error(
				'相册创建失败，请检查提交参数'
			)
              }
            //   检查相册是否存在
            const validtitle = await this.checkArtcle('title',datalist.title)
            if (!validtitle.isSuccess()) return validtitle
                try {
                    let createAlbum = await this.ctx.model.Album.create(
                        datalist
                    )
                    if (!createAlbum) {
                        return this.ServerResponse.error(
                            '相册创建失败，写入失败'
                        )
                    }
                    createAlbum = createAlbum.toJSON()
                    return this.ServerResponse.success(
                        createAlbum,
                        '相册创建成功'
                    )
                } catch (error) {
                    console.log(error)
                    return this.ServerResponse.error(
                        '相册创建失败, 操作异常'
                    )
                }


        }

        //更新相册
        async editAlbum(id,data){
            try{
                this.ctx.validate(AlbumRuler,data)
            }catch(error){
                console.log(error)
                return this.ServerResponse.error(
                    '相册更新失败，请检查参数'
                )
            }
            const result = this.checkData('id',id)
            if( !result ) return result
            //  const cheaktitle = await this.checkArtcle('title',data.title); 
            // if( !cheaktitle.isSuccess()){
            //     return cheaktitle
            // }
            const updateAlbum = await this.ctx.model.Album.update(
                data,
                {where:{
                    id:id
                }
                },
            )
            if(!updateAlbum){
                return this.ServerResponse.error(
                    '相册更新失败'
                )
            }
            const newAlbum = await this.ctx.model.Album.findOne({
                    where:{
                    id:id
                    }
            })
            return this.ServerResponse.success(
                newAlbum,
                '相册更新成功'
            )
        }

        //删除相册
        async deleteAlbum(id){
            const Album = await this.ctx.model.Album.destroy({
                where:{
                    id:id
                }
            })
            if (!Album) {
                return this.ServerResponse.error(10211, '删除相册失败')
            }
            return this.ServerResponse.success({}, '删除相册成功')
        }
        async getOneAlbum(id){
            const comment = await this.ctx.model.Album.findOne({
                where:{
                    id:id
                }
            })
            if (!comment) {
                return this.ServerResponse.error(10211, '获取相册失败')
            }
            return this.ServerResponse.success(comment, '获取相册成功')
        }


        
    }
    return AlbumService;
}
