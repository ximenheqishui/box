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

export default AsyncArr
