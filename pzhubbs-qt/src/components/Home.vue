<template>
  <div class="page">
      <page-header :data="articleData.data"></page-header>
    <div class="article-box">
      <div class="article" v-for="item in articles " :key="item.id">
        <div v-if="item.poster" :style="{backgroundImage:'url('+item.poster +')'}"  @click="$router.push( { name:'articleDetails',params:{ id:item.article_id } } )" class="img-box"  >
        </div>
        <h2 @click="$router.push( { name:'articleDetails',params:{ id:item.article_id } } )">{{item.title}}</h2>
        <p>{{item.introduction}}</p>
        <div class="article-msg">
           <i class="el-icon-collection-tag"></i>
          <span class="name">{{xcommon.getclassification(item.labels)}}</span>
          <i class="el-icon-time"></i>
          <span class="time">{{ xutils.formatTime(item.created_at)}}</span>
          <i class="el-icon-chat-dot-square"></i>
          <span class="comment">{{ item.commentnum ?'评论数:'+item.commentnum : '暂无评论' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pageHeader from "../components/Header";
export default {
  components:{
    pageHeader
  },
  data() {
    return {
      articleData:{
        data:{
          title:'骚年',
          mood:'好梦向来易醒'
        }
      },
      bgImg:'',
      articles: []
    };
  },
  created(){
    this.getArticl();
  },
  methods:{
    getArticl(){
      this.$axios.get(`http://127.0.0.1:7001/frontend/v1/article`).then(response => {
        const { status, data, message } = response.data;
        if (status !== 0) return this.$message.error(message);
        this.articles = data.rows;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
   border-right: 1px solid #dee5e7;
   box-sizing: border-box;
  .article-box {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 20px 0px 20px;
    .article {
      border-radius: 4px;
      background: #fff;
      padding: 30px;
      margin-bottom: 30px;
      .img-box{
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
        &:hover{
          transform: scale(1.05);
        }
      }
      h2 {
        font-size: 22px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      p {
        color: #a0a0a0;
        margin-bottom: 10px;
      }
      .article-msg {
        padding-top: 20px;
        color: #a0a0a0;
        font-size: 13px;
        border-top: 1px solid #dee5e7;
        i{
            padding-left: 8px;
        }
      }
    }
  }
}
</style>
