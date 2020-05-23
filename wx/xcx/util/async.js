import EventBus from './eventBus'

/**
 * @name lili
 * @description  简单的实现同步执行代码
 * @param {Object} data  存储的默认数据 无则设置为 {}
 * @property {Array} data  要执行方法的数组
 * @property {Function} data.callback  要执行方法  会返回上次执行的结果 接下来怎么执行 外部可以控制
 *
 * 注意：在外部终结执行完数组中所有的函数 要调用一下  off方法 ， 不然会有内存溢出
 * */

class AsyncArr  {
    constructor () {
        this.symbol = ''
        this.arrData = []
        this.i = 0
        this.eventBus = new EventBus()
    }

    emit (data) {
        this.eventBus.emit(this.symbol, data)
    }

    off () {
        this.eventBus.off(this.symbol)
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
        this.eventBus.on(this.symbol, this.executeAsync, this)
    }
}

export default AsyncArr
