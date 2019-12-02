import api from '@/api/index.js'
import qs from 'qs'
export default {
  install: function (Vue, router, store) {
    // 添加全局资源
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
      }
    })
    // 注入组件 全局混淆
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })
    /**
     * @description  注册函数
     * */
    // 例子 this.dateFmt('yyyy-MM-dd hh:mm:ss', new Date())
    Vue.prototype.dateFmt = function (fmt, date) {
      function formatDate (val) {
        return val > 9 ? val : '0' + val
      }
      let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'Y+': date.getFullYear(),
        'S': date.getMilliseconds(),
        'MA+': formatDate(date.getMonth() + 1),
        'dA+': formatDate(date.getDate()),
        'hA+': formatDate(date.getHours()),
        'mA+': formatDate(date.getMinutes()),
        'sA+': formatDate(date.getSeconds()),
        'qA+': Math.floor((date.getMonth() + 3) / 3),
        'YA+': date.getFullYear(),
        'SA': date.getMilliseconds()
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
    Vue.prototype.api = api
    Vue.prototype.qs = qs
  }
}
