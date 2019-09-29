import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import store from '@/store/index.js'

Vue.use(Router)

const router = new Router({
  routes: routes
})
function beforeNext (to, from, next) {
  document.title = to.meta.title
}

// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     beforeNext(to, from, next)
//     next()
//   } else {
//     if (getToken()) {
//       if (store.getters.userInfo.id) {
//         beforeNext(to, from, next)
//         next()
//       } else {
//         store.dispatch('getUserInfo', getToken()).then((res) => {
//           beforeNext(to, from, next)
//           next()
//         }).catch(() => {
//           store.dispatch('fedLogOut').then(() => {
//             Message.error('获取用户信息失败，请重新登录')
//             beforeNext(to, from, next)
//             next({ path: '/login' })
//           })
//         })
//       }
//     } else {
//       beforeNext(to, from, next)
//       next({ path: '/login' })
//     }
//   }
// })

export default router
