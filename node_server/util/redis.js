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

let setLoginSession = async (user) => {
    let secret = user.user_name + new Date().getTime();
    let session = crypto.createHmac('sha256', secret).update("I am lily").digest('hex');//加密生成返回session
    await client.hmset(session, user);
    await client.expire(session, 60 * 60 * 24) //设置key 为session的超时时间  单位为秒
    return session;  //返回session
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
    setLoginSession: setLoginSession,
    getDate: getDate,
    delToken: delToken
}
