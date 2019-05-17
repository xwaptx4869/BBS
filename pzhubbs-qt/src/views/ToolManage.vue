<template>
  <div class="page">
    <page-header :data="toolData.data"></page-header>
    <div class="box">
      <div class="box-content">
        <div class="title">
          <h2>工具箱的作用</h2>
          <p>
              当使用公共电脑时，因为这些电脑每次开机都会清空数据，所以当需要使用一些本地没有的软件时，还需要一个一个的去官网下载。很是不方便。而且有的时候官网还莫名其妙的打不开。所以弄了这样一个简单的页面用来收集那些常用的工具。
          </p>
        </div>
        <div class="content" v-for="item in toolData.list" :key="item.id">
            <h3>{{item.title}}</h3>
            <p v-for="ite in item.conten" :key="ite.id"> <a href="">{{ite.content}}</a> </p>
         
          
          
          
          
          
          
          
        
          
      
          
         
          
          
          <!-- TIM - 官网
          
          办公
          WPS office 2019 - 官网 | 版本：11.1.0.7989 | 非同步
          WPS office 2016 - 官网 | 版本：10.1.0.7671 | 非同步
          驱动
          Microsoft .NET Framework 4.5 - 腾讯软件中心 | 版本：4.5.50709.17929| 非同步
          Microsoft .NET Framework 3.5 - 腾讯软件中心 | 版本：3.5.30729.1| 非同步
          Microsoft .NET Framework 4.7 - 腾讯软件中心 | 版本：3.5.30729.1| 非同步
          影音
          PotPlayer 32位 - 官网
          PotPlayer 64位 - 官网
          输入法
          搜狗输入法 - 腾讯软件中心 | 版本：9.2.0.2756 | 非同步
          下载
          迅雷X - 官网
          迅雷 极速版 - 腾讯软件中心 | 版本：7.10.35.366| 非同步
          图片
          2345看图王 - 官网 | 版本：9.1.2 | 非同步
          Snipaste 64位 - 官网
          Snipaste 32位 - 官网
          Snipaste XP - 官网
          解压
          WinRaR 64位 - 官网
          WinRaR 32位 - 官网
          7z 64位 - 官网 | 版本：18.05 | 非同步
          7z 32位 - 官网 | 版本：18.05 | 非同步
          安全
          火绒 - 官网 -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import pageHeader from "../components/Header";
export default {
  components: {
    pageHeader
  },
  data() {
    return {
      toolData: {
        data: {
          title: "工具箱"
        },
        list:[
            {
                title:' 网络',
                conten:[
                    {
                        content:"Teamviewer - 官网"
                    },
                    {
                        content:' Teamviewer - 腾讯软件中心 | 版本：14.1.3399.0 | 非同步'
                    }
                   
                ]
            },
             {
                title:' 浏览器',
                conten:[
                    {
                        content:"Firefox - 官网"
                    },
                     {
                        content:'Firefox(离线版) - 腾讯软件中心 | 版本：64.0.0.6914 | 非同步'
                    },
                    {
                        content:'Chrome - 腾讯软件中心 | 版本：70.0.3538.102 | 非同步'
                    },
                    {
                        content:'Chrome - 官网'
                    }
                ]
            },
             {
                title:' 编程',
                conten:[
                    {
                        content:"  Notepad++ - 官网 | 版本：7.6 | 非同步"
                    },
                    {
                        content:'（win）JDK 8 32位 - 腾讯软件中心 | 版本：8.0.1910.12 | 非同步'
                    },
                    {
                        content:' JDK 11 - 官网 | 版本：11.0.1 | 非同步'
                    },
                    {
                        content:'Java 64位- 官网'
                    }
                ]
            },
             {
                title:' 聊天',
                conten:[
                    {
                        content:"QQ - 官网 | 版本：9.0.7 | 非同步"
                    },
                    {
                        content:'微信 - 官网  '
                    }
                ]
            }
        ]
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.box {
  padding: 30px;
  box-sizing: border-box;
  .box-content {
    background: #fff;
    padding: 10px;
    .title{
        p{
            padding: 10px 0px 10px 0px;
        }
    }
    .content{
        padding: 20px 0px 20px 0px;
        p{
            padding: 10px 0 10px 0px;
        }
    }
  }
}
</style>
