import axios from './request'
export default {

  commonURL: {
      uploadUrl: baseConfig.apiHost + '/upload',
      exportUrl: baseUrl + '/admin/excelExport'
  },
  /**
   * @description 获取各个页面的配置项
   * */
  getOption: function (data) {
    return axios({
      url: '/dictionaries',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 用户信息相关
   * */
  // 登录
  login: function (data) {
    return axios({
      url: '/login',
      method: 'post',
      data
    })
  },
  // 登出
  logout: function (token) {
    return axios({
      url: '/logout',
      method: 'get',
      params: { token: token }
    })
  },
  // 获取用户信息
  getUserInfo: function () {
    return axios({
      url: '/userInfo',
      method: 'get'
    })
  },
  /**
   * @description  菜单相关
   * */
  getMenu: function (data) {
    return axios({
      url: '/menu',
      method: 'get',
      params: data
    })
  },
  addMenu: function (data) {
    return axios({
      url: '/menu',
      method: 'post',
      data: data
    })
  },
  updateMenu: function (data) {
    return axios({
      url: '/menu',
      method: 'PUT',
      data: data
    })
  },
  delMenu: function (data) {
    return axios({
      url: '/menu',
      method: 'DELETE',
      data: data
    })
  },
  /**
   * @description  角色相关
   * */
  getRole: function (data) {
    return axios({
      url: '/role',
      method: 'get',
      params: data
    })
  },
  addRole: function (data) {
    return axios({
      url: '/role',
      method: 'post',
      data: data
    })
  },
  updateRole: function (data) {
    return axios({
      url: '/role',
      method: 'PUT',
      data: data
    })
  },
  delRole: function (data) {
    return axios({
      url: '/role',
      method: 'DELETE',
      data: data
    })
  },
  /**
   * @description  角色权限相关
   * */
  getRoleMenu: function (data) {
    return axios({
      url: '/role/menu',
      method: 'get',
      params: data
    })
  },
  updateRoleMenu: function (data) {
    return axios({
      url: '/role/menu',
      method: 'put',
      data: data
    })
  },
  /**
   * @description 部门相关
   * */
  getDepartment: function (data) {
    return axios({
      url: '/department',
      method: 'get',
      params: data
    })
  },
  getDepartmentLeader: function (data) {
    return axios({
      url: '/department/leader',
      method: 'get',
      params: data
    })
  },
  addDepartment: function (data) {
    return axios({
      url: '/department',
      method: 'post',
      data
    })
  },
  updateDepartment: function (data) {
    return axios({
      url: '/department',
      method: 'PUT',
      data: data
    })
  },
  delDepartment: function (data) {
    return axios({
      url: '/department',
      method: 'DELETE',
      data: data
    })
  },
  /**
   * @description 用户相关
   * */
  getUser: function (data) {
    return axios({
      url: '/user',
      method: 'get',
      params: data
    })
  },
  addUser: function (data) {
    return axios({
      url: '/user',
      method: 'post',
      data: data
    })
  },
  // 修改用户信息 不传用户其他用户信息时修改当前用户的密码
  updateUser: function (data) {
    return axios({
      url: '/user',
      method: 'PUT',
      data: data
    })
  },
  delUser: function (data) {
    return axios({
      url: `/user`,
      method: 'DELETE',
      data: { id: data.id + '' }
    })
  },
  /**
   * @description 文章分类相关
   * */
  getArticleType: function (data) {
    return axios({
      url: '/articleType',
      method: 'get',
      params: data
    })
  },
  addArticleType: function (data) {
    return axios({
      url: '/articleType',
      method: 'post',
      data
    })
  },
  updateArticleType: function (data) {
    return axios({
      url: '/articleType',
      method: 'PUT',
      data: data
    })
  },
  delArticleType: function (data) {
    return axios({
      url: '/articleType',
      method: 'DELETE',
      data: data
    })
  },

  /**
   * @description 文章
   * */
  getArticle: function (data) {
    return axios({
      url: '/article',
      method: 'get',
      params: data
    })
  },
  addArticle: function (data) {
    return axios({
      url: '/article',
      method: 'post',
      data
    })
  },
  updateArticle: function (data) {
    return axios({
      url: '/article',
      method: 'PUT',
      data: data
    })
  },
  delArticle: function (data) {
    return axios({
      url: '/article',
      method: 'DELETE',
      data: { id: data.id + '' }
    })
  },

  // 测试用的数据
  sendMessage: function (data) {
    return axios({
      url: baseUrl + '/port/events/onMessage',
      method: 'get',
      params: data
    })
  },
  // 测试用的数据
  bindId: function (data) {
    return axios({
      url: baseUrl + '/port/events/bind',
      method: 'get',
      params: data
    })
  },
  // 测试用的数据
  loadAll: function (data) {
    return axios({
      url: baseUrl + '/port/events/load',
      method: 'get',
      params: data
    })
  }
}
