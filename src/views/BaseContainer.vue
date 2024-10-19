<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router';
import { Comment, Grid, Avatar, Connection } from '@element-plus/icons-vue'


const tempCommand = () => {
  ElMessage('该功能开发当中')
}

const profileCommand = () => {
  router.push('/profile')
}


</script>



<template>
    <el-container style="height: 100vh;">
      <el-main><router-view></router-view></el-main>
      <el-footer> 
        <div class="button-box" @click="tempCommand">
          <el-icon>
            <Connection />
          </el-icon>
          测试
        </div>
        <div class="button-box" @click="tempCommand">
          <el-icon>
            <Connection />
          </el-icon>
          测试
        </div>  
        <div class="button-box" @click="tempCommand">
          <el-icon>
            <Connection />
          </el-icon>
          测试
        </div>  
        <div class="button-box" @click="profileCommand">
          <el-icon>
            <Connection />
          </el-icon>
          我的
        </div>  
      </el-footer>
    </el-container>

</template>

<style scoped lang="scss">
.el-main {
  padding: 0;
}
.el-footer {
  background-color: #7f9fdf;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: white;
  height: 8vh;
}

.button-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

</style>
