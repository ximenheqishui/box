import Vue from 'vue'
import base from './base'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/index.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 自定义全局函数
Vue.use(base, router, store)

new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
  }
}).$mount('#app')
