<template>
    <div class="page">
         <page-header :data="userData.data"></page-header>
         
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
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
