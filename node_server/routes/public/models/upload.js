const dbUtils = require('../util/db-util')


module.exports = {

  /**
   * 数据库创建用户
   * @param  {object} model 用户数据模型
   * @return {object}       mysql执行结果
   */
  async create ( model ) {
    let result = await dbUtils.insertData( 'user_info', model )
    return result
  }
}
