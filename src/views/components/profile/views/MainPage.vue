<script setup lang="ts">
import { ref } from 'vue' 
import OicqDialog from '@/components/OicqDialog.vue';
import { useUserStore } from '@/stores';
import { userLogoutService } from '@/apis/user';
import TokenPage from '@/components/token/TokenPage.vue';
import SelfProfile from '@/components/SelfProfile.vue';
const userStore = useUserStore()
const oicqDialogInstance = ref()
const abotUsCommand = () => {
  oicqDialogInstance.value.open()
}

const selfProfileInstance = ref()
const profileCommand = () => {
  if (!userStore.user.token) ElMessage('您尚未登录!')
  else selfProfileInstance.value.open()
}

const logoutCommand = async () => {
  ElMessageBox.confirm('确认退出登录吗', '服务器娘:', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(() => {
    userLogoutService(userStore.user.id)
    userStore.clearUser()
  })
}


const tokenPageInstance = ref()
const loginCommand = () => {
  tokenPageInstance.value.open()
}


</script>




<template>
  <div class="container">
    <div class="title">我的</div>
    
    <div class="card-container">
      <div class="card-item" @click="profileCommand">个人资料</div>
      <!-- <div class="card-item" @click="tempCommand">添加好友</div> -->
    </div>

    <!-- <div class="card-container">
      <div class="card-item">
        <div>消息推送</div>
        <el-switch v-model="messageToggle" @click="tempCommand"/>
      </div>
    </div> -->

    <div class="card-container">
      <div class="card-item" @click="abotUsCommand">关于我们</div>
      <div class="card-item">
        <div>检测更新</div>
        <div style="font-size: 15px; color: gray;">当前版本1.0.0</div>
      </div>
    </div>

    <div class="auth-item" v-if="userStore.user.token" @click="logoutCommand">退出登录</div>
    <div class="auth-item" v-else @click="loginCommand">登录账号</div>

  </div>
  <SelfProfile ref="selfProfileInstance"></SelfProfile>
  <TokenPage ref="tokenPageInstance"></TokenPage>
  <OicqDialog ref="oicqDialogInstance"></OicqDialog>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1vh;
  width: 100vw;
}
.title {
  background-color: #7f9fdf;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 5vw;
  color: white;
  height: 8vh;
  width: 100vw;
}

.card-container {
  background-color: white;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: space-between;
}
.card-item {
  padding: 2vh 5vw;
  display: flex; 
  flex-direction: row; 
  justify-content: space-between;
  align-items: center;
}
.auth-item {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  color: red; 
  background-color: white; 
  width: 100vw;
  padding: 2vh 5vw;
}
</style>
