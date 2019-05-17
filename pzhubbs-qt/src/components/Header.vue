<template>
  <div>
    <div v-if="datalist.isArticle" class="article-header box">
      <a href="#top"></a>
      <h1>{{datalist.title}}</h1>
      <div class="msg">
        <i class="el-icon-s-custom"></i>
        <span class="name">{{datalist.username}}</span>
        <i class="el-icon-time"></i>
        <span class="time">{{xutils.formatTime(datalist.created_at)}}</span>
        <i class="el-icon-chat-dot-square"></i>
        <span class="comment">{{ datalist.comment_num ?'评论数:'+datalist.comment_num : '暂无评论' }}</span>
        <i class="el-icon-collection"></i>
        <span class="classifition">{{datalist.classification_ids}}</span>
      </div>
    </div>
    <div v-else class="box title">
      <h1>{{data.title}}</h1>
      <span>{{data.mood}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      isArticle: {
        type: Boolean,
        default: false
      }
    }
  },

  data() {
    return {
      datalist: this.data,
      user: {
        name: "骚年",
        mood: "好梦向来易醒。"
      },
      isHome: true
    };
  },
  created() {
  },
  watch: {
    data(val) {
      this.datalist = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.box {
  width: 100%;
  border-bottom: 1px solid #dee5e7;
  background-color: #f9f9f9;
  padding: 20px;
  box-sizing: border-box;
  h1 {
    font-size: 24px;
    font-weight: 300;
    color: #000;
  }
  span {
    color: #a0a0a0;
  }
  .msg{
    padding-top: 15px;
    i{
      padding-right: 3px;
    }
    span{
      padding-right: 10px;
    }
  }
}
</style>
