import axios from 'axios'
import { useUserStore } from '@/stores/modules/user'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000 // 检测多长时间没有回应会超时
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.user.token) {
      config.headers.token = userStore.user.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 1) return res
    if (res.data.code === -1) {
      const userStore = useUserStore()
      if (userStore.user.token) ElMessage({ message: '登录失效', type: 'error' })
      else ElMessage({ message: '尚未登录', type: 'error' })
      userStore.clearUser()
      return Promise.reject(res.data)
    }
    ElMessage({ message: res.data.msg || '服务异常', type: 'error' })
    return Promise.reject(res.data)
  },
  (err) => {
    ElMessage({ message: err.response.data.msg || '服务异常', type: 'error' })
    return Promise.reject(err)
  }
)

export default instance