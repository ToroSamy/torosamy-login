<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
const dialogVisible = ref(false)

const open = () => {
  dialogVisible.value = true
}
defineExpose({
  open
})

</script>
<template>
  <el-dialog v-model="dialogVisible" class="profile-dialog">
    <div class="profile-form">

      <div class="item">
        <div class="item-title">用户名</div>
        <div class="item-group">
          <el-input v-model="userStore.user.username" disabled class="item-input"></el-input>
        </div>
      </div>

      <div class="item">
        <div class="item-title">QQ号</div>
        <div class="item-group">
          <el-input v-model="userStore.user.qq" class="item-input" disabled></el-input>
        </div>
      </div>


      <div class="item">
        <div class="item-title">密码</div>
        <div class="item-group">
          <el-input placeholder="*********" class="item-input" disabled></el-input>
        </div>
      </div>


    </div>
    

  </el-dialog>
</template>

<style lang="scss" scoped>
.profile-form {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
}

.item {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.item-title {
  font-size: 0.8rem;
  font-weight: bold;
  color: white;
}

.item-group {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>

<style lang="scss">
.profile-dialog {
  width: 20rem;
  background: url(@/assets/images/form-background.png);
  background-size: 100% 100%;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vw;
  border: 1px solid #0c5bd1;
  border-radius: 10px;
}
</style>