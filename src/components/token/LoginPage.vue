<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { checkCaptchaService } from '@/apis/captcha'
import { userLoginService } from '@/apis/user'
import { User, Lock } from '@element-plus/icons-vue'
import ImgCaptcha from '../../components/ImgCaptcha.vue'
import router from '@/router'
const formRef = ref()
const userStore = useUserStore()
const getImgKey = (key: string) => {
  loginModel.value.imgKey = key
}

const getImgCode = (code: string) => {
  loginModel.value.imgCode = code
}

const loginModel = ref({
  username: '',
  password: '',
  imgCode: '',
  imgKey: ''
})

const emit = defineEmits(['close'])

const login = async () => {

  await formRef.value.validate()
  await checkCaptchaService(loginModel.value.imgKey, loginModel.value.imgCode)
  const res = await userLoginService(loginModel.value)

  userStore.setUser(res.data.data)
  ElMessage.success('登录成功')
  emit('close')
}
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^\w{3,16}$/, message: '要求:3~16 位且内容包含数字,英文字母,下划线 例:Test_name12138', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^(?!.*[\u4e00-\u9fa5])\S{3,16}$/, message: '要求:3~16 位非汉字非空字符', trigger: 'blur' }
  ]
}
</script>


<template>
  <div style="color: white; font-family: 'Comic Sans MS'; font-size: 2rem; text-align: center; padding: 1rem;">Login</div>
  <el-form :model="loginModel" :rules="rules" ref="formRef" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginModel.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
    </el-form-item>

    <el-form-item prop="password">
      <el-input v-model="loginModel.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>

    <ImgCaptcha @upload-key="getImgKey" @upload-value="getImgCode" />
  </el-form>

  <el-button @click="login" style="width: 100%;height: 2.5rem; margin-bottom: 1rem;" type="primary"
    auto-insert-space>登录</el-button>

</template>
<style lang="scss"></style>
