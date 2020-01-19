module.exports = {
    /**
     * @api {post} /admin/case 添加案件
     * @apiName addCase
     * @apiUse APICommon
     * @apiGroup case
     *
     * @apiParam {String} name  案件名称
     * @apiParam {Number} type_id 案件类别ID
     * @apiParam {String} type_path 案件类别路径
     * @apiParam {String} description  案件简述
     * @apiParam {String} time  案发时间
     * @apiParam {String} location  案发地点
     *
     * @apiSuccess {Number}  id   案件id.
     */
    async addCase(req, res, next) {
        try {
            req.returnData.data = {id: new Date().getTime()}
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {post} /admin/case/party 添加案件当事人
     * @apiName addCaseParty
     * @apiUse APICommon
     * @apiGroup case
     *
     * @apiParam {Number} id 案件ID
     * @apiParam {Object[]} form_list       当事人的对象的数组
     * @apiParam {Number}   form_list.id  有就是修改没有就是添加
     * @apiParam {String}   form_list.name 当事人名称
     * @apiParam {Number}   form_list.sex 当事人性别
     * @apiParam {Number}   form_list.mobile 当事人手机号
     * @apiParam {String}   form_list.id_card 当事人身份证号
     * @apiParam {String}   form_list.location 当事人常驻地址
     *
     */
    async addCaseParty(req, res, next) {
        try {
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    /**
     * @api {put} /admin/case/setting 添加案件设置
     * @apiName addCaseSetting
     * @apiUse APICommon
     * @apiGroup case
     *
     * @apiParam {Number}   id 案件ID
     * @apiParam {String}   reserve_time 约定时间
     * @apiParam {Number[]}  user_ids 调解员id
     *
     */
    async upDateCaseSetting(req, res, next) {
        try {
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    async delCase(req, res, next) {
        try {
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    async upDateCase(req, res, next) {
        try {
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    },
    async getCase(req, res, next) {
        try {
            if (req.query.id) {
                req.returnData.data = [
                        {
                            id:1,
                            name: '长江路薛家岛站车祸',
                            type_name: '交通事故',
                            type_id: 1,
                            type_path: "[]",
                            description: '简述',
                            location: '薛家岛',
                            time: '2020-1-1 12:12:12',
                            reserve_time: '2020-1-2 12:12:12',
                            user_name: '张警官、李警官',
                            case_states_name: '案件完结',
                            case_states: 2,
                        }
                    ]
            } else {
                req.returnData.data = {
                    total:0,
                    list: [
                        {
                            id:1,
                            type_path: "[]",
                            name: '长江路薛家岛站车祸',
                            type_name: '交通事故',
                            type_id: 1,
                            description: '简述',
                            location: '薛家岛',
                            time: '2020-1-1 12:12:12',
                            reserve_time: '2020-1-2 12:12:12',
                            user_name: '张警官、李警官',
                            case_states_name: '案件完结',
                            case_states: 2,
                        }
                    ]
                }
            }
            await res.json(req.returnData)
        } catch (e) {
            next(e)
        }
    }
}
