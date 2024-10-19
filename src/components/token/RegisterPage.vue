<script lang="ts" setup>
import { User, Lock, Postcard } from '@element-plus/icons-vue'
import { userRegisterService } from '@/apis/user'
import { checkEmailCodeService, checkCaptchaService } from '@/apis/captcha'
import { ref } from 'vue'
import ImgCaptcha from '../../components/ImgCaptcha.vue'
import EmailCaptcha from '../../components/EmailCaptcha.vue'
const emit = defineEmits(['close'])

const getImgKey = (key: string) => {
  model.value.imgKey = key
}
const getImgCode = (code: string) => {
  model.value.imgCode = code
}


const getEmailKey = (key: string) => {
  model.value.emailKey = key
}
const getEmailCode = (code: string) => {
  model.value.emailCode = code
}

const emailRef = ref()
const checkEmailCondition = async () => {
  await checkCaptchaService(model.value.imgKey, model.value.imgCode)
  emailRef.value.send()
}

const register = async () => {
  await formRef.value.validate()
  await checkEmailCodeService(model.value.emailKey, model.value.emailCode)
  await userRegisterService(model.value)
  ElMessage.success('注册成功')
  emit('close')
}

const formRef = ref()
const model = ref({
  username: '',
  qq: '',
  imgCode: '',
  imgKey: '',
  password: '',
  repassword: '',
  emailCode: '',
  emailKey: ''
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { pattern: /^\w{3,16}$/, message: '要求:3~16 位且内容包含数字,英文字母,下划线 例:Test_name12138', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^(?!.*[\u4e00-\u9fa5])\S{3,16}$/, message: '要求:3~16 位非汉字非空字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== model.value.repassword) callback(new Error('输入的密码不一致'))
        else callback()
      }
    }
  ],
  qq: [
    { required: true, message: '请输入QQ号', trigger: 'blur' },
    { pattern: /^[1-9][0-9]{4,11}$/, message: '该QQ账号不合法', trigger: 'blur' }
  ]
}
</script>

<template>
    <div style="color: white; font-family: 'Comic Sans MS'; font-size: 2rem; text-align: center; padding: 1rem;">Register</div>
  <el-form :model="model" :rules="rules" ref="formRef" size="large" autocomplete="off">
    <el-form-item prop="username">
      <el-input v-model="model.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="qq">
      <el-input v-model="model.qq" :prefix-icon="Postcard" placeholder="请输入您的QQ号"></el-input>
    </el-form-item>

    <ImgCaptcha @upload-key="getImgKey" @upload-value="getImgCode" />

    <EmailCaptcha @upload-key="getEmailKey" @upload-value="getEmailCode" @check-condition="checkEmailCondition"
      :qq="model.qq" ref="emailRef" />

    <el-form-item prop="password">
      <el-input v-model="model.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="repassword">
      <el-input v-model="model.repassword" :prefix-icon="Lock" type="password" placeholder="请输入再次密码"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button @click="register" class="button" style="width: 100%" type="primary" auto-insert-space>
        注册
      </el-button>
    </el-form-item>
  </el-form>
</template>
