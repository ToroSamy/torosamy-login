import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

import { useUserStore } from './modules/user'
export { useUserStore }

import { useLoadingStore } from './modules/loader'
export { useLoadingStore }

import { useSecondStore } from './modules/second'
export { useSecondStore }