<template>
  <div class="aside">
    <el-card :style="{marginBottom:'10px'}" :body-style="{ padding: '0px' }">
      <div slot="header">
        <span>热门文章</span>
      </div>
      <div class="hot-article-box">
        <div class="hot-article" v-for=" (item,index) in articles " :key="index">
          <div class="title">
            <i class="el-icon-medal"></i>
            {{item.title}}
          </div>
         <div class="msg">
              <i class="el-icon-chat-dot-square"></i>
          <span class="comment">{{ item.commentnum}}</span>
          <i class="el-icon-view"></i>
          <span class="viewnum">{{item.viewnum}}</span>
         </div>
        </div>
      </div>
    </el-card>
    <el-card :body-style="{ padding: '10px' }">
      <div slot="header">
        <span>标签云</span>
      </div>
      <el-tag v-for="(tag,index) in tags" :key="index" :type="tag.type">{{tag.name}}</el-tag>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tags: [
        { name: "前端", type: "" },
        { name: "后台", type: "success" },
        { name: "vue", type: "info" },
        { name: "react", type: "warning" },
        { name: "anglur", type: "danger" },
        { name: "前端", type: "" },
        { name: "后台", type: "success" },
        { name: "vue", type: "info" },
        { name: "react", type: "warning" },
        { name: "anglur", type: "danger" },
        { name: "前端", type: "" },
        { name: "后台", type: "success" },
        { name: "vue", type: "info" },
        { name: "react", type: "warning" },
        { name: "anglur", type: "danger" },
        { name: "前端", type: "" },
        { name: "后台", type: "success" },
        { name: "vue", type: "info" },
        { name: "react", type: "warning" },
        { name: "anglur", type: "danger" }
      ],
      articles: [
        {
          title: "hybbs插件-五色用户标签",
          commentnum: 10,
          viewnum: 400
        },
        {
          title: "关于vultr的一些敏感文章会放到GitBook中记录",
          commentnum: 10,
          viewnum: 400
        },
        {
          title: "Windos系统修改Hosts的简便方法",
          commentnum: 10,
          viewnum: 400
        },
        {
          title: "宫崎骏16部动画精美图片",
          commentnum: 10,
          viewnum: 400
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.aside {
  color: #000;
  width: 100%;
  .hot-article-box {
    padding: 20px;
    .hot-article{
     .title{
        font-size: 14px;
        cursor: pointer;
    }
    padding-bottom: 20px;
    &:nth-last-child(1){
        padding-bottom: 0px;
    }
    }
    .msg{
        padding-left: 15px;
        font-size: 13px;
        color: #a0a0a0;
    }
    
  }
  .el-tag {
    margin: 0 10px 10px 10px;
    cursor: pointer;
  }
}
</style>

