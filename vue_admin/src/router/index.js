import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store/index.js'

Vue.use(Router)

const router = new Router({
  routes: routes
})

function beforeNext (to, from, next) {
  document.title = to.meta.title
}

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    beforeNext(to, from, next)
    next()
  } else {
    if (getToken()) {
      if (store.getters.userInfo.id) {
        beforeNext(to, from, next)
        if (to.meta.unique_id && store.getters.userInfo.permission.indexOf(to.meta.unique_id) === -1) {
          next({ path: '/403' })
        } else {
          next()
        }
      } else {
        store.dispatch('user/getUserInfo').then((res) => {
          beforeNext(to, from, next)
          if (to.meta.unique_id && store.getters.userInfo.permission.indexOf(to.meta.unique_id) === -1) {
            next({ path: '/403' })
          } else {
            next()
          }
        }).catch((error) => {
          store.dispatch('user/fedLogOut').then(() => {
            if (error.message === 'loginTimeout') {
              Message.error('登录超时，请重新登录')
            } else {
              Message.error('获取用户信息失败，请重新登录')
            }
            beforeNext(to, from, next)
            next({ path: '/login' })
          })
        })
      }
    } else {
      beforeNext(to, from, next)
      next({ path: '/login' })
    }
  }
})

router.afterEach((to, from) => {
  // 刷页面 Number 类型的参数会转变为string类型
  // 这种方式是页面刷新用的
  // 页面跳转刷新的需要在每个页面的active中处理，实现方式不同差距很大的
  if (to.path === '/refresh') {
    store.dispatch('tagsView/delCachedView', from).then(() => {
      router.replace(from)
    })
  }
})

export default router
