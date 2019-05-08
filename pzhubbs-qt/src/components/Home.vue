<template>
  <div class="page">
    <div class="title">
      <h1>{{user.name}}</h1>
      <span>{{user.mood}}</span> </div>
    <div class="article-box">
      <div class="article" v-for="item in articles " :key="item.id">
        <div v-if="item.imgSrc" class="img-box" :style="{ backgroundImage:'url('+ item.imgSrc+')' }" >
        </div>
        <h2>{{item.title}}</h2>
        <p>{{item.introduction}}</p>
        <div class="article-msg">
          <span class="name">{{item.username}}</span>
          <i class="el-icon-time"></i>
          <span class="time">{{item.uptime}}</span>
          <i class="el-icon-edit-outline"></i>
          <span class="comment">{{ item.commentnum ?'评论数:'+item.commentnum : '暂无评论' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user:{
        name:'许如清',
        mood:'好梦向来易醒。'
      },
      articles: [
        {
          title: "关于web语义化、自定义命名的规范",
          imgSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556126003099&di=9eb8f28cd5ba53c554611499dcf5ebbb&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fd487c4c496b952e7463a9ac2a041643a.jpeg',
          introduction:
            "语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护",
          username: "xuwei",
          uptime: "2019年4月5日",
          commentnum: 0
        },
        {
          title: "TeamViewer 检测出商业用途的解决办法",
          introduction:
            "TeamViewer可免费提供给任何人用于个人非商业用途 – 我们的大多数用户都能遵守规则，如果我们打算将TeamViewer用于商业用途，需要购买许可证。",
          username: "xuwei",
          uptime: "2019年4月6日",
          commentnum: 5
        },
        {
          title: "关于web语义化、自定义命名的规范",
          imgSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556127019172&di=057a0c7d53e9d5ad88900adbf27d2738&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201504%2F25%2F20150425H2249_aULWv.jpeg',
          introduction:
            "语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护",
          username: "xuwei",
          uptime: "2019年4月5日",
          commentnum: 0
        },
        {
          title: "关于web语义化、自定义命名的规范",
          introduction:
            "语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护",
          username: "xuwei",
          uptime: "2019年4月5日",
          commentnum: 0
        },
        {
          title: "关于web语义化、自定义命名的规范",
          introduction:
            "语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护",
          username: "xuwei",
          uptime: "2019年4月5日",
          commentnum: 0
        },
        {
          title: "关于web语义化、自定义命名的规范",
          introduction:
            "语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护",
          username: "xuwei",
          uptime: "2019年4月5日",
          commentnum: 0
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.page {
   border-right: 1px solid #dee5e7;
   box-sizing: border-box;
  .title {
    width: 100%;
    border-bottom: 1px solid #dee5e7;
    background-color: #f9f9f9;
    padding:30px;
    box-sizing: border-box;
    h1{
      font-size: 24px;
      font-weight: 300;
    }
    span{
      color: #a0a0a0;
    }
  }
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
          transform: scale(1.08);
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
