<template>
	<div class="photo-add">
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/content/photos/' }">相册管理</el-breadcrumb-item>
                <el-breadcrumb-item>相册编辑</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="smart-widget">
			<div class="smart-widget-header">相册编辑</div>
			<div class="smart-widget-inner">
				<div class="smart-widget-body">
					<el-form ref="photoForm" :model="photo" :rules="photoRules" label-width="180px">
						<el-form-item label="标题" prop="title">
							<el-input v-model="photo.title" placeholder="请填写标题"></el-input>
						</el-form-item>
						<el-form-item label="封面" prop="poster">
							<el-upload
                                action="/"
								:show-file-list="false"
								:http-request="onFileUpload"
                                :before-upload="xcommon.beforeAvatarUpload">
                                 <el-button size="small" type="primary">点击上传</el-button>
								<img v-if="photo.poster" :src="photo.poster" class="avatar">
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
import { photoType } from '@/utils/search'
export default {
	name: 'PhotoAdd',
	data () {
		return {
			addTopicString: '',
			photoType,
			photo: {
				title: '',
				user_id: '1',
				poster:'',

			},
			topics: [],
			inputVisible: false,
			photoRules: {
				title: [
					{required: true, message: '请输入相册标题', trigger: 'blur'},
				]
			},
			loading: false
		};
	},
	created(){
		this.photo.user_id = this.$route.params.id+'';
		this.getphoto();
	},
	methods: {
		// 获取内容
		getphoto () {
			this.loading = true
			console.log(0)
			this.$axios.post(`/album/getonealbum/${this.photo.user_id}`).then(response => {
				const {status, data, message} = response.data
				if(status !== 0) return this.$message.error(message);
				console.log(response.data)
				this.photo.poster = response.data.data.poster;
				this.photo.title = response.data.data.title;
				this.loading = false
			})
		},
		// 更新相册
		addPhoto () {
			this.loading = true
			this.$axios.post('/album/edit', this.photo).then(response => {
				const {status, data, documentation_url} = response.data
				if(status !== 0){this.loading = false; return this.$message.error(documentation_url);}
				this.$message.success('相册更新成功');
				this.$router.go(-1)
				this.loading = false
			})
		},
		// 图片
		picSuccess (res, file) {
			if(res.code) return this.$message.success(res.message);
			console.log(res.data);
			this.photo.poster = res.data.data;
			console.log(this.photo.poster)
		},
		// 文件上传
		onFileUpload (elFrom) {
			console.log(elFrom)
			this.xcommon.fileUpload(elFrom.file).then(res => {
				console.log(res);
				this.picSuccess(res)
			})
		},
		onSubmit () {
			this.$refs['photoForm'].validate((valid) => {
				if (valid) this.addPhoto()
				return false
			})
		}
	}
}
</script>
<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>