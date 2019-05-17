<template>
  <div>
    <el-dialog :title="dtitle" :visible.sync="openstatus" width="350px" @open="resetForm('ruleForm')">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :label-position="'top'">
        <el-form-item label prop="username">
          <el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item v-if="dtitle ==='注册'" prop="querypassword" label>
          <el-input type="password" placeholder="请确认密码" v-model="ruleForm.querypassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :style="{width:'100%'}"
            @click="submitForm('ruleForm')"
          >{{dtitle}}</el-button>
        </el-form-item>
        <el-form-item label>
          <div v-if="dtitle ==='登录'">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-button size="mini" :style="{width:'100%'}" @click=" dtitle = '注册'; resetForm('ruleForm');">注册新账号</el-button>
              </el-col>
              <el-col :span="12">
                <el-button :style="{width:'100%'}" size="mini">忘记密码?</el-button>
              </el-col>
            </el-row>
          </div>
          <el-button v-else type="text" :style="{width:'100%'}" @click="dtitle = '登录';resetForm('ruleForm');">已有账号登录</el-button>
        </el-form-item>
        <el-form-item label="第三方账号登录：">
          <div class="icon">
            <div class="icon-box">
              <img
                data-v-501b78ea
                title="微博"
                alt="微博"
                src="https://b-gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg"
                class="oauth-btn"
              >
            </div>
            <div class="icon-box">
              <img
                data-v-501b78ea
                title="微信"
                alt="微信"
                src="https://b-gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg"
                class="oauth-btn"
              >
            </div>
            <div class="icon-box">
              <img
                data-v-501b78ea
                title="GitHub"
                alt="GitHub"
                src="https://b-gold-cdn.xitu.io/v3/static/img/github.547dd8a.svg"
                class="oauth-btn"
              >
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
  props: {
    isvisible: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.querypassword !== "") {
          this.$refs.ruleForm.validateField("querypassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      openstatus: this.isvisible,
      userMsg:{
        username:'',
        userId:"",
      },
      dtitle: this.title,
      ruleForm: {
        username: "",
        password: "",
        querypassword: ""
      },
      rules: {
        username: [{ required: true,  message: "请输入用户名", trigger: "blur" },
        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: "blur" },
         { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }],
        querypassword: [{ validator: validatePass2, trigger: "blur" },
         { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }]
      },
      userData:{}
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        this.dtitle == '登录' ? this.login() : this.register() ;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     resetForm(formName) {
        this.$nextTick(()=>{
                    this.$refs[formName].resetFields();
          }) 
      },
    login(){
        this.$axios.post(`http://127.0.0.1:7001/frontend/v1/login`,this.ruleForm).then(response => {
        const { status, data, message } = response.data;
        if (status !== 0) return this.$message.error(message);
        this.userData = response.data;
        this.userData.data.isLogin = true;
        this.$emit("transferuserData",  this.userData.data);
        this.openstatus = false;
        this.$store.commit('changeuername',response.data.data.username)
        this.$store.commit('changeuserid',response.data.data.id)
        this.$store.commit('changerole',true)
      });
    },
    register(){
        this.$axios.post(`http://127.0.0.1:7001/frontend/v1/register`,this.ruleForm).then(response => {
        const { status, data, message } = response.data;
        if (status !== 0) return this.$message.error(message);
        this.dtitle = '登录';
        return this.$message.success('注册成功')
      });
    }
  },
  watch: {
    isvisible(val) {
      this.openstatus = val;
    },
    title(val) {
      this.dtitle = val;
    },
    openstatus(val) {
      this.$emit("transferGetStatus", this.openstatus, this.dtitle);
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item:nth-child(4) {
  margin-bottom: 10px;
  font-size: 12px;
}
.icon {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .icon-box {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #f4f8fb;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 1.9rem;
      vertical-align: bottom;
      cursor: pointer;
    }
  }
}
</style>
