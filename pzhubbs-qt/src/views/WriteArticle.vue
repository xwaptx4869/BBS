<template>
  <div class="news-add">
    <page-header :data="writeData.data"></page-header>
    <div class="smart-widget">
      <div class="smart-widget-inner">
        <div class="smart-widget-body">
          <el-form ref="newsForm" :model="news" :rules="newsRules" label-width="80px">
            <el-form-item label="标题" prop="title">
              <el-input v-model="news.title" placeholder="请填写标题"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="introduction">
              <el-input v-model="news.introduction" placeholder="请填写简介"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="poster">
              <el-upload
                action="/"
                :show-file-list="false"
                :http-request="onImgeUpload"
                :before-upload="xcommon.beforeAvatarUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <img v-if="news.poster" :src="news.poster" class="avatar">
              </el-upload>
            </el-form-item>
            <el-form-item prop="labels" label="标签">
              <el-select
                v-model="news.labels"
                filterable
                multiple
                placeholder="请选择"
                @change="handel"
              >
                <el-option
                  v-for="(item, index) in xcommon.arrayHandle(labels)"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="classifications" label="分类">
              <el-select v-model="news.classifications" filterable multiple placeholder="请选择">
                <el-option
                  v-for="(item, index) in xcommon.arrayHandle(classifications)"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="正文" prop="content">
              <template>
                <div ref="editorIntro" style="text-align:left"></div>
              </template>
            </el-form-item>
            <el-form-item>
              <!-- <el-button type="primary" v-if="news.status === '' || news.status === 0" :loading="loading" @click="onSubmit(0)" >存草稿</el-button> -->
              <el-button type="primary" :loading="loading" @click="onSubmit(1)">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pageHeader from "../components/Header";
export default {
  name: "NewsAdd",
  components: {
    pageHeader
  },
  data() {
    return {
      writeData: {
        data: {
          title: "文章编写"
        }
      },
      addTopicString: "",
      news: {
        poster:'',
        introduction:''
      },
      newssearch: {},
      labels: [],
      classifications: [],
      value: [],
      newsRules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        labels: [{ required: true, message: "请输入标签", trigger: "blur" }],
         introduction: [{ required: true, message: "请填写简介", trigger: "blur" }],
        classifications: [
          { required: true, message: "请输入分类", trigger: "blur" }
        ],
        content: [{ required: true, message: "请设置文章内容" }]
      },
      loading: false,
      type: "add",
      news_id: "",
      inputVisible: false,
      inputValue: "",
      xEditor: null
    };
  },
  computed: {
    newsPoster() {
      return this.$store.state.System.imagePath + this.news.poster;
    }
  },
  created() {
    this.getLabels();
    this.getClassifis();
    if (this.type !== "add") {
      this.type = "edit";
      this.news_id = this.$route.params.id;
      this.getItemNews();
    }
  },
  mounted() {
    // 富文本编辑器使用
    this.xEditor = this.xcommon.createWangeditor(
      this.$refs.editorIntro,
      html => {
        this.news.content = html;
      }
    );
  },
  methods: {
    getItemNews() {
      console.log(this.$axios);
      this.$axios.get(`http://127.0.0.1:7001/frontend/v1/article/${this.news_id}`).then(response => {
        const { status, data, message } = response.data;
        if (status !== 0) return this.$message.error(message);

        this.news = data;

        console.log(this.news);
        // this.news.label_ids = this.xcommon.arrayHandle(data.labels)
        // this.news.classification_ids = this.xcommon.arrayHandle(data.classifications)
        this.xEditor.txt.html(data.content);
      });
    },
    addNews() {
      this.news.label_ids = this.xutils.formatLabel(this.news.labels);
      this.news.classification_ids = this.xutils.formatLabel(
        this.news.classifications
      );
      console.log(this.news);
      this.$axios.post("http://127.0.0.1:7001/frontend/v1/article/add", this.news).then(response => {
        const { status, data, message } = response.data;
        if (status !== 0) return this.$message.error("创建失败，请检查参数");
        this.$message.success("创建文章成功");
        this.$router.go(-1);
      });
    },
    updateNews() {
      this.newssearch = JSON.parse(JSON.stringify(this.news));
      this.newssearch.label_ids = this.xutils.formatLabel(
        this.newssearch.labels
      );
      this.newssearch.classification_ids = this.xutils.formatLabel(
        this.newssearch.classifications
      );
      this.newssearch.article_id = this.news_id;
      console.log(this.news);
      this.$axios.post("http://127.0.0.1:7001/frontend/v1/article/edit", this.newssearch).then(response => {
        const { status, data, message } = response.data;
        if (status !== 0) return this.$message.error(status);
        this.$message.success("更新文章成功");
        this.$router.go(-1);
      });
    },
    querySearchAsync(queryString, cb) {
      if (!queryString) return [];
      this.xcommon.queryTopics(queryString).then(data => {
        cb(data);
      });
    },
    // 文件上传
    onFileUpload(elFrom) {
      this.xcommon.fileUpload(elFrom.file).then(res => {
        this.handleAvatarSuccess(res);
      });
    },
     onImgeUpload(elFrom) {
      this.xcommon.fileUpload(elFrom.file).then(res => {
        this.picSuccess(res);
      });
    },
    // 图片上传
    picSuccess (res, file) {
			if(res.code) return this.$message.success(res.message);
			this.news.poster = res.data.data;
		},
    handleAvatarSuccess(res) {
      if (res.status) return this.$message.error(res.message);
      this.news.poster = res.data;
    },
    onSubmit(status) {
      this.$refs["newsForm"].validate(valid => {
        if (valid) this.type === "add" ? this.addNews() : this.updateNews();
      });
    },
    getLabels() {
      this.$axios.get("http://127.0.0.1:7001/frontend/v1/label").then(response => {
        const { status, data, message, total } = response.data;
        if (status !== 0) return this.$message.error(message);
        this.labels = data;
      });
    },
    getClassifis() {
      this.$axios.post("http://127.0.0.1:7001/frontend/v1/classifications").then(response => {
        const { status, data, message, total } = response.data;
        if (status !== 0) return this.$message.error(message);
        this.classifications = data;
      });
    },
    handel() {
      console.log(this.news.labels);
    }
  }
};
</script>
<style lang="scss">
.smart-widget {
  padding: 30px;
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
}
</style>