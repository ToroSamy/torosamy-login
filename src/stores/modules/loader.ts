// store/index.js (Pinia 示例)
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: false
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value
    }
  }
})
