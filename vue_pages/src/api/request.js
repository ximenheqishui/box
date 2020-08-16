/**
 * Created by LiLi on 2019/6/21
 * axios 配置
 */
import {getToken} from '@/utils/auth'
import axios from 'axios'
import {MessageBox} from 'element-ui'

axios.defaults.timeout = 15000
axios.defaults.baseURL = baseConfig.apiHost

axios.interceptors.request.use(
    config => {
        if (getToken()) {
            config.headers['Admin-Token'] = getToken()
        }
        return config
    },
    error => {
        return Promise.reject(error)
    })

axios.interceptors.response.use(
    response => {
        let res = response.data
        return res
    },
    error => {
        return Promise.reject(error)
    })

export default axios
