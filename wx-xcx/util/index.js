import eventBus from './eventBus'
import Request from './request'
import dateFormat from './dateFormat'
import formatHtml from './formatHtml'
import asyncArr from './async'

// 在wx上绑定的自定义数据和方法
wx.custom = {
    // data: {},
    //
    // eventBus: eventBus,
    //
    // dateFormat: dateFormat,
    //
    // network: new Request(),
    //
    // formatHtml: formatHtml
}


export  {
    eventBus,
    Request,
    dateFormat,
    formatHtml
}
