<template>
  <div class="page">
    <page-header :data="photoData.data"></page-header>
    <div class="image">
      <div class="box">
      <div class="btn-box">
        <el-button type="primary" plain @click="visible = true;">添加相册</el-button>
      </div>
      <el-dialog title="新建相册" :visible.sync="visible" width="50%" :modal-append-to-body="false">
        <div class="smart-widget">
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
                    :before-upload="xcommon.beforeAvatarUpload"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <span v-if="photo.poster" class="avatar">
                      <img :src="photo.poster">
                    </span>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" :loading="loading" @click="onSubmit">提交</el-button>
                  <el-button @click=" visible = false">取 消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-dialog>
      <div
        class="block"
        style="width: 22%; height: 180px"
        v-for="(item,index) in photoData.fits"
        :key="index"
        @click="$router.push( { name:'photodetails',params:{id:item.id}})"
      >
        <el-image :src="item.poster" ></el-image>
        <figcaption style="text-algin: 'center';">{{ item.title }}</figcaption>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import pageHeader from "../components/Header";
import comment from "../components/CommentManage";
export default {
  components: {
    pageHeader,
    comment
  },
  data() {
    return {
      visible: false,
      loading: false,
      photo: {
        title: "",
        desc: "",
        topicIds: "",
        isHome: 0,
        type: "",
        is_update: 1,
        poster:'',
        user_id:'',
      },
      photoRules: {
        title: [{ required: true, message: "请输入相册标题", trigger: "blur" },
          { min: 1,max:10, message: "请输入10位以内标题", trigger: "blur" }],
        poster: [{ required: true, message: "请选择相册封面", trigger: "blur" }]
      },
      photoData: {
        data: {
          title: "相册"
        },
        fits: []
      }
    };
  },
  created(){
    this.getPhotos()
  },
  methods: {
    getPhotos () {
			// const { searchList } = this;
			// const search = this.xutils.filterParam(searchList.search);
			// if (search.id && search.id === 'error')
			// 	return this.$message.error('请输入正确的相册ID');
			this.$axios.post('http://127.0.0.1:7001/frontend/v1/album', {user_id: this.photo.user_id}).then(response => {
				const { status, data, message } = response.data;
				if (status !== 0) return this.$message.error(message);
				this.photoData.fits = data;
			});
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
    },
    // 添加相册
		addPhoto () {
      this.loading = true
      this.photo.user_id = this.$store.state.userId+'';
			this.$axios.post('http://127.0.0.1:7001/frontend/v1/album/add', this.photo).then(response => {
				const {status, data, message} = response.data
				if(status !== 0) return this.$message.error(message);
				this.$message.success('创建相册成功');
        this.visible = false;
        this.getPhotos();
				this.loading = false
			})
		},
  }
};
</script>
<style lang="scss" scoped>
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
  .avatar {
   width: 200px;
   height:200px;
   display: block;
   img{
	   width: 100%;
	   height: 100%;
   }
  }
.image {
  padding: 30px;
  box-sizing: border-box;
  width: 100%;
  box-sizing: border-box;
  .box{
  background: #fff;
  }
  .btn-box {
    padding: 8px 0px 0px 5px;
    margin-bottom: 20px;
  }
  .block {
    cursor: pointer;
    display: inline-block;
    margin-right: 3%;
    // &:nth-last-child(1) {
    //   margin-right: 0px;
    // }
    // &:nth-child(6) {
    //   margin-right: 0px;
    // }
    &:hover {
      opacity: 0.9;
    }

    figcaption {
      background-color: #000;
      color: #fff;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
  }
}
.el-upload.el-upload--text {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 99;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
