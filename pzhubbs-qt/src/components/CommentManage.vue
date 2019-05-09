<template>
  <div class="comment-page">
    <div v-if="data" class="comments-content">
      <el-badge :value="data.length" :max="99">
          <div class="comments-num">评论</div>
      </el-badge>
      <div class="comments-list">
        <div class="comment" v-for=" (item,index) in data" :key="index">
          <div class="avatar">
            <img :src="item.imgSrc" alt>
            <div class="commentuser-msg">
              <b>{{item.username}}</b>
              <p>{{item.uptime}}</p>
            </div>
          </div>
          <div class="comment-content">
            <p>和鹅鹅鹅鹅鹅鹅嗯嗯嗯嗯嗯嗯嗯嗯嗯嗯嗯嗯嗯嗯嗯</p>
            <el-button size="mini" type="primary" @click="ifreply = true">回复</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="release-box">
      <div class="comments-release-box">
        <el-form :model="form" ref="form" label-position="top" label-width="80px">
          <el-form-item label="发表评论">
            <el-input type="textarea" placeholder="说点什么吧" v-model="form.content" rows="4"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain>发表评论</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    commentdata: {
      type: Array
    }
  },
  data() {
    return {
      form: {
        content: ""
      },
      ifreply:false,
      data: this.commentdata
    };
  },
  watch: {
    commentdata(val) {
      this.data = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-badge__content.el-badge__content--undefined.is-fixed{
    position: absolute;
    top: 0;
    right: 5px;
}
.comments-content {
  .comments-num {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .comments-list {
    .comment {
      .avatar {
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .commentuser-msg {
          display: inline-block;
          line-height: 20px;
          p {
            color: #a0a0a0;
            font-size: 12px;
          }
        }
      }
      .comment-content {
        margin-top: 10px;
        padding-left: 40px;
        p {
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>
