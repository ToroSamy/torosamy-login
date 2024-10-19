<script setup lang="ts">
import { ref,onMounted } from 'vue'
import { getEmailCodeService } from '@/apis/captcha'
import { useSecondStore } from '@/stores';
const secondStore = useSecondStore()
onMounted(() => {
  secondStore.checkCountdown() // 页面加载时检查是否需要恢复倒计时
})



const emailRules = {
  code: [
    { required: true, message: '请输入邮箱验证码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{5}$/, message: '该验证码不合法', trigger: 'blur' }
  ]
}

const emailCaptchaModel = ref({
  code: '',
  key: ''
})

const emit = defineEmits(['uploadValue', 'uploadKey', 'checkCondition'])
const props = defineProps<{
  qq: string
}>()

const checkCondition = async () => {
  if (!props.qq || secondStore.isButtonDisabled) {
    ElMessage({ message: '请填写QQ号', type: 'error' })
    return
  }
  emit('checkCondition')
}

const send = async () => {
  const res = await getEmailCodeService(props.qq)
  emailCaptchaModel.value.key = res.data.data
  emit('uploadKey', emailCaptchaModel.value.key)
  ElMessage.success('邮箱验证码发送成功')
  secondStore.reStart()
}

defineExpose({
  send
})

const updateValue = (value: string) => {
  emit('uploadValue', value)
}


</script>

<template>
  <el-form-item prop="emailCode" :rules="emailRules.code" class="box">
    <el-input v-model="emailCaptchaModel.code" @input="updateValue" placeholder="请输入邮箱验证码" class="input" />
          <el-button :disabled="secondStore.isButtonDisabled" @click="checkCondition" class="button" type="primary">
      {{ secondStore.buttonText }}
    </el-button>
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
  width: 70%;
  height: 2.5rem;
  font-size: 0.8rem;
}

.button {
  padding: 0;
  height: 2vw;
  font-size: 0.5rem;
  width: 30%;
  height: 2.5rem;
  cursor: pointer;
}
</style>
