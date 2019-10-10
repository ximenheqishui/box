/**
 * Created by LiLi on 2019/6/21
 * axios 配置
 */
import store from '@/store'
// import qs from 'qs'
import { getToken } from '@/utils/auth'
import axios from 'axios'
import { MessageBox } from 'element-ui'

axios.defaults.timeout = 15000
axios.defaults.baseURL = baseConfig.apiHost

axios.interceptors.request.use(
  config => {
     // if (getToken()) {
     //   config.headers['Admin-Token'] = getToken()
     // }
    // 这个是java用tomcat的时候不接受[] 所以进行了转意
    // if (config.method === 'get') {
    //   config.paramsSerializer = function (params) {
    //     return qs.stringify(params, { arrayFormat: 'repeat' })
    //   }
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  })

axios.interceptors.response.use(
  response => {
    let res = response.data
    if (res.code === 2) {
      MessageBox.confirm('你已经登录超时，保持当前页或者重新登录', '登录超时', {
        confirmButtonText: '重新登录',
        cancelButtonText: '保持当前页',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/fedLogOut').then(() => {
          window.location.reload()
        })
      }).catch(() => {
      })
      return Promise.reject(new Error('loginTimeout'))
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  })

export default axios
