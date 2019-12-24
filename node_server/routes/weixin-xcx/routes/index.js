var express = require('express');
var router = express.Router();
var request = require('request');
const dbUtils = require('../../../util/db-util')

/* GET home page. */
router.get('/login', function (req, res, next) {
    let appid = 'wxcf1c81eb0fe58fae'
    let secret = '62e92ecf2c00c7fb23c703107e6db9e3'
    let js_code = req.query.code
    console.log(js_code)
    let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${js_code}&grant_type=authorization_code`
    request.get(url, function (error, response, body) {
        var data = JSON.parse(body);//解析为一个对象不解析就是字符串
        console.log(data)
        res.json(data)
    })
});


router.get('/jiaoyanroom', async function  (req, res, next) {
    console.log(req.query.text)
    dbUtils.insertData('text',{text:req.query.text})
    let a = await  dbUtils.query("SELECT * FROM text")
    console.log(a[0].text)
    res.json({
        code: 0,
        room: 123,
        message: 'OK'
    })
});

module.exports = router;
