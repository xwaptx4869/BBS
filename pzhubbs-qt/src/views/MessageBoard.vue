<template>
  <div class="page">
    <page-header :data="msgBoardData.data"></page-header>
    <div class="box">
    <comment :commentdata="data" @transfercomment="getcomments" :type="'2'"></comment>
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
      data:[] ,
    };
  },
  created(){
    this.getcomments();
  },
  methods:{
    getcomments(){
      this.$axios.post('http://127.0.0.1:7001/frontend/v1/comment',{type:'2',connect_id:this.$store.state.userId}).then(response => {
				const {status, data, message} = response.data
				if(status !== 0) return this.$message.error(status);
				this.data = data
			})
    }
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
