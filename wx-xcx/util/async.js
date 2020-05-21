import eventBus from './eventBus'

/**
 * @name lili
 * @description 简单的事件管理
 * @param {Object} data  存储的默认数据 无则设置为 {}
 * @property {Array} data  要执行方法的数组
 * @property {Function} data.callback  要执行方法  会返回上次执行的结果 接下来怎么执行 外部可以控制
 * */

class AsyncArr  {
    constructor () {
        this.symbol = ''
        this.arrData = []
        this.i = 0
    }

    emit (data) {
        eventBus.emit(this.symbol, data)
    }

    off () {
        eventBus.off(this.symbol)
    }

    executeAsync (dataP) {
        let data = dataP || {}
        if (this.i < this.arrData.length) {
            this.arrData[this.i++](data)
        } else {
            this.off()
        }
    }

    run (data) {
        this.off()
        this.i = 0
        this.arrData = data || []
        this.symbol = String(new Date().getTime() + Math.random())
        this.executeAsync()
        eventBus.on(this.symbol, this.executeAsync, this)
    }
}

const async_test =  new AsyncArr()

async_test.run([

    function (data) {
            console.log(1)
            console.log(data)
            setTimeout(function () {
                console.log(11)
                async_test.emit( '1的结果')
            }, 1000)
    },
    function (data) {
            console.log(2)
            console.log(data)
            async_test.emit( '2的结果')
        },
    function (data) {
            console.log(3)
            console.log(data)
            async_test.emit( '1的结果')
        },
    function (data) {
            console.log(4)
            console.log(data)
            async_test.emit( '1的结果')
        },
])


export default AsyncArr
