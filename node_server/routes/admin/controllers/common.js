const commonModels = require('../models/common')

module.exports = {

    /**
     * @api {get} /admin/role 分页获取角色
     * @apiName getRole
     * @apiGroup role
     *
     * @apiParam {Number} pn  第几页
     * @apiParam {Number} pageSize 每页多少条
     */
    async getDictionaries(req, res, next) {
        try {
            let result =  await commonModels.getDictionaries()
            req.returnData.data = result
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
}
