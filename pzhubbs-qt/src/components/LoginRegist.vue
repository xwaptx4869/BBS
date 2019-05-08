<template>
	<div>
        <el-dialog
            :title="dtitle"
            :visible.sync="openstatus"
            width="350px">
            <el-form :model="form" ref="form" :label-position="'top'" >
                <el-form-item label="">
                    <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input placeholder="请输入密码" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item v-if="dtitle ==='注册'" label="">
                    <el-input placeholder="请确认密码" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :style="{width:'100%'}" >{{dtitle}}</el-button>
                </el-form-item>
                <el-form-item label="">
                   
                    <div v-if="dtitle ==='登录'">
                         <el-row :gutter="20">
                        <el-col :span="12">
                     <el-button   size="mini" :style="{width:'100%'}" @click=" dtitle = '注册' "  >注册新账号</el-button>
                        </el-col>
                        <el-col :span="12">
                     <el-button :style="{width:'100%'}"  size="mini"  >忘记密码?</el-button>
                        </el-col>
                    </el-row>
                    </div>
                    <el-button v-else type="text" :style="{width:'100%'}" @click="dtitle = '登录'" >已有账号登录</el-button>
                </el-form-item>
                <el-form-item label="第三方账号登录：" >
                   <div class="icon">
                        <div class="icon-box" >
                       <img data-v-501b78ea="" title="微博" alt="微博" src="https://b-gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg" class="oauth-btn">
                    </div>
                    <div class="icon-box" >
                        <img data-v-501b78ea="" title="微信" alt="微信" src="https://b-gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg" class="oauth-btn">
                    </div>
                    <div class="icon-box" >
                        <img data-v-501b78ea="" title="GitHub" alt="GitHub" src="https://b-gold-cdn.xitu.io/v3/static/img/github.547dd8a.svg" class="oauth-btn">
                    </div>
                   </div>
                </el-form-item>
            </el-form>
            
        </el-dialog>
        
    </div>
</template>
<script>
export default {
    props:{
        isvisible:{
            type:Boolean
        },
        title:{
            type:String
        }
    },
    data(){
        return{
            openstatus:this.isvisible,
            dtitle:this.title,
            form:{
                username:'',
                password:'',
                querypassword:''
            }
        }
    },
    methods:{

    },
    watch:{
        isvisible(val){
            this.openstatus = val;
        },
        title(val){
            this.dtitle = val;
        },
        openstatus(val){
            this.$emit('transferGetStatus',this.openstatus,this.dtitle)
        }
        
    }
};
</script>
<style lang="scss" scoped>
.el-form-item:nth-child(4){
    margin-bottom: 10px;
    font-size: 12px;
}
.icon{
    display: flex;
    align-items: center;
    justify-content: space-around;
    .icon-box{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #f4f8fb;
    display: flex;
    align-items: center;
    justify-content: center;
    img{
    height: 1.9rem;
    vertical-align: bottom;
    cursor: pointer;
    }
}
}
</style>
