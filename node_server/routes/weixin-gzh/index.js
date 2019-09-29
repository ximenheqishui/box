var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
    let appid = 'wxaa8f6b9ff6cf830f'
    let secret = '6a9fdf9ffbc7867cd75822eb618fe382'
    let js_code = req.query.code
    console.log(js_code)
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`
    request.get(url, function (error, response, body) {
        var data = JSON.parse(body);//解析为一个对象不解析就是字符串
        console.log(data)
        res.json(data)
    })
});

router.get('/er', function (req, res, next) {
    let appid = 'wx69e0f64f7e31bbb1'
    let secret = '2a7b05485d8e138f7623c3dc17ed76ea'
    // `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN`

    let url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
    request.get(url, function (error, response, body) {
        var data = JSON.parse(body);//解析为一个对象不解析就是字符串
        console.log(data)
        let access_token = data.access_token
        let url = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${access_token}`
        // let url = 'http://localhost:3000/weixin-xcx'
        request.post({
            url:url,
            form:{
                "path": "pages/webrtc-room/room/room?roomID=123456"
            }},function(error, response, body){
            if (error) {
                console.log(error)
            }
            console.log(response)
            console.log(body)
            // var data = JSON.parse(body);//解析为一个对象不解析就是字符串
            // console.log(data)
            res.end(JSON.stringify(response))
        })
    })
});

router.post('/', function (req, res, next) {
    console.log(req.body)
    res.json(req.body)
});

