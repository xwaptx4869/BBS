<template>
  <div class="page">
    <div class="wrapper">
      <navgationbar @transferGetVisible="getVisible" ></navgationbar>
      <div class="content">
        <div class="slider">
          <slider></slider>
        </div>
        <div class="content-box">
          <transition name="move" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
          </transition>
          <div class="footer-box">
            <span>Copyright©2019 PzhuBBS. All Rights Reserved</span>
          </div>
        </div>
        <div class="right-box">
          <side></side>
        </div>
      </div>
      <login :isvisible.sync="visible" :title.sync="title" @transferGetStatus ="getVisible" ></login>
    </div>
  </div>
</template>
<script>
import Navgationbar from "../components/Navgationbar";
import side from "../components/Side";
import slider from "../components/Slider";
import login from "../components/LoginRegist";
export default {
  data(){
    return {
      visible:false,
      title:''
    }
  },
  components: {
    Navgationbar,
    side,
    slider,
    login
  },
  created(){
  
  },
  methods:{
    getVisible(visible,title){
      this.visible = visible;
      this.title = title;
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  z-index: 999;
}
.wrapper {
  width: 100%;
  position: relative;
  height: 100%;
  overflow-y: scroll;
   &::-webkit-scrollbar {
    display: none;
  }
}
.content {
  padding-top: 50px;
  width: 1400px;
  min-width: 1170px;
  box-sizing: border-box;
  background: #f1f3f4;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  .slider {
    float: left;
    height: 100%;
  }
  .content-box {
    width: 960px;
    display: inline-block;
    padding-bottom: 60px;
    .footer-box{
      position: absolute;
      bottom: 0px;
      left: 200px;
      right: 240px;
      border-top: 1px solid #dee5e7;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background-color: #dadada;
      span{
        color: #1c2b36;
        font-size: 12px;
      }
    }
  }
  .right-box {
    width: 240px;
    box-sizing: border-box;
    float: right;
  }
}
  @media only screen and (max-width: 1400px) {
    .content{
      width: 1170px;
      .content-box {
        width:730px ;
    }
    }
    
}
</style>
