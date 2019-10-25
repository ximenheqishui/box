const menuModels = require('../models/menu')

module.exports = {

    /**
     * @api {post} /admin/menu 添加菜单
     * @apiName addMenu
     * @apiGroup menu
     * @apiUse APICommon
     *
     * @apiParam {String} icon  字体图标
     * @apiParam {Number} last_menu  是否为最后一级  0不是最后一层   1 是最后一层
     * @apiParam {String} name 菜单名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status  是否启用  0 是启用  1 是不启用
     * @apiParam {Number} type 节点是按钮还是菜单   1 菜单类型  2 按钮类型
     * @apiParam {String} unique_id 节点唯一标识 要唯一
     * @apiParam {String} path  页面前端路由
     *
     */
    async addMenu(req, res, next) {
        try {
            let requestData = {
                icon: req.body.icon,
                last_menu: req.body.last_menu,
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                path: req.body.path,
                sort_order: req.body.sort_order,
                status: req.body.status,
                type: req.body.type,
                unique_id: req.body.unique_id
            }
            let result = await menuModels.create(requestData)
            if (result.code) {
                req.returnData.code = 1
                req.returnData.message = '唯一标识重复'
                if (req.app.get('env') === 'development') {
                    req.returnData.error = result
                }
            } else {
                req.returnData.data = {id: result.insertId}
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {delete} /admin/menu 删除菜单
     * @apiName DelMenu
     * @apiGroup menu
     * @apiUse APICommon
     *
     * @apiParam {String} id  以逗号隔开的id字符串
     *
     */
    async delMenu(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                let allIds = []
                // 查询树的递归函数
                async function getTree(id) {
                    let result = await menuModels.getByParentId(req.query,id)
                    if (result && result.length) {
                        for (let i = 0; i < result.length; i++) {
                            allIds.push(result[i].id)
                            await getTree(result[i].id)
                        }
                    }
                }
                // 查询id下的所有子节点
                for (let i = 0; i < ids.length; i++){
                    await getTree(parseInt(ids[i]))
                }
                // 把当前的id也加入数组中
                allIds = allIds.concat(ids)
                // 删除所有的在allIds的菜单
                await menuModels.delById(allIds)
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {put} /admin/menu 修改菜单
     * @apiName updateMenu
     * @apiGroup menu
     * @apiUse APICommon
     *
     * @apiParam {Number} id  id
     * @apiParam {String} icon  字体图标
     * @apiParam {Number} last_menu  是否为最后一级  0不是最后一层   1 是最后一层
     * @apiParam {String} name 菜单名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status  是否启用  0 是启用  1 是不启用
     * @apiParam {Number} type 节点是按钮还是菜单   1 菜单类型  2 按钮类型
     * @apiParam {String} unique_id 节点唯一标识 要唯一
     * @apiParam {String} path  页面前端路由
     *
     */
    async upDateMenu(req, res, next) {
        try {
            let requestData = {
                icon: req.body.icon,
                last_menu: req.body.last_menu,
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                path: req.body.path,
                sort_order: req.body.sort_order,
                status: req.body.status,
                type: req.body.type,
                unique_id: req.body.unique_id
            }
            let result = await menuModels.update(requestData, req.body.id)
            if (result.code) {
                req.returnData.code = 1
                req.returnData.message = '唯一标识重复'
                if (req.app.get('env') === 'development') {
                    req.returnData.error = result
                }
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {get} /admin/menu 获取菜单
     * @apiName getMenu
     * @apiGroup menu
     * @apiUse APICommon
     *
     * @apiParam {Number} status  是否启用 ：0 是启用、1 是不启用、空或者不存在为全部
     *
     */
    async getMenu(req, res, next) {
        try {
            async function getTree(id) {
                let result = await menuModels.getByParentId(req.query,id)
                if (result && result.length) {
                    for (let i = 0; i < result.length; i++) {
                        let children  = await getTree(result[i].id)
                        if (children.length) {
                            result[i].children = children
                        }
                    }
                }
                return result
            }
            let result = await getTree(0)
            req.returnData.data = result
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }

}
