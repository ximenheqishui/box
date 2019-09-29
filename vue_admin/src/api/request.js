/**
 * Created by LiLi on 2019/6/21
 * axios 配置
 */
import store from '@/store'
import qs from 'qs'
import { getToken } from '@/utils/auth'
import axios from 'axios'

axios.defaults.timeout = 15000
axios.defaults.baseURL = baseConfig.apiHost

axios.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = getToken()
    }

    if (config.method === 'get') {
      config.paramsSerializer = function (params) {
        return qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  })

export default axios
