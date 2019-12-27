import { setToken, removeToken, getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import router from '@/router/index.js'
import api from '@/api/index.js'
const user = {
  namespaced: true,
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
      return new Promise((resolve, reject) => {
        api.login(userInfo).then(res => {
          if (res.code === 0) {
            try {
              commit('setToken', res.data.token)
              setToken(res.data.token)
              router.push('/')
            } catch (e) {
              console.log(e)
            }
          } else {
            reject(res)
            Message({
              message: res.message,
              type: 'warning'
            })
          }
        }).catch(error => { // 状态码非2xx时
          reject(error)
          Message({
            message: error.message || '登录失败',
            type: 'error',
            duration: 5 * 1000
          })
        })
      })
    },
    // 获取用户信息
    getUserInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.getUserInfo().then(res => {
          if (res.code === 0) {
            commit('setUserInfo', res.data)
            commit('setToken', getToken())
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
    logOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        api.logout(state.token).then(() => {
          commit('setToken', '')
          removeToken()
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