router.get('/business/getBusinessCate', function (req, res, next) {
    let data = {
        "code": 0,
        "msg": "ok",
        "url": "",
        "data": [{
            "id": 1,
            "pid": 0,
            "group_code": "",
            "title": "驾驶证业务",
            "description": "",
            "status": 1,
            "sort": 0,
            "delete_time": null,
            "children": [{
                "id": 2,
                "pid": 1,
                "group_code": "LICENSE01",
                "title": "补换驾驶证",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 3,
                    "pid": 2,
                    "group_code": "",
                    "title": "补领驾驶证",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 4,
                    "pid": 2,
                    "group_code": "",
                    "title": "期满换证",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 5,
                    "pid": 2,
                    "group_code": "",
                    "title": "驾驶证降级",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 6,
                "pid": 1,
                "group_code": "LICENSE02",
                "title": "外地转入驾驶证",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }, {
                "id": 7,
                "pid": 1,
                "group_code": "LICENSE03",
                "title": "注销驾驶证",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }, {
                "id": 8,
                "pid": 1,
                "group_code": "LICENSE04",
                "title": "提交体检证明",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }, {
                "id": 9,
                "pid": 1,
                "group_code": "LICENSE05",
                "title": "变更驾驶证信息",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 10,
                    "pid": 9,
                    "group_code": "",
                    "title": "变更姓名",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 11,
                    "pid": 9,
                    "group_code": "",
                    "title": "变更联系方式",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 12,
                "pid": 1,
                "group_code": "LICENSE06",
                "title": "申请延期换证",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }, {
                "id": 13,
                "pid": 1,
                "group_code": "LICENSE07",
                "title": "校车业务",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 14,
                    "pid": 13,
                    "group_code": "",
                    "title": "校车驾驶证",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 15,
                    "pid": 13,
                    "group_code": "",
                    "title": "取消校车驾驶证",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 16,
                "pid": 1,
                "group_code": "LICENSE08",
                "title": "满分学习",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }, {
                "id": 17,
                "pid": 1,
                "group_code": "LICENSE09",
                "title": "实习期考试",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }, {
                "id": 18,
                "pid": 1,
                "group_code": "LICENSE10",
                "title": "变更考试地",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 19,
                    "pid": 18,
                    "group_code": "",
                    "title": "初学变更考试地",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 20,
                    "pid": 18,
                    "group_code": "",
                    "title": "增驾变更考试地",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 21,
                "pid": 1,
                "group_code": "LICENSE11",
                "title": "恢复驾驶资格",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }, {
                "id": 22,
                "pid": 1,
                "group_code": "LICENSE12",
                "title": "互联网注册",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 23,
                    "pid": 22,
                    "group_code": "",
                    "title": "个人互联网注册",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 24,
                    "pid": 22,
                    "group_code": "",
                    "title": "企业互联网注册",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 25,
                "pid": 1,
                "group_code": "LICENSE13",
                "title": "驾驶证审验",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }, {
                "id": 26,
                "pid": 1,
                "group_code": "LICENSE14",
                "title": "网约车五年无事故证明",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }, {
                "id": 27,
                "pid": 1,
                "group_code": "LICENSE15",
                "title": "申请机动车驾驶证",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": []
            }]
        }, {
            "id": 29,
            "pid": 0,
            "group_code": "",
            "title": "机动车业务",
            "description": "",
            "status": 1,
            "sort": 0,
            "delete_time": null,
            "children": [{
                "id": 30,
                "pid": 29,
                "group_code": "CAR01",
                "title": "补换牌证\/登记证书\/合格标志",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 31,
                    "pid": 30,
                    "group_code": "",
                    "title": "补换行车证",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 32,
                    "pid": 30,
                    "group_code": "",
                    "title": "委托代办补换行车证",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 33,
                    "pid": 30,
                    "group_code": "",
                    "title": "补换号牌",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 34,
                    "pid": 30,
                    "group_code": "",
                    "title": "委托代办补换号牌",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 35,
                    "pid": 30,
                    "group_code": "",
                    "title": "补领机动车登记证书",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 36,
                    "pid": 30,
                    "group_code": "",
                    "title": "换领登记证书",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 37,
                    "pid": 30,
                    "group_code": "",
                    "title": "委托代办换领登记证书",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 38,
                    "pid": 30,
                    "group_code": "",
                    "title": "补领机动车检验合格标志",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 39,
                    "pid": 30,
                    "group_code": "",
                    "title": "委托代办补领机动车检验合格标志",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 40,
                "pid": 29,
                "group_code": "CAR02",
                "title": "变更登记",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 41,
                    "pid": 40,
                    "group_code": "",
                    "title": "变更登记",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 42,
                    "pid": 40,
                    "group_code": "",
                    "title": "委托代办变更登记",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 43,
                "pid": 29,
                "group_code": "CAR03",
                "title": "注册登记",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 44,
                    "pid": 43,
                    "group_code": "",
                    "title": "注册登记",
                    "description": "车辆到现场查验",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 45,
                    "pid": 43,
                    "group_code": "",
                    "title": "委托代办注册登记",
                    "description": "车辆到现场查验",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 46,
                "pid": 29,
                "group_code": "CAR04",
                "title": "解抵押登记",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 47,
                    "pid": 46,
                    "group_code": "",
                    "title": "抵押登记",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 48,
                    "pid": 46,
                    "group_code": "",
                    "title": "解押登记",
                    "description": "车主必须到场",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 49,
                "pid": 29,
                "group_code": "CAR05",
                "title": "转入登记",
                "description": "车辆到现场查验",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 50,
                    "pid": 49,
                    "group_code": "",
                    "title": "转入登记",
                    "description": "车辆到现场查验",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 51,
                    "pid": 49,
                    "group_code": "",
                    "title": "委托代办转入登记",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 52,
                "pid": 29,
                "group_code": "CAR06",
                "title": "临时号牌",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 53,
                    "pid": 52,
                    "group_code": "",
                    "title": "个人临时号牌",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 54,
                    "pid": 52,
                    "group_code": "",
                    "title": "单位临时号牌",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 55,
                    "pid": 52,
                    "group_code": "",
                    "title": "委托代办个人临时号牌",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 57,
                "pid": 29,
                "group_code": "CAR08",
                "title": "申领机动车免检标志",
                "description": "可以在检验期满前三个月申请，申请前，机动车所有人应当将涉及该车的道路交通安全违法行为和交通事故处理完毕",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 58,
                    "pid": 57,
                    "group_code": "",
                    "title": "申领机动车免检标志",
                    "description": "可以在检验期满前三个月申请，申请前，机动车所有人应当将涉及该车的道路交通安全违法行为和交通事故处理完毕",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 59,
                    "pid": 57,
                    "group_code": "",
                    "title": "委托代办申领机动车免检标志",
                    "description": "可以在检验期满前三个月申请，申请前，机动车所有人应当将涉及该车的道路交通安全违法行为和交通事故处理完毕",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 60,
                "pid": 29,
                "group_code": "CAR09",
                "title": "变更联系电话",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 61,
                    "pid": 60,
                    "group_code": "",
                    "title": "变更联系电话",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 62,
                    "pid": 60,
                    "group_code": "",
                    "title": "委托代办变更联系电话",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }, {
                "id": 64,
                "pid": 29,
                "group_code": "CAR11",
                "title": "车牌互换",
                "description": "",
                "status": 1,
                "sort": 0,
                "delete_time": null,
                "children": [{
                    "id": 65,
                    "pid": 64,
                    "group_code": "",
                    "title": "个人车主车牌互换",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }, {
                    "id": 66,
                    "pid": 64,
                    "group_code": "",
                    "title": "单位车主车牌互换",
                    "description": "",
                    "status": 1,
                    "sort": 0,
                    "delete_time": null,
                    "children": []
                }]
            }]
        }]
    }
    res.json(data)
});


module.exports = router;
