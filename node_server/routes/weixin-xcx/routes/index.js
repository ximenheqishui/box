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

router.get('/getLine', function (req, res, next) {
    let data = {
        code:0,
        message:'成功了'
    }
    data.data = [
        {
            id: 1,
            title: '永旺梦乐城免费一号线',
            start_time: '08:00',
            end_time: '20:00',
            list: [
                {
                    id:1,
                    longitude: '119.968384',
                    latitude: '35.810183',
                    title: '大珠山风景区'
                },
                {
                    id:2,
                    longitude:'120.050095',
                    latitude: '35.864457',
                    title: '城市阳台'
                },
                {
                    id:3,
                    longitude:'120.096787',
                    latitude: '35.899367',
                    title: '融创帽'
                },
                {
                    id:4,
                    longitude:'120.131462',
                    latitude: '35.919388',
                    title: '黄海学院'
                },
                {
                    id:5,
                    longitude:'120.140045',
                    latitude: '35.925783',
                    title: '海上嘉年华'
                },
                {
                    id:6,
                    longitude:'120.09816',
                    latitude: '35.949689',
                    title: '北石前'
                },
                {
                    id:7,
                    longitude:'120.016106',
                    latitude: '35.933567',
                    title: '薛家岭村'
                },
                {
                    id:8,
                    longitude:'119.956368',
                    latitude: '35.901314',
                    title: '青岛西站'
                },
                {
                    id:9,
                    longitude:'119.924525',
                    latitude: '35.837673',
                    title: '土山屯村'
                },
                {
                    id:10,
                    longitude: '119.968384',
                    latitude: '35.810183',
                    title: '大珠山风景区'
                }
            ]
        },
        {
            id: 2,
            title: '永旺梦乐城免费二号线',
            start_time: '08:00',
            end_time: '20:00',
            list: [
                {
                    id:1,
                    longitude: '119.968384',
                    latitude: '35.810183',
                    title: '大珠山风景区'
                },
                {
                    id:2,
                    longitude:'120.050095',
                    latitude: '35.864457',
                    title: '城市阳台'
                },
                {
                    id:3,
                    longitude:'120.096787',
                    latitude: '35.899367',
                    title: '融创帽'
                },
                {
                    id:4,
                    longitude:'120.131462',
                    latitude: '35.919388',
                    title: '黄海学院'
                },
                {
                    id:5,
                    longitude:'120.140045',
                    latitude: '35.925783',
                    title: '海上嘉年华'
                },
                {
                    id:6,
                    longitude:'120.09816',
                    latitude: '35.949689',
                    title: '北石前'
                },
                {
                    id:7,
                    longitude:'120.016106',
                    latitude: '35.933567',
                    title: '薛家岭村'
                },
                {
                    id:8,
                    longitude:'119.956368',
                    latitude: '35.901314',
                    title: '青岛西站'
                },
                {
                    id:9,
                    longitude:'119.924525',
                    latitude: '35.837673',
                    title: '土山屯村'
                },
                {
                    id:10,
                    longitude: '119.968384',
                    latitude: '35.810183',
                    title: '大珠山风景区'
                }
            ]
        }
    ]
    res.json(data)
});

// 获取线路信息
router.get('/getP', function (req, res, next) {
    let data = {
        code:0,
        message:'成功了',
        data:{
            id: 1,
            title: '永旺梦乐城免费一号线',
            start_time: '08:00',
            end_time: '20:00',
            list: [
                {
                    id:1,
                    longitude: '119.968384',
                    latitude: '35.810183',
                    title: '大珠山风景区'
                },
                {
                    id:2,
                    longitude:'120.050095',
                    latitude: '35.864457',
                    title: '城市阳台'
                },
                {
                    id:3,
                    longitude:'120.096787',
                    latitude: '35.899367',
                    title: '融创帽'
                },
                {
                    id:4,
                    longitude:'120.131462',
                    latitude: '35.919388',
                    title: '黄海学院'
                },
                {
                    id:5,
                    longitude:'120.140045',
                    latitude: '35.925783',
                    title: '海上嘉年华'
                },
                {
                    id:6,
                    longitude:'120.09816',
                    latitude: '35.949689',
                    title: '北石前'
                },
                {
                    id:7,
                    longitude:'120.016106',
                    latitude: '35.933567',
                    title: '薛家岭村'
                },
                {
                    id:8,
                    longitude:'119.956368',
                    latitude: '35.901314',
                    title: '青岛西站'
                },
                {
                    id:9,
                    longitude:'119.924525',
                    latitude: '35.837673',
                    title: '土山屯村'
                },
                {
                    id:10,
                    longitude: '119.968384',
                    latitude: '35.810183',
                    title: '大珠山风景区'
                }
            ]
        }
    }
    res.json(data)
});
 // 获取车的信息和第几站
router.get('/getP2', function (req, res, next) {
    let data = {
        code:0,
        message:'成功了',
        data:{
            id:12131,
            title: '永旺梦乐城免费一号线',
            longitude:'120.050095',
            latitude: '35.864457',
            nowLocation: 1.5
        }
    }
    res.json(data)
});

module.exports = router;
