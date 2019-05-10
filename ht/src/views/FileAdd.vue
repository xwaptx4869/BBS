<template>
	<div class="File-add">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/content/files/' }">文件管理</el-breadcrumb-item>
                <el-breadcrumb-item>新建文件</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="smart-widget">
			<div class="smart-widget-header">新建文件</div>
			<div class="smart-widget-inner">
				<div class="smart-widget-body">
					<el-form ref="FileForm" :model="FileList" :rules="FileRules" label-width="180px">
						 <el-form-item prop="type" label="分类">
							<el-select v-model="FileList.type" placeholder="请选择" >
								<el-option
								v-for="(item, index) in fileclassSource"
								:key="index"
								:label="item.label"
								:value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="文件" prop="poster">
							<el-upload
                                action="/"
								:show-file-list="false"
								:http-request="onFileUpload"
                                :before-upload="xcommon.beforeAvatarUpload">
                                 <el-button size="small" type="primary">点击上传</el-button>
								<img v-if="FileList.file_src" :src="FileList.file_src" class="avatar">
                            </el-upload>
						</el-form-item>
						<el-form-item>
                            <el-button type="primary" :loading="loading" @click="onSubmit" >提交</el-button>
						</el-form-item>
					</el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { FileType,fileclassSource } from '@/utils/search'
export default {
	name: 'FileAdd',
	data () {
		return {
			fileclassSource,
			addTopicString: '',
			FileType,
			type:'',
			FileList: {
				type: '',
				file_src:''
			},
			topics: [],
			inputVisible: false,
			FileRules: {
				title: [
					{required: true, message: '请输入文件标题', trigger: 'blur'},
				],
				type: [
					{required: true, message: '请选择文件类型', trigger: 'blur'},
				],
			},
			loading: false
		};
	},
	created () {
		if(!this.$route.path.match(new RegExp(/add/))){
			this.type = 'edit'
			this.news_id = this.$route.params.id
			this.getItemNews()
		}
	},
	methods: {
		getItemNews () {
			this.$axios.get(`/file/${this.news_id}`).then(response => {
				const {status, data, message} = response.data
				if(status !== 0) return this.$message.error(status);
				data.type = data.type + ''
				this.FileList = data
			})
		},
		// 添加文件
		addFile () {
			this.loading = true
			this.$axios.post('/file/add', this.FileList).then(response => {
				const {status, data, message} = response.data
				if(status !== 0) return this.$message.error(message);
				this.$message.success('文件创建成功');
				this.$router.go(-1)
				this.loading = false
			})
		},
		// 更新文件
		updateFile () {
			this.loading = true
			this.$axios.post('/file/edit', this.FileList).then(response => {
				const {status, data, documentation_url} = response.data
				if(status !== 0){this.loading = false; return this.$message.error(status);}
				this.$message.success('文件更新成功');
				this.$router.go(-1)
				this.loading = false
			})
		},
		// 图片
		picSuccess (res, file) {
			if(res.code) return this.$message.success(res.message);
			this.FileList.file_src = res.data.data;
		},
		// 文件上传
		onFileUpload (elFrom) {
			console.log(elFrom)
			this.xcommon.fileUpload(elFrom.file).then(res => {
				this.picSuccess(res)
			})
		},
		onSubmit () {
			this.$refs['FileForm'].validate((valid) => {
				if (valid) 
				{
					this.type == 'add' ? this.addFile() :this.updateFile() ;
				}
				return false
			})
		}
	}
}
</script>
<style lang="scss">
</style>