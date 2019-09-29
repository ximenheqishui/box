import axios from './request'
export default {
  // 所有页面的导出连接
  exportUrl: {
    collection: baseConfig.apiHost + '/refuelingRecord/queryByCondition/export', // 实时数据
    company: baseConfig.apiHost + '/company/queryByCondition/export', // 公司列表
    tanker: baseConfig.apiHost + '/tanker/queryByCondition/export', // 加油站列表
    tankerM: baseConfig.apiHost + '/tanker/import/template', // 模板导出
    tankerImport: baseConfig.apiHost + '/tanker/import', // 加油机数据导入
    equipment: baseConfig.apiHost + '/tankerAlert/queryByCondition/export', // 设备预警列表
    youPinT: baseConfig.apiHost + '/report3/queryByCondition/export', // 按油品统计
    stationT: baseConfig.apiHost + '/report2/queryByCondition/export', // 按油品统计
    areaT: baseConfig.apiHost + '/report1/queryByCondition/export' // 按油品统计
  },
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
   * @description 实时收集信息
   * */
  getCollection: function (data) {
    return axios({
      url: '/refuelingRecord/queryByCondition',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 获取区域信息
   * */
  getAreaTree: function (data) {
    return axios({
      url: '/area/getAreaTree',
      method: 'get',
      params: data
    })
  },

  /**
   * @description 获取所有企业名称
   * */
  getStation: function (data) {
    return axios({
      url: '/company/getAllCompany',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 获取企业名称
   * */
  getCompany: function (data) {
    return axios({
      url: '/company/queryByCondition',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 添加企业名称
   * */
  addCompany: function (data) {
    return axios({
      url: '/company/save',
      method: 'post',
      data
    })
  },
  /**
   * @description 更新企业名称
   * */
  updateCompany: function (data) {
    return axios({
      url: '/company/update',
      method: 'PUT',
      data: data
    })
  },
  /**
   * @description 删除企业名称
   * */
  delCompany: function (data) {
    return axios({
      url: `/company/delByIds/${data.id}`,
      method: 'DELETE'
    })
  },
  /**
   * @description 获取加油站数据
   * */
  getTanker: function (data) {
    return axios({
      url: '/tanker/queryByCondition',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 获取油品
   * */
  getTankerType: function (data) {
    return axios({
      url: '/tanker/queryRefuelingType',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 获取设备告警
   * */
  getEquipment: function (data) {
    return axios({
      url: '/tankerAlert/queryByCondition',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 按油品统计
   * */
  getYouPinT: function (data) {
    return axios({
      url: '/report3/queryByCondition',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 按加油站统计
   * */
  getStationT: function (data) {
    return axios({
      url: '/report2/queryByCondition',
      method: 'get',
      params: data
    })
  },
  /**
   * @description 按区域统计
   * */
  getAreaT: function (data) {
    return axios({
      url: '/report1/queryByCondition',
      method: 'get',
      params: data
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
      url: '/sys/permission/update',
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
