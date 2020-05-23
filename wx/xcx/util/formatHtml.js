/**
 * @description  html处理 百度富文本编辑器生成的html
 * @param html [String]  html字符串
 * */
export default function (html) {
    if (!html) {
        return '';
    }
    let regImage = new RegExp('<img', 'gi')
    html =  html.replace(regImage, '<img style="max-width:100% !important;height:auto !important;margin-top:10px;"')
    return `<div style="word-break: break-all;word-wrap:break-word;">${html}</div>`
}
