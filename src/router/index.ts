import { createRouter, createWebHistory } from 'vue-router'
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}
function getDeviceType() {
  if (isMobileDevice()) {
    return 'mobile';
  } else {
    return 'desktop';
  }
}



import BaseContainer from '@/views/BaseContainer.vue'
import ProfilePage from '@/views/components/profile/views/MainPage.vue'
import RefusePage from '@/views/RefusePage.vue'


// import IndexPage from '@/views/components/other/main/views/MainPage.vue'
// import NotePage from '@/views/components/other/note/views/MainPage.vue'
// import MessagePage from '@/views/components/other/message/views/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/refuse', component: RefusePage },
    {
      path: '/', component: BaseContainer,
      redirect: '/profile',
      children: [
        // { path: '/base', component: IndexPage },
        // { path: '/note', component: NotePage },
        // { path: '/message', component: MessagePage },
        { path: '/profile', component: ProfilePage }
      ]
    },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.path === '/refuse') {
    if (getDeviceType() === 'mobile') next('/')
    else next()
  } else if (getDeviceType() === 'mobile') {
    next() // 允许访问其他移动设备路由
  } else {
    next('/refuse') // 否则重定向到 refuse
  }
})
export default router
