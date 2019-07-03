<template>
    <div class="page">
         <page-header :data="userData.data"></page-header>
         <div class="box">
             <div class="content-box">
                 <el-card :body-style="{ padding: '0px' }">
             <div slot="header">
                 <span>个人信息详情</span>
             </div>
             <el-form ref="newsForm" :model="userMsg"  :style="{padding:'30px'}" label-width="180px;" label-position="right">
                 <el-form-item label="用户名："  >
                     <el-input  v-model="userMsg.username"></el-input>
                 </el-form-item>
                  <el-form-item label="头像：">
                     <el-input  v-model="userMsg.poster"></el-input>
                 </el-form-item>
                  <el-form-item label="学院信息：" >
                     <el-input  v-model="userMsg.colleage"></el-input>
                 </el-form-item>
                  <el-form-item label="专业信息：" >
                     <el-input  v-model="userMsg.major"></el-input>
                 </el-form-item>
             </el-form>
         </el-card>
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
    data(){
        return{
            userData:{
                data:{
                    title:'个人中心'
                },
            },
            userMsg:{
                    username:'',
                    poster:'',
                    colleage:'',
                    major:''

                }
        }
    },
    created(){
        this.getUser();
    },
    methods:{
        getUser(){
            this.$axios.get(`http://127.0.0.1:7001/frontend/v1/getuser/${this.$store.state.userId}`).then(response => {
        const { status, data, message } = response.data;
        if (status !== 0) return this.$message.error(message);
        this.userMsg= response.data;
        console.log(this.userMsg)
      });
        }
    }
}
</script>
<style lang="scss" scoped>
.box {
  padding: 20px;
  box-sizing: border-box;
  .box-content {
    background: #fff;
    padding: 10px;
  
  }
}
  .el-form-item {
    margin-bottom: 0px !important;
}
</style>
