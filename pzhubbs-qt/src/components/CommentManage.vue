<template>
  <div class="comment-page">
    <div v-if="data" class="comments-content">
      <el-badge v-if="commenttype == '1' " :value="data.length " :max="99">
        <div  class="comments-num">评论</div>
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
            <el-button
              size="mini"
              type="primary"
              @click="ifreply = true;secondifreply = false; clickindex = index;"
            >回复</el-button>
          </div>
          <div v-if="item.replylist" class="secondlevelreply-box">
            <div v-for=" (ite,inde) in item.replylist" :key="inde" class="reply-list">
              <div class="reply-avatar">
                <img :src="ite.imgSrc" alt>
                <div class="replyuser-msg">
                  <b>{{ite.username}}</b>
                  <p>{{ite.uptime}}</p>
                </div>
              </div>
              <div class="reply-content">
                <p>叫我夏洛克，谢谢。叫我夏洛克，谢谢。叫我夏洛克，谢谢。</p>
                <el-button
                  size="mini"
                  type="primary"
                  @click="ifreply = false;;secondifreply = true; secondclick = inde;"
                >回复</el-button>
              </div>
              <div v-if="secondifreply&& secondclick == inde " class="reply-box">
                <div class="comments-reply-box">
                  <el-form :model="form" ref="form2">
                    <el-form-item>
                      <span>回复：@{{ite.username}}</span>
                      <el-input type="textarea" placeholder="说点什么吧" v-model="form.content" rows="3"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button size="small" type="primary">发表回复</el-button>
                      <el-button size="small" @click="secondifreply = false;">取消回复</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
          <div v-if="ifreply&& clickindex == index " class="reply-box">
            <div class="comments-reply-box">
              <el-form :model="form" ref="form">
                <el-form-item>
                  <span>回复：@{{item.username}}</span>
                  <el-input type="textarea" placeholder="说点什么吧" v-model="form.content" rows="3"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="primary">发表回复</el-button>
                  <el-button size="small" @click="ifreply = false;">取消回复</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="release-box">
      <div class="comments-release-box">
        <el-form :model="form" ref="form" label-position="top" label-width="80px">
          <el-form-item :label=" commenttype == '1' ? '发表评论' : '发表留言' ">
            <el-input type="textarea" placeholder="说点什么吧" v-model="form.content" rows="4"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary">{{commenttype == '1' ? '发表评论' : '发表留言'}}</el-button>
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
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      commenttype: this.type,
      form: {
        content: ""
      },
      ifreply: false,
      secondifreply: false,
      secondclick: null,
      clickindex: null,
      data: this.commentdata
    };
  },
  created() {},
  watch: {
    commentdata(val) {
      this.data = val;
    },
    type(val) {
      this.commenttype = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-badge__content.el-badge__content--undefined.is-fixed {
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
  .reply-box {
    .el-form-item {
      margin-bottom: 5px;
    }
  }
}
.secondlevelreply-box {
  padding-left: 40px;
  .reply-avatar {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .replyuser-msg {
      display: inline-block;
      line-height: 20px;
      p {
        color: #a0a0a0;
        font-size: 12px;
      }
    }
  }
  .reply-content {
    margin-top: 10px;
    padding-left: 40px;
    p {
      margin-bottom: 12px;
    }
  }
}
.release-box {
  margin-top: 20px;
  .el-form-item {
    margin-bottom: 5px;
  }
}
</style>
