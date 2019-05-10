<template>
  <div class="page">
    <page-header :data="photoData.data"></page-header>
    <div class="image">
      <div class="btn-box">
        <el-button type="primary" plain @click="visible = true;">添加相册</el-button>
      </div>
      <el-dialog title='新建相册' :visible.sync="visible" width="50%" :modal-append-to-body="false">
        <div class="smart-widget">
          <div class="smart-widget-inner">
            <div class="smart-widget-body">
              <el-form ref="photoForm" :model="photo" :rules="photoRules" label-width="180px">
                <el-form-item label="标题" prop="title">
                  <el-input v-model="photo.title" placeholder="请填写标题"></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="poster">
                  <el-upload
                    class="avatar-uploader"
                    action="/"
                    :limit="1"
                    :show-file-list="false"
                    :http-request="onFileUpload"
                    :before-upload="xcommon.beforeAvatarUpload"
                  >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
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
        <el-image :src="item.url" fit="cover"></el-image>
        <figcaption style="text-algin: 'center';">{{ item.title }}</figcaption>
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
        picUrl: ""
      },
      photoRules: {
        title: [{ required: true, message: "请输入相册标题", trigger: "blur" }],
        poster: [{ required: true, message: "请选择相册封面", trigger: "blur" }]
      },
      photoData: {
        data: {
          title: "相册"
        },
        fits: [
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣",
            id: 1
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣",
            id: 1
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
            title: "新垣结衣"
          }
        ]
      }
    };
  },
  methods: {
    onFileUpload() {},
    onSubmit() {
      this.$refs["photoForm"].validate(valid => {
        if (valid) this.addPhoto();
        return false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.image {
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
  .btn-box {
    margin-bottom: 20px;
  }
  .block {
    cursor: pointer;
    display: inline-block;
    margin-right: 3%;
    &:nth-last-child(1) {
      margin-right: 0px;
    }
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
