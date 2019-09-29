import axios from './request'
export default {
  /**
   * @description 获取各个页面的配置项
   * */
  getOption: function (data) {
    return axios({
      url: '/sys/dict/getDictConstant',
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
  getUserInfo: function (token) {
    return axios({
      url: '/userInfo',
      method: 'get',
      params: { token: token }
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
      url: '/sys/permission/getUsableMenuTree',
      method: 'get',
      params: data
    })
  },
  addMenu: function (data) {
    return axios({
      url: '/menu',
      method: 'post',
      data
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
      url: `/menu/${data.id}`,
      method: 'DELETE'
    })
  },
  /**
   * @description  角色相关
   * */
  getRole: function (data) {
    return axios({
      url: '/sys/role/getByPage',
      method: 'get',
      params: data
    })
  },
  getRoleAll: function (data) {
    return axios({
      url: '/sys/role/getByPage',
      method: 'get',
      params: data
    })
  },
  addRole: function (data) {
    return axios({
      url: '/sys/role/save',
      method: 'post',
      data
    })
  },
  updateRole: function (data) {
    return axios({
      url: '/sys/role/update',
      method: 'PUT',
      data: data
    })
  },
  delRole: function (data) {
    return axios({
      url: `/sys/role/delByIds/${data.id}`,
      method: 'DELETE'
    })
  },
  /**
   * @description  角色权限相关
   * */
  getRoleMenu: function (data) {
    return axios({
      url: '/sys/role/getPermission',
      method: 'get',
      params: data
    })
  },
  updateRoleMenu: function (data) {
    return axios({
      url: '/sys/role/savePermission',
      method: 'post',
      data: data
    })
  },
  /**
   * @description 部门相关
   * */
  getDepartment: function (data) {
    return axios({
      url: '/sys/department/getDeptTree',
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
      url: '/sys/department/save',
      method: 'post',
      data
    })
  },
  updateDepartment: function (data) {
    return axios({
      url: '/sys/department/update',
      method: 'PUT',
      data: data
    })
  },
  delDepartment: function (data) {
    return axios({
      url: `/sys/department/delByIds/${data.id}`,
      method: 'DELETE'
    })
  },
  /**
   * @description 用户相关的接口
   * */
  getDepartmentUser (data) {
    return axios({
      url: '/sys/user/getDepartmentUser',
      method: 'get',
      params: data
    })
  },
  getUser: function (data) {
    return axios({
      url: '/sys/user/admin/getByCondition',
      method: 'get',
      params: data
    })
  },
  addUser: function (data) {
    return axios({
      url: '/sys/user/admin/save',
      method: 'post',
      data
    })
  },
  updateUser: function (data) {
    return axios({
      url: '/sys/user/admin/update',
      method: 'PUT',
      data: data
    })
  },
  delUser: function (data) {
    return axios({
      url: `/sys/user/admin/delByIds/${data.id}`,
      method: 'DELETE'
    })
  }
}
