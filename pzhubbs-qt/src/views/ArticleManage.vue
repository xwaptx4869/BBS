<template>
  <div>
    <page-header :data="articleData.data"></page-header>
    <div class="content-box">
      <div class="article-box">
        <div class="title">
          <div
            v-if="articleData.poster"
            class="img-box"
            :style="{ backgroundImage:'url('+ articleData.poster+ ')' }"
          ></div>
        </div>
        <div class="content" v-html="articleData.content">
        </div>
        <div class="footer">
          <div class="copyright">
            <p>版权属于：{{articleData.data.username}}</p>
            <p>
              您必须遵守：
              <a
                href="https://creativecommons.org/licenses/by-nc-sa/4.0"
                target="_blank"
              >署名-非商业性使用-相同方式共享 CC BY-NC-SA</a> 使用这篇文章
            </p>
          </div>
          <div class="bootom-msg">
            <i class="el-icon-time"></i>
            <span>最后修改：{{articleData.data.uptime}}</span>
            <span class="copyrightfor">©著作权归作者所有</span>
          </div>
        </div>
      </div>
      <comment :commentdata="commentdata" @transfercomment="getcomments" :type="'1'"></comment>
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
      id:null,
      articleData: {
        data: {
          title: "关于web语义化、自定义命名的规范",
          username: "xuwei",
          created_at: "2019-5-9",
          commentnum: 5,
          classifition: "技术文章",
          isArticle: true
        },
        content:'',
        poster:''
      },
      commentdata: [
        {
          poster:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
          username: "shasha",
          uptime: "2019-5-8",
          replylist: [
            {
              poster:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
              username: "xuwei",
              uptime: "2019-5-10"
            },
            {
              poster:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
              username: "xuwei",
              uptime: "2019-5-10"
            },

          ]
        },
        {
          poster:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
          username: "shasha",
          uptime: "2019-5-8"
        },
        {
          poster:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
          username: "shasha",
          uptime: "2019-5-8",
           replylist: [
            {
              poster:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
              username: "xuwei",
              uptime: "2019-5-10"
            },
            {
              poster:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
              username: "xuwei",
              uptime: "2019-5-10"
            },

          ]
        }
      ]
    };
  },
  mounted() {
  },
  created(){
    this.id = this.$route.params.id;
    this.getOneArticl();
    this.getcomments();
  },
  methods: {
    getOneArticl(){
      this.$axios.get(`http://127.0.0.1:7001/frontend/v1/article/${this.id}`).then(response => {
        const { status, data, message } = response.data;
        if (status !== 0) return this.$message.error(message);
        this.articleData.data.title = response.data.data.title;
        this.articleData.data.created_at = response.data.data.created_at;
        this.articleData.data.comment_num = response.data.data.comment_num;
        this.articleData.poster = response.data.data.poster;
        console.log( this.articleData.poster);
        // this.news.label_ids = this.xcommon.arrayHandle(data.labels)
        // this.news.classification_ids = this.xcommon.arrayHandle(data.classifications)
        // this.xEditor.txt.html(data.content);
      });
    },
    getcomments(){
      this.$axios.post('http://127.0.0.1:7001/frontend/v1/comment').then(response => {
				const {status, data, message} = response.data
				if(status !== 0) return this.$message.error(status);
				this.commentdata = data
			})
    }
  }
};
</script>
<style lang="scss" scoped>
.content-box {
  width: 100%;
  padding: 20px 20px 0px 20px;
  box-sizing: border-box;
  .article-box {
    border-radius: 4px;
    background: #fff;
    padding: 30px;
    margin-bottom: 30px;
    .img-box {
      width: 100%;
      min-height: 350px;
      cursor: pointer;
      min-height: 350px;
      position: relative;
      display: block;
      background-position: 50% 50%;
      background-size: cover;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      transition: all 0.6s;
      margin-bottom: 30px;
      &:hover {
        transform: scale(1.03);
      }
    }
    .content {
      padding-bottom: 30px;
      border-bottom: 2px dotted #eee;
    }
    .copyright {
      margin-top: 10px;
      padding-left: 30px;
      height: 80px;
      background-color: #f3f5f7;
      border-left: 3px solid #399c9c !important;
      p {
        line-height: 40px;
        color: #555;
        a {
          text-decoration: underline;
          color: #555;
        }
      }
    }
    .bootom-msg {
      padding-top: 20px;
      font-size: 12px;
      color: #9b9b9b;
      .copyrightfor {
        float: right;
      }
    }
  }
}
</style>
