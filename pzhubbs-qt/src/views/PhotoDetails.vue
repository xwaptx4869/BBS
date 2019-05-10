<template>
  <div class="page">
    <page-header :data="photoData.data"></page-header>
    <div class="image">
      <div
        class="block"
        style="width: 22%; height: 180px"
        v-for="item in photoData.fits"
        :key="item.id"
      >
        <el-image :src="item.url" fit="cover"></el-image>
      </div>
      <el-upload
        class="upload-demo"
        drag
        action="/"
        :before-upload="xcommon.beforeAvatarUpload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1MB</div>
      </el-upload>
    </div>
  </div>
</template>
<script>
import pageHeader from "../components/Header";
export default {
  components: {
    pageHeader
  },
  data() {
    return {
      photoData: {
        data: {
          title: "相册详情"
        },
        fits: [
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392726161&di=d0b1c139acf9b323b2eac6856e89d006&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170612%2F35357d9f382a4371884aee4ad6db2821_th.jpg"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392726161&di=d0b1c139acf9b323b2eac6856e89d006&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170612%2F35357d9f382a4371884aee4ad6db2821_th.jpg"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392726161&di=d0b1c139acf9b323b2eac6856e89d006&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170612%2F35357d9f382a4371884aee4ad6db2821_th.jpg"
          },
          {
            url:
              "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392726161&di=d0b1c139acf9b323b2eac6856e89d006&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170612%2F35357d9f382a4371884aee4ad6db2821_th.jpg"
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.image {
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
  .block {
    cursor: pointer;
    display: inline-block;
    margin-right: 3%;
    &:nth-last-child(1) {
      margin-right: 0px;
    }
  }
}
</style>
