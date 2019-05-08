<template>
    <div class="comment-page">
        <div class="comments-content">
            <div class="comments-num"></div>
            <div class="comments-list"></div>
        </div>
        <div class="release-box">
            <div class="nav"></div>
            <div class="comments-release-box">
                <el-form :model="form" ref="form" label-width="80px">
                    <el-form-item label="评论">
                        <el-input  type="textarea" v-model="form.content" rows="4"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" plain >发表评论</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </div>
    </div>    
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>

</style>
