import eventBus from './eventBus'
/**
 * @name lili
 * @description 简单的事件管理
 * @param {Object} data  存储的默认数据 无则设置为 {}
 * @property {Array} data  要执行方法的数组
 * @property {Function} data.callback  要执行方法
 * x@property {Boolean} data.errorContinue true 报错以后直接跳转到错误处理函数没有就结束  false 继续执行
 * x@property {Boolean} data.async  类型  是同步执行这个还是异步执行    false同步执行    true异步执行
 * x@property {Boolean} data.error  名称 true 错误处理函数
 * */
 function asyncArr (data) {
    let symbol = String(new Date().getTime() + Math.random())
    let arrData = data
    let length = data.length
    let i = 0
    console.log(i,length)
    function run (dataP) {
        let data = dataP || {}
        console.log(i,length)
        if (i < length) {
            arrData[i].callback(symbol)
            i = i + 1
        }
    }

    run()
    asyncArr.eventBus.on(symbol, run)

}

asyncArr.eventBus = eventBus

asyncArr(
    [
        {
            callback: function (symbol) {
                console.log(1)
                setTimeout(function(){
                    console.log(11)
                    asyncArr.eventBus.emit(symbol,{
                        type: 'success',
                        data: {}
                    })
                },1000)
            }
        },
        {
            callback: function (symbol) {
                console.log(2)
                asyncArr.eventBus.emit(symbol,{
                    type: 'success',
                    data: {}
                })
            },
        },
        {
            callback: function (symbol) {
                console.log(3)
                asyncArr.eventBus.emit(symbol,{
                    type: 'success',
                    data: {}
                })
            },
        },
        {
            callback: function (symbol) {
                console.log(4)
                asyncArr.eventBus.emit(symbol,{
                    type: 'success',
                    data: {}
                })
            },
        },
    ]
)

export default asyncArr
