<template>
  <div class="page">
      <page-header :data="articleData.data"></page-header>
    <div class="article-box">
      <div class="article" v-for="item in articles " :key="item.id">
        <div v-if="item.poster"  @click="$router.push( { name:'articleDetails',params:{ id:item.article_id } } )" class="img-box" :style="{  backgroundImage:'url('+ item.poster+ ')' }" >
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
      articles: [
        {
          title: "关于web语义化、自定义命名的规范",
          poster:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392705465&di=d8319ad67aae4838a7a541dfbc6212c9&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg',
          introduction:
            "语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护",
          username: "xuwei",
          uptime: "2019年4月5日",
          commentnum: 0,
          id:233,
        },
        {
          title: "TeamViewer 检测出商业用途的解决办法",
          introduction:
            "TeamViewer可免费提供给任何人用于个人非商业用途 – 我们的大多数用户都能遵守规则，如果我们打算将TeamViewer用于商业用途，需要购买许可证。",
          username: "xuwei",
          uptime: "2019年4月6日",
          commentnum: 5,
          id:234,
        },
        {
          title: "关于web语义化、自定义命名的规范",
          poster:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392726161&di=d0b1c139acf9b323b2eac6856e89d006&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170612%2F35357d9f382a4371884aee4ad6db2821_th.jpg',
          introduction:
            "语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护",
          username: "xuwei",
          uptime: "2019年4月5日",
          commentnum: 0,
          id:235,
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
          poster:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg',
          introduction:
            "语义化是前端开发里面的一个专用术语，其优点在于标签语义化有助于构架良好的html结构，有利于搜索引擎的建立索引、抓取；另外，亦有利于页面在不同的设备上显示尽可能相同；此外，亦有利于构建清晰的机构，有利于团队的开发、维护",
          username: "xuwei",
          uptime: "2019年4月5日",
          commentnum: 0
        }
      ]
    };
  },
  created(){
    // this.$router.afterEach((to, from) => {
    this.getArticl();
  // })
  },
  methods:{
    getArticl(){
      this.$axios.get(`http://127.0.0.1:7001/frontend/v1/article`).then(response => {
        const { status, data, message } = response.data;
        if (status !== 0) return this.$message.error(message);
        this.articles = data.rows;
        console.log(this.news);
        // this.news.label_ids = this.xcommon.arrayHandle(data.labels)
        // this.news.classification_ids = this.xcommon.arrayHandle(data.classifications)
        // this.xEditor.txt.html(data.content);
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
