<template>
    <div class="page">
         <page-header :data="toolData.data"></page-header>

        
    </div>
</template>
<script>
import pageHeader from "../components/Header";
export default {
    components:{
        pageHeader,
    },
    data(){
        return{
            toolData:{
                data:{
                    title:'工具箱',
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
