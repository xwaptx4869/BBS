<template>
    <div class="page">
         <page-header :data="msgBoardData.data"></page-header>
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
            msgBoardData:{
                data:{
                    title:'留言板',
                    // mood:'这是我的相册'
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
