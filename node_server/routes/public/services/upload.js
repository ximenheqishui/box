/**
 * 用户业务操作
 */
const models = require('../models/upload')

module.exports = {
  /**
   * 创建用户
   * @param  {object} user 用户信息
   * @return {object}      创建结果
   */
  async upload( info ) {
      console.log(info)
    return info
  }
}
