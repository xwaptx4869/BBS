<template>
  <div class="page">
    <page-header :data="msgBoardData.data"></page-header>
    <div class="box">
    <comment :commentdata="data" :type="'2'"></comment>
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
      msgBoardData: {
        data: {
          title: "留言板"
          // mood:'这是我的相册'
        }
      },
      ifreply: false,
      secondifreply: false,
      secondclick: null,
      clickindex: null,
      data:[
        {
          imgSrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
          username: "shasha",
          uptime: "2019-5-8",
          replylist: [
            {
              imgSrc:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
              username: "xuwei",
              uptime: "2019-5-10"
            },
            {
              imgSrc:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
              username: "xuwei",
              uptime: "2019-5-10"
            },

          ]
        },
        {
          imgSrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
          username: "shasha",
          uptime: "2019-5-8"
        },
        {
          imgSrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
          username: "shasha",
          uptime: "2019-5-8",
           replylist: [
            {
              imgSrc:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg",
              username: "xuwei",
              uptime: "2019-5-10"
            },
            {
              imgSrc:
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557987500&di=4715165b2cd8a22379faee6df6792f9e&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2F676ede2f1238ae497d67c4aff1be1733076a66f8.jpg",
              username: "xuwei",
              uptime: "2019-5-10"
            },

          ]
        }
      ] ,
    };
  }
};
</script>
<style lang="scss" scoped>
.box{
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
}
</style>
