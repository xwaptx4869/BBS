<template>
    <div class="page">
         <page-header :data="photoData.data"></page-header>
    </div>
</template>
<script>
import pageHeader from "../components/Header";
import comment from "../components/CommentManage";
export default {
    components:{
        pageHeader,
        comment
    },
    data(){
        return{
            photoData:{
                data:{
                    title:'相册'
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
