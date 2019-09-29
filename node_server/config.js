module.exports ={
    env: 'development', // development 开发环境  production 生产环境
    port: 3000,
    database:{
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'box'
    },
    redis:{
        host: "127.0.0.1",
        port: "6379",
        pass: "",
        db: 1
    }
}
