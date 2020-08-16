import Vue from 'vue'
import base from '@/base'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 自定义全局函数
Vue.use(base)

