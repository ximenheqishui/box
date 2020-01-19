/**
 *@description  网站配置信息
 * */
var baseUrl =  'http://192.168.199.147:3000'
var webSocketUrl = 'wss://medi.xee.link:8282'
var baseConfig = {
  apiHost: baseUrl + '/admin', // 后台接口地址
  commonApiHost: baseUrl + '/api/v1', // 通用接口地址
  systemName: '云调解' // 系统名称
}

/**
 * @description  不要修改
* */
document.title = baseConfig.systemName
