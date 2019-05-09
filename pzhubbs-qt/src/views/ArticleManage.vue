<template>
  <div>
    <page-header :data="articleData.data"></page-header>
    <div class="content-box">
      <div class="article-box">
        <div class="title">
          <div
            v-if="articleData.imgSrc"
            class="img-box"
            :style="{ backgroundImage:'url('+ articleData.imgSrc+')' }"
          ></div>
        </div>
        <div class="content">
          <p>
            来自一个匿名用户
            我大概会挨喷吧，但是我亲眼所见单位里的几个农村娃娃，大学毕业后，穿着打扮跟城市里的人外表看不出差别，收入也跟同龄同阶的人差不多时，真的觉得自己跟所有人都一样。然后一味的追求“品质生活”，看电影，吃饭店，买品牌衣服，买高级化妆品，甚至为爱豆花钱。
            我觉得恐怖的是，他们没有想过的是，其他城市里的孩子父母大多都有那个年代分配的工作，家里都有养老金和储蓄的，到了年龄，家里咬咬牙大多都是凑的起首付买房子的，然后二老拿着退休金，揣着社保不说高枕无忧，也是底气十足。农村娃娃他们那面朝黄土背朝天的父母，就算有积蓄那也真的只是积蓄，再没有其他的保障。可是他们看不到也不去想这些，只一味的觉得大家都一样，所以，别人有的我也要有。
            别人那是两代或三代人的积累，仍旧过的苟延残喘。你这么精致的生活，不给自己和父母留余地，将来谁为你妳的生活买单？
            当然，我只是在心里这么合计过，没嘴欠说过。只是当单位里一个农村小姑娘相亲后被嫌弃是农村人的时候，她抱怨的是城里人狗眼看人低的那一刻，我想到的其实是世人皆苦，你看不到自己背着那么大的一个包袱，以为自己是轻装上阵。熟不知，人家很可能不是嫌弃你的出身，更是恐惧你的负担。更是更是恐惧你对你自己真实状况的一无所知，却还理直气壮的要别人替你提供目所能及的一切精致生活。
            唉，不一样就是不一样，就像我是一个普通县城工人家庭的孩子，跟人家大学老师家里的孩子比，从小到大都不一样，人家凭什么不比我优秀？
            就凭鸡汤里的一句“越努力越幸运？”
            嗷，对了，确实有一个长的不错的漂亮农村小美女，凭借着自己中高颜值嫁了个小款爷，目测过的还挺好，天天跟着小款吃喝玩乐的，生了儿子后，似乎更安心了。但这样的例子太少也不正路，学习这种的，成功率太低，而一旦失败被打回原点的痛苦，也不是正常人能承受的。我不推荐效仿，谢谢。
            －－－－－－－－－－－－－－－－－－－－－－－
            再更
            我说的东西就是我说的东西，有些人看懂了，那就懂了。有些人没看懂，非说我狭隘，也无所谓。反正匿名，对，就是这么鸡贼。
            另外声明一点嗷，答主本人我是不婚族，去年买了房子，明年打算买车，基本生活有保障，所以不存在酸sei不酸sei一说，那些觉得我是酸sei嫁的好自己嫁不上的可以省省了。
            －－－－－－－－－－－－－－－－－－－－－－－
            最后一更
            说点更实在的吧，我今年32了，去年在所在省会买了房子，前几天刚装完修置办完家具。一半的首付和接近十万的装修费用把家里和我个人近十年的积蓄差不多掏空了。但是我心情很轻松，也很苦涩。
            轻松的是，这么多年了，租房子快十年，房租都交出去几万了，终于有自己的房子了。苦涩的是，我都32了，在最好的年华23到30这些年，为了这个房子，我提心吊胆的，内心一刻都不得安宁，单次消费超过300我内心都要疼一下。以后终于不需要再过这样的日子了。为了在这个城市立足，我把最好的年华都搭进去了，我很卑劣的在心里想，如果，如果我的家庭状况稍微好那么一点，在毕业那年就可以买上房子，我是不是就可以过的稍微轻松那么一点点？
            我跟城市里中产家庭小孩差了多远？差了十年的光阴和辛苦的工作成本。十年，每个人最好的十年。
            恐怕有些人会说，那是因为你心思重，你完全可以慢慢来不着急，适当的提高一下生活质量，每个月少攒一点，只不过晚点买房而已。晚点？再过五年吗？好的，那就是十五年。在这种时候，谁跟我说人和人其实都一样？猜猜我是啥心情捏？这还是在我爸妈帮出了一半费用的情况下，这还是在我拿着他俩的钱还可以劝自己他俩有退休金有社保的情况下。
            恐怕还有人说，这不怪你，都是房价的错。可就算是房价低到可以白送，我不花钱，但人家也省下了不是吗？这部分省下的钱，可以用在未来下一代更好的教育上等等。。。。
            我是一般的家庭，一般的学历，一般的工作，一般的生活状态。我相信纯985211毕业的人不多，就算985了，真活在北上广，买房子也是快成天方夜谭的一件事了。剩下的不过都是芸芸众生，把芸芸众生参差不齐的放在同一个环境里，像不像我们小时候玩的游戏，一个城市里不同的市民，每个市民背后不同的属性？游戏中我们会给主角很多的偏爱和加成，剩下的npc就一笑了之罢了。
            年轻的时候，我们以为我们会是主角，无所不能。
            而立之后才发现，不过是npc。
            世人皆苦，世人真苦。
            正是因为百感交集，所以看到这个话题才会献丑多说了那么几句，也没有针对农村人的意思，不过是我说的现象在农村小孩身上发生的概率较大。
            赞了骂了真的都无所谓，祝每个努力生活的人，平安长顺。
          </p>
        </div>
        <div class="footer">
          <div class="copyright">
              <p>版权属于：{{articleData.data.username}}</p>
              <p>您必须遵守：<a href="https://creativecommons.org/licenses/by-nc-sa/4.0" target="_blank">署名-非商业性使用-相同方式共享 CC BY-NC-SA</a> 使用这篇文章</p>
          </div>
          <div class="bootom-msg">
              <i class="el-icon-time"></i><span>最后修改：{{articleData.data.uptime}}</span>
              <span class="copyrightfor">©著作权归作者所有</span>
          </div>
        </div>
      </div>
      <comment :commentdata="commentdata"></comment>
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
      articleData: {
        data: {
          title: "关于web语义化、自定义命名的规范",
          username: "xuwei",
          uptime: "2019-5-9",
          commentnum: 5,
          classifition: "技术文章",
          isArticle: true
        },
        imgSrc:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg"
      },
      commentdata:[
          {
              imgSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg',
              username:'shasha',
              uptime:'2019-5-8'
          },
          {
              imgSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg',
              username:'shasha',
              uptime:'2019-5-8'
          },
          {
              imgSrc:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557392706246&di=7bb2b9f657c3435d65af2f14f58db546&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20170818%2F20170818115355_d41d8cd98f00b204e9800998ecf8427e_1.jpeg',
              username:'shasha',
              uptime:'2019-5-8'
          }
      ]
    };
  },
  mounted() {
    this.totop();
  },
  methods: {
    totop() {
      document.getElementsByClassName("wrapper")[0].scrollTo(0, 0);
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
      p{
          line-height: 40px;
          color: #555;
          a{
              text-decoration: underline;
              color: #555;
          }
      }
    }
    .bootom-msg{
        padding-top: 20px;
        font-size: 12px;
        color: #9b9b9b;
        .copyrightfor{
            float: right;
        }
    }
  }
}
</style>
