<template>
  <div class="slider">
    <!-- <div v-if="!isLogin"  class="fastregister">
       <div class="title">
           Pzhu交流社区，一个所有开发者共同成长的社区
       </div>
       <el-form v-model="formData">
           <el-form-item >
               <el-input v-model="formData.username" placeholder="用户名"/>
           </el-form-item>
            <el-form-item>
               <el-input v-model="formData.password" placeholder="密码："/>
           </el-form-item>
            <el-form-item>
               <el-input v-model="formData.requiredpassword" placeholder="确认密码"/>
           </el-form-item>
            <el-form-item>
               <el-button plain type="primary">快速注册</el-button>
           </el-form-item>
       </el-form>
    </div>-->

    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#1c2b36"
      text-color="#fff"
      active-text-color="#fff"
    >
      <div class="nav head">导航</div>
      <el-menu-item index="1" @click="$router.push( { name:'home'})">
        <i class="el-icon-tickets"></i>
        <span slot="title">首页</span>
        
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">相册</span>
        
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">留言板</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-phone"></i>
        <span slot="title">反馈</span>
      </el-menu-item>
    </el-menu>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#1c2b36"
      text-color="#fff"
      active-text-color="#fff"
    >
      <div class="form head">组成</div>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-more-outline"></i>
          <span>分类</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
          <template slot="title">
        <i class="el-icon-news"></i>
        <span slot="title">页面</span>
        </template>
         <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
          <template slot="title">
        <i class="el-icon-share"></i>
        <span slot="title">友链</span>
          </template>
           <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import svgIcon from "./SvgIcon/index";
export default {
  components: {
    svgIcon
  },
  data() {
    return {
      searchValue: "",
      isLogin: false,
      user: {
        name: "xuwei"
      },
      formData: {
        username: "",
        password: "",
        requiredpassword: ""
      }
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.slider {
  width: 200px;
  height: 100%;
  box-sizing: border-box;
  background: rgb(28, 43, 54);
  color: #fff;
  &::before{
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: -1;
    width: inherit;
    background-color: inherit;
    border: 0;
    content: "";
  }
  .head {
    padding-left: 10px;
    margin-top: 20px;
    font-size: 12px;
    color: #888;
  }
  .el-menu{
      border-right:0px;
  }
  .el-menu-vertical-demo {
    border-bottom: #32374a 1px solid;
  }
  .el-submenu .el-menu-item {
    min-width: 0px;
  }
}
</style>
