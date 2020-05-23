import EventBus from './eventBus'
import Request from './request'
import dateFormat from './dateFormat'
import formatHtml from './formatHtml'
import AsyncArr from './async'

// 在wx上绑定的自定义数据和方法
wx.custom = {
    data: {},

    AsyncArr: AsyncArr,

    EventBus: EventBus, //  大概率要暴露一个对象    这里是否暴露一个全局的对象还是类等用到的时候在考虑 现在也不清楚

    network: new Request(),

    dateFormat: dateFormat,

    formatHtml: formatHtml
}

