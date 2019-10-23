'use strict'

/**
 * Created by lili
 * redis连接，常用方法的封装
 *
 */
const redis = require("redis")
const crypto = require("crypto")
let client = redis.createClient();
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
client.on("error", (err) => {
    console.log("Error " + err);
});

let setLoginToken = async (user) => {
    let secret = user.user_name + new Date().getTime();
    let token = crypto.createHmac('sha256', secret).update("I am lily").digest('hex');
    await client.hmset(token, user);
    await client.expire(token, 60 * 60 * 24) //设置key 为token的超时时间  单位为秒
    return token;  //token
}

let delToken = (token) => {
    return new Promise((resolve, reject) => {
        client.del(token, (err, obj) => {   //获取key为session所有的key ： value
            if (err) {
                reject(err);
            } else {
                resolve(obj)
            }
        })
    })
}

let getDate = (token) => {
    return new Promise((resolve, reject) => {
        client.hgetall(token, (err, obj) => {   //获取key为session所有的key ： value
            if (err) {
                reject(err);
            } else {
                resolve(obj)
            }
        })
    })
}

module.exports = {
    client: client,
    setLoginToken: setLoginToken,
    getDate: getDate,
    delToken: delToken
}
