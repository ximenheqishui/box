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

    on (msgName, func,_this) {
        if (!func || typeof func != "function") {
            return false
        }
        if (this.eventStore.hasOwnProperty(msgName)) {
            this.eventStore[msgName].push({
                cb:func,
                _this:_this
            })
        } else {
            this.eventStore[msgName] = [{
                cb:func,
                _this:_this
            }]
        }
    }

    once(msgName, func,_this) {
        if (!func || typeof func != "function") {
            return false
        }
        let wrapFunc =  (args,_this) => {
            func.call(_this,args)
            this.off(msgName,wrapFunc)
        }
        if (this.eventStore.hasOwnProperty(msgName)) {
            this.eventStore[msgName].push({
              cb:wrapFunc,
              _this:_this
            })
        } else {
            this.eventStore[msgName] = [{
                cb:wrapFunc,
                _this:_this
            }]
        }
    }

    /**
     * @description 触发事件
     * @param msgName  事件名称
     * @param msg  需要传递的数据
     * @param tag  是否累计存储消息
     * */
    emit(msgName, msg, tag) {
        if (!tag) {
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
        this.eventStore[msgName].map((item) => {
            item.cb.call(item._this,msg)
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
            this.eventStore[msgName] = this.eventStore[msgName].filter(function(item){
                return  item.cb != func
            })
        } else {
            delete this.eventStore[msgName]
            delete this.data[msgName]
        }
    }
}

export default new EventBus()
