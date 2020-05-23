import eventBus from './eventBus'
import Request from './request'
import dateFormat from './dateFormat'
import formatHtml from './formatHtml'
import AsyncArr from './async'

// 在wx上绑定的自定义数据和方法
wx.custom = {
    data: {},

    AsyncArr: AsyncArr,

    eventBus: eventBus,

    network: new Request(),

    dateFormat: dateFormat,

    formatHtml: formatHtml
}

