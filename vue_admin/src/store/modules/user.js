import { setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
import router from '@/router/index.js'
import api from '@/api/index.js'
const user = {
  state: {
    userInfo: {},
    token: ''
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
    },
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },
  actions: {
    // 用户名登录
    login ({ dispatch, commit }, userInfo) {
      api.login(userInfo).then(res => {
        if (res.data.code === 0) {
          commit('setToken', res.data.token)
          setToken(res.data.token)
          router.push('/')
        } else {
          Message({
            message: res.data.message,
            type: 'warning'
          })
        }
      }).catch(error => { // 状态码非2xx时
        console.log(error)
        Message({
          message: '登录失败',
          type: 'error',
          duration: 5 * 1000
        })
      })
    },
    // 获取用户信息
    getUserInfo ({ commit, state }, token) {
      return new Promise((resolve, reject) => {
        api.getUserInfo(token).then(res => {
          if (res.data.code === 0) {
            commit('setUserInfo', res.data.userInfo)
            resolve(res)
          } else {
            reject(res)
          }
        }).catch(error => { // 状态码非2xx时
          reject(error)
        })
      })
    },
    // 登出
    logOut ({ commit, dispatch, state }) {
      return new Promise((resolve, reject) => {
        api.logout(state.token).then(() => {
          commit('setToken', '')
          commit('setUserInfo', {})
          dispatch('tagsView/delAllViews')
          removeToken()
          router.push('/login')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 前端 登出
    fedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('setToken', '')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
