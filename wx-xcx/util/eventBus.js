/**
 * @name LiLi
 *
 * @description 简单的事件管理
 * @param {Object} data  存储的默认数据 无则设置为 {}
 * @property {Object} data  存储一些公共数据
 * @property {Object} eventStore  存储事件
 * @method  on 监听事件
 * @method  once 监听事件一次
 * @method  emit 触发事件
 * @method  off 取消监听
 *
 * */
class EventBus {
    constructor(data) {
        this.data = data || {}
        this.eventStore = {}
    }

    on (msgName, func) {
        if (!func || typeof func != "function") {
            return false
        }
        if (this.eventStore.hasOwnProperty(msgName)) {
            this.eventStore[msgName].push(func)
        } else {
            this.eventStore[msgName] = [func]
        }
    }

    once(msgName, func) {
        if (!func || typeof func != "function") {
            return false
        }
        let wrapFunc =  args => {
            func(args)
            this.off(msgName,wrapFunc)
        }
        if (this.eventStore.hasOwnProperty(msgName)) {
            this.eventStore[msgName].push(wrapFunc)
        } else {
            this.eventStore[msgName] = [wrapFunc]
        }
    }

    /**
     * @description 触发事件
     * @param msgName  事件名称
     * @param msg  需要传递的数据
     * @param tag  是否累计存储消息
     * */
    emit(msgName, msg, tag) {
        if (tag) {
            this.data[msgName] = msg
        } else {
            if (!this.data.hasOwnProperty(msgName)) {
                this.data[msgName] =  [msg]
            } else {
                this.data[msgName].push(msg)
            }
        }
        if (!this.eventStore.hasOwnProperty(msgName)) {
            return false
        }
        this.eventStore[msgName].map((fn) => {
            fn(msg)
        })
    }

    /**
     * @description 取消监听事件
     * @param msgName  事件名称
     * @param func    不传func删除全部回调函数。传func要用监听事件时的同一个函数（要保持引用一样）,
     * 这样只删除传入的函数的监听，
     * */
    off(msgName,func) {
        if (!this.eventStore.hasOwnProperty(msgName)) {
            return
        }
        if (func) {
            this.eventStore[msgName] = this.eventStore[msgName].filter(function(fn){
                return  fn != func
            })
        } else {
            delete this.eventStore[msgName]
        }
    }
}

export default new EventBus()
