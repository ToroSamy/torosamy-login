<script setup lang="ts">
import { ref } from 'vue'
import LoginPage from './LoginPage.vue';
import RegisterPage from './RegisterPage.vue';


const isRegister = ref(false)
const changeForm = () => {
  isRegister.value = !isRegister.value
}

const dialogVisible = ref(false)

const open = () => {
  dialogVisible.value = true
}
defineExpose({
  open
})

</script>
<template>
  <el-dialog v-model="dialogVisible" class="token-dialog">
      <RegisterPage v-if="isRegister" @close="dialogVisible = false"></RegisterPage>
      <LoginPage v-else @close="dialogVisible = false"></LoginPage>


      <div class="option-group">
        <el-link type="info" :underline="false" @click="changeForm" v-if="!isRegister" class="button-style"> 注册 → </el-link>
        <el-link type="info" :underline="false" @click="changeForm" v-else class="button-style"> 返回 → </el-link>
        <el-link type="info" :underline="false" @click="dialogVisible = false" class="button-style">关闭</el-link>
      </div>

  </el-dialog>
</template>

<style lang="scss" scoped>
.option-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.button-style {
  background-color: #409efc;
  padding: 0.5rem;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
}

</style>

<style lang="scss">
.token-dialog {
  width: 20rem;
  background: url(@/assets/images/form-background.png);
  background-size: 100% 100%;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #0c5bd1;
  border-radius: 10px;
}
</style>