import axios from './request'
export default {

  commonURL: {
      uploadUrl: baseUrl + '/common/upload/single'
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
  getUsableMenu: function (data) {
    return axios({
      url: '/menu/usable',
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
      data: { id: data.id + '' }
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
  getRoleAll: function (data) {
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
      data: { id: data.id + '' }
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
      method: 'post',
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
  getUsableDepartment: function (data) {
    return axios({
      url: '/sys/permission/getUsableDeptTree',
      method: 'get',
      params: data
    })
  },
  addDepartment: function (data) {
    return axios({
      url: 'department',
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
      url: `/department`,
      method: 'DELETE',
      data: { id: data.id + '' }
    })
  },
  /**
   * @description 用户相关的接口
   * */
  getDepartmentUser (data) {
    return axios({
      url: '/user/department',
      method: 'get',
      params: data
    })
  },
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
  }
}
