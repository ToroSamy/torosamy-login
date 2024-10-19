import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'forum-user',
  () => {
    const user = ref({
      id: 0,
      username: '',
      qq: '',
      token: ''
    })
    const setUser = (obj: any) => {
      user.value = obj
    }
    const clearUser = () => {
      user.value.id = 0
      user.value.username = ''
      user.value.qq = ''
      user.value.token = ''
    }

    return {
      user,
      setUser,
      clearUser
    }
  },
  {
    persist: true
  }
)
