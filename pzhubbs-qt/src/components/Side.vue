<template>
    <div class="aside">
       <div class="title">
           标签云
       </div>
       <el-tag
        v-for="(tag,index) in tags"
        :key="index"
        :type="tag.type">
        {{tag.name}}
        </el-tag>
    </div>
</template>
<script>
export default {
    data (){
        return{
             tags: [
          { name: '前端', type: '' },
          { name: '后台', type: 'success' },
          { name: 'vue', type: 'info' },
          { name: 'react', type: 'warning' },
          { name: 'anglur', type: 'danger' },
           { name: '前端', type: '' },
          { name: '后台', type: 'success' },
          { name: 'vue', type: 'info' },
          { name: 'react', type: 'warning' },
          { name: 'anglur', type: 'danger' },
           { name: '前端', type: '' },
          { name: '后台', type: 'success' },
          { name: 'vue', type: 'info' },
          { name: 'react', type: 'warning' },
          { name: 'anglur', type: 'danger'},
           { name: '前端', type: '' },
          { name: '后台', type: 'success' },
          { name: 'vue', type: 'info' },
          { name: 'react', type: 'warning' },
          { name: 'anglur', type: 'danger' }
        ]
        }
    }
    
}
</script>
<style lang="scss" scoped>
.aside{
    color: #000;
    width: 100%;
    .title{
      height: 50px;
      line-height: 50px;
      font-size: 20px;  
      text-align: center;
    }
    .el-tag{
          margin: 0 10px 10px 10px;
          cursor: pointer;
      }
}
</style>

