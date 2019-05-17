<template>
  <div>
    <page-header :data="data"></page-header>
    <div class="content-box">
      <div class="article-box">
        <div class="title">
          <div
            v-if="data.poster"
            class="img-box"
            :style="{ backgroundImage:'url('+ data.poster+ ')' }"
          ></div>
           <p class="introduction">{{data.introduction}}</p>
        </div>
        <div class="content" v-html="data.content">
        </div>
        <div class="footer">
          <div class="copyright">
            <p>版权属于：{{data.username}}</p>
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
            <span>最后修改：{{xutils.formatTime(data.updated_at)}}</span>
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
    this.articleData={
        username:'aptx4869',
        content:'',
        poster:''
      }
    return {
      id:null,
      data: {
          title: this.articleData.title,
          username: this.articleData.username,
          created_at: this.articleData.created_at,
          comment_num:this.articleData.commentnum,
          classifition:this.articleData.classifition,
          isArticle: true,
          content:'',
          poster:''
        },
      commentdata: []
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
        this.articleData = response.data.data;
        Object.assign(this.data,this.articleData) ;
      });
    },
    getcomments(){
      this.$axios.post('http://127.0.0.1:7001/frontend/v1/comment',{type:'1',connect_id:this.id}).then(response => {
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
    .introduction{
          margin: 0 0 20px 0;
          font-size: 1.1em;
    }
    .content {
      padding-bottom: 30px;
      border-bottom: 2px dotted #eee;
       img{
         max-width: 100%;
       }
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
