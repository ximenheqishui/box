
/**
 * @description  日期格式化
 * @param fmt [String]  格式
 * @param dateP   默认为当前时间   可以用来创建时间的所有字段
 * @example  dateFormat('YYYY-mm-dd HH:MM:SS','2012-12-11')
 * */
export default function (fmt, dateP) {
    let date = dateP ? new Date(dateP.replace(/-/g, "/")) : new Date()
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}
