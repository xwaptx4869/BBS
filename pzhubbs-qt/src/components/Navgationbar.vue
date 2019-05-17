<template>
  <div class="navbar">
    <div class="navbar-content">
      <router-link :to="{name:'home'}" class="tohome">
        <img src="../assets/logo.png" alt>
        <h4>Pzhu技术交流社区</h4>
      </router-link>
      <div class="searchbox">
        <el-input v-model="searchValue" suffix-icon="el-icon-search" placeholder="搜索想看的文章"></el-input>
      </div>
      <div class="rightbox">
        <span
          class="write"
          @click=" isLogin ? $router.push({ name:'writearticle' }): setVisible('登录')  "
        >
          <i class="el-icon-tickets"></i> 写文章
        </span>
        <span v-if="!isLogin">
          <a @click="setVisible('登录')" href="javascript:;">登录</a>
          ·
          <a @click="setVisible('注册') " href="javascript:;">注册</a>
        </span>
        <span v-if="isLogin" class="nav-right-action">
          <svg-icon icon-class="bell"/>
        </span>
        <el-dropdown v-if="isLogin" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link nav-right-action">
            <svg-icon icon-class="people"/>
            <span>{{ $store.state.username }}</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="usercenter">个人信息</el-dropdown-item>
            <el-dropdown-item command="writearticle">文章管理</el-dropdown-item>
            <el-dropdown-item command="logout" >退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import svgIcon from "./SvgIcon/index";
export default {
  components: {
    svgIcon
  },
  props: {
    userData: {
    }
  },
  data() {
    return {
      isLogin:this.$store.state.role,
      searchValue: "",
      user: {
        name: "xuwei"
      },
      title: "登录",
      visible: false,
      status: "",
      userId:233,
    };
  },
  computed:{
    logoin(){
      return this.$store.state.role
    }
  },
  watch: {
    visible(val) {
      this.status = val;
    },
    userData(val) {
      this.usermsg = val;
    },
    logoin(news,old){
      this.isLogin = news;
    }
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.logout();
          break;
        default:
          this.$router.push( { name:command,params:{ id: this.userId}});
          break;
      }
    },
    // 前端登出
    logout() {
        this.$store.commit('changerole',false)
         this.$store.commit('changeuserid','')
    },
    setVisible(val) {
      this.visible = true;
      this.$emit("transferGetVisible", this.status, val);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  background: #fff;
  position: fixed;
  top: 0px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 1px 0 rgba(0, 0, 0, 0.05);
  z-index: 99;
  .navbar-content {
    position: absolute;
    left: 50%;
    line-height: 50px;
    transform: translateX(-50%);
    width: 1400px;
    min-width: 1170px;
    .tohome {
      float: left;
      margin-left: 40px;
      h4 {
        color: rgb(92, 225, 230);
        display: inline-block;
      }
      img {
        padding-right: 10px;
        vertical-align: -40%;
        width: 50px;
        height: 50px;
      }
    }
    .searchbox {
      margin-left: 100px;
      display: inline-block;
    }
    .rightbox {
      float: right;
      margin-right: 40px;
      a {
        color: #000;
      }
      .write {
        padding-right: 20px;
        cursor: pointer;
      }
    }
  }
}
@media only screen and (max-width: 1500px) {
  .navbar-content {
    width: 1170px !important;
  }
}
</style>
