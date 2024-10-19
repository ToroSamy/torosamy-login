<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCaptchaService } from '@/apis/captcha'

onMounted(() => {
  changeImg()
})

const emit = defineEmits(['uploadValue', 'uploadKey'])

const imgCaptchaModel = ref({
  base64: '',
  code: '',
  key: ''
})

const changeImg = async () => {
  const res = await getCaptchaService()
  const [tempKey, tempBase64] = res.data.data.split(':')

  imgCaptchaModel.value.base64 = 'data:image/jpeg;base64,' + tempBase64
  imgCaptchaModel.value.key = tempKey

  emit('uploadKey', imgCaptchaModel.value.key) // 传递新的值
}

const updateValue = (value: string) => {
  emit('uploadValue', value)
}

const rules = {
  code: [
    { required: true, message: '请输入图形验证码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{5}$/, message: '该验证码不合法', trigger: 'blur' }
  ]
}
</script>


<template>
  <el-form-item prop="imgCode" :rules="rules.code" class="box">
    <el-input v-model="imgCaptchaModel.code" @input="updateValue" placeholder="请输入图形验证码" class="input"></el-input>
    <img :src="imgCaptchaModel.base64" @click="changeImg" class="captcha-img" />
  </el-form-item>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
}

.input {
  font-size: 0.8rem;
  width: 70%;
  height: 2.5rem;
}

.captcha-img {
  width: 30%;
  height: 2.5rem;
  cursor: pointer;
}
</style>
