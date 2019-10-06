const menuModels = require('../models/menu')

/**
 * 要改的地方
 *    1、获取的时候传必要的参数   不要用两级路由    遵循 restful-api 规范   去掉getUsableMenu这个方法
* */

module.exports = {

    /**
     * @api {post} /admin/menu 添加菜单
     * @apiName addMenu
     * @apiGroup menu
     *
     * @apiParam {String} icon  字体图标
     * @apiParam {Number} last_menu  是否是地最后一级菜单0,1
     * @apiParam {String} name 菜单名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {String} url  页面功能请求的接口的路径
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status 节点是否启用
     * @apiParam {Number} type 节点是按钮还是菜单
     * @apiParam {String} unique_id 节点唯一标识 要唯一
     * @apiParam {String} path  页面前端路由
     *
     */
    async addMenu(req, res, next) {
        try {
            let requestData = {
                icon: req.body.icon,
                last_menu: parseInt(req.body.last_menu),
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                path: req.body.path,
                sort_order: parseInt(req.body.sort_order),
                status: parseInt(req.body.status),
                type: parseInt(req.body.type),
                unique_id: req.body.unique_id,
                url: req.body.url
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
     *
     * @apiParam {String} id  id组成的字符串以逗号隔开
     *
     *
     */
    async delMenu(req, res, next) {
        try {
            if (req.body.id) {
                let ids = req.body.id.split(',')
                if (ids.length === 1) {
                    let arr = [ids[0]]
                    async function getTree(id) {
                        let result = await menuModels.getAllByParentId(id)
                        if (result && result.length) {
                            for (let i = 0; i < result.length; i++) {
                                arr.push(result[i].id)
                                await getTree(result[i].id)
                            }
                        }
                    }
                    await getTree(parseInt(arr[0]))
                    await menuModels.delById(arr)
                } else {
                    await menuModels.delById(ids)
                }
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
     *
     * @apiParam {Number} id  id
     * @apiParam {String} icon  字体图标
     * @apiParam {Number} last_menu  是否是地最后一级菜单0,1
     * @apiParam {String} name 菜单名称
     * @apiParam {Number} parent_id 父节点的ID
     * @apiParam {String} parent_name 父节点名称
     * @apiParam {String} url  页面功能请求的接口的路径
     * @apiParam {Number} sort_order  排序
     * @apiParam {Number} status 节点是否启用
     * @apiParam {Number} type 节点是按钮还是菜单
     * @apiParam {String} unique_id 节点唯一标识 要唯一
     * @apiParam {String} path  页面前端路由
     *
     */
    async upDateMenu(req, res, next) {
        try {
            let requestData = {
                icon: req.body.icon,
                last_menu: parseInt(req.body.last_menu),
                name: req.body.name,
                parent_id: req.body.parent_id || 0,
                parent_name: req.body.parent_name,
                path: req.body.path,
                sort_order: parseInt(req.body.sort_order),
                status: parseInt(req.body.status),
                type: parseInt(req.body.type),
                unique_id: req.body.unique_id,
                url: req.body.url
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
     * @api {get} /admin/menu 获取所有菜单
     * @apiName getMenu
     * @apiGroup menu
     *
     */
    async getMenu(req, res, next) {
        try {
            async function getTree(id) {
                let result = await menuModels.getAllByParentId(id)
                if (result && result.length) {
                    for (let i = 0; i < result.length; i++) {
                        result[i].children = await getTree(result[i].id)
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
    },
    /**
     * @api {get} /admin/menu/usable 获取启用的菜单
     * @apiName getUsableMenu
     * @apiGroup menu
     *
     */
    async getUsableMenu(req, res, next) {
        try {
            async function getTree(id) {
                let result = await menuModels.getUsableByParentId(id)
                if (result && result.length) {
                    for (let i = 0; i < result.length; i++) {
                        result[i].children = await getTree(result[i].id)
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
    },
}
