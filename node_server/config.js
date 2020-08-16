const os = require('os');

module.exports ={
    ip: os.networkInterfaces().WLAN[0].address,
    // ip: 'localhost',
    env: 'development', // development 开发环境  production 生产环境   开发环境一定要修改node的环境变量（查文档看看怎么修改）
    port: 9000,
    database:{
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'box' // mediation 案件管理的数据库
    },
    redis:{
        host: "127.0.0.1",
        port: "6379",
        pass: "",
        db: 1
    }
}
