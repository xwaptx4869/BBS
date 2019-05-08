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
//文件创建规则
    const FileRuler = {
        type:{
            type:'string',
            required:true
        },
        file_src:{
            type:'string',
            required:true
        }
    }

module.exports = app =>{
    class FileService extends app.Service{
        constructor (ctx) {
			super(ctx)
			this.ResponseCode = ctx.response.ResponseCode
			this.ServerResponse = ctx.response.ServerResponse
        }

        //验证数据
        async checkData(key,value){
            const query = {}
            query[key] = value;
            const data = await this.ctx.model.File.findOne(
                {
                    where:query
                }
            );
            return !!data
        }
        //验证文件
        async checkArtcle(key,value){
            if( key.trim() ){
                return (await this.checkData(key,value)) 
                ? this.ServerResponse.error(
                    '文件验证失败'
                )
                :this.ServerResponse.success(
                    '文件验证成功'
                )
            }
            return this.ServerResponse.error(
                '文件创建失败,参数错误'
            )
        }

        //获取文件列表
        async getFileList(page = PAGE,size = SIZE,data={}){
            try {
                 const index = page * size
                 const Files = await this.ctx.model.File.findAll(
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
                         Files,
                         '文件获取成功'
                     )
            }catch(error){
                console.log(error);
                    return this.ServerResponse.error(
                        '文件获取失败'
                    )
            }

        }

        //添加文件
        async addFile(datalist){
              try{
                this.ctx.validate(FileRuler,datalist)
              }catch(error){
                console.log(error)
			    return this.ServerResponse.error(
				'文件创建失败，请检查提交参数'
			)
              }
            //   检查文件是否存在
            const validtitle = await this.checkArtcle('file_src',datalist.file_src)
            if (!validtitle.isSuccess()) return validtitle
                try {
                    let createFile = await this.ctx.model.File.create(
                        datalist
                    )
                    if (!createFile) {
                        return this.ServerResponse.error(
                            '文件创建失败，写入失败'
                        )
                    }
                    createFile = createFile.toJSON()
                    return this.ServerResponse.success(
                        createFile,
                        '文件创建成功'
                    )
                } catch (error) {
                    console.log(error)
                    return this.ServerResponse.error(
                        '文件创建失败, 操作异常'
                    )
                }


        }

        //更新文件
        async editFile(id,data){
            try{
                this.ctx.validate(FileRuler,data)
            }catch(error){
                console.log(error)
                return this.ServerResponse.error(
                    '文件更新失败，请检查参数'
                )
            }
            const result = this.checkData('id',id)
            if( !result ) return result
             const cheaktitle = await this.checkArtcle('file_src',data.file_src); 
            if( !cheaktitle.isSuccess()){
                return cheaktitle
            }
            const updateFile = await this.ctx.model.File.update(
                data,
                {where:{
                    id:id
                }
                },
            )
            if(!updateFile){
                return this.ServerResponse.error(
                    '文件更新失败'
                )
            }
            const newFile = await this.ctx.model.File.findOne({
                    where:{
                    id:id
                    }
            })
            return this.ServerResponse.success(
                newFile,
                '文件更新成功'
            )
        }

        //删除文件
        async deleteFile(id){
            const File = await this.ctx.model.File.destroy({
                where:{
                    id:id
                }
            })
            if (!File) {
                return this.ServerResponse.error(10211, '删除文件失败')
            }
            return this.ServerResponse.success({}, '删除文件成功')
        }
        // 获取某一条文件
        async getOneFile(id){
            const file = await this.ctx.model.File.findOne({
                where:{
                    id:id
                }
            })
            if (!file) {
                return this.ServerResponse.error(10211, '获取回复失败')
            }
            return this.ServerResponse.success(file, '获取回复成功')
        }
        


        
    }
    return FileService;
}
