import config from '../config'
import eventBus from './eventBus'

class Request {
    constructor(data = {}) {
        this.header = data.header || {}
        this.baseUrl = data.baseUrl || config.apiHost
        this.timeout = data.timeout || 5000
    }

    /**
     * 注意：进入首页面多次请求会creatToken多次  所以首页面请求要给为同步请求。  用回调函数，不要用es6
     * @description ajax 请求
     * @param url 请求路径
     * @param method   请求方法
     * @param data   请求数据
     * @param successFunction   成功回调函数
     * @param errorFunction   失败回调函数
     * @param tag   是否需要需要checkSession   空  false 不校验
     * */
    request (url, method = 'get', data = {}, successFunction, errorFunction, tag = 0) {
        let _this = this
        this.login(function () {
            wx.request({
                url: _this.parseUrl(url),
                header: _this.header,
                timeout: _this.timeout,
                method: method,
                data: data,
                success(res) {
                    if (res.data.code === 1) {
                        // 成功
                        if (successFunction && typeof successFunction == 'function') {
                            successFunction(res)
                        }
                    } else if (res.data.code == -7) {
                        // 没有登录
                        _this.header['access-token'] = ''
                        _this.request(url, method, data, successFunction, errorFunction, tag)
                    } else {
                        // 其他错误
                        if (errorFunction && typeof errorFunction == 'function') {
                            errorFunction(res)
                        }
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail(error) {
                    wx.showToast({
                        title: '服务器忙...',
                        icon: 'none',
                        duration: 2000
                    })
                }
            })
        }, tag)
    }

    /**
     * @description 登录 用自定义事件   解决多次登录并发问题   第一次登录完成了就触发回调
     * @param cb  [Function]  回调函数
     * @param tag  [Boolean] true  需要checkSession    false  不需要checkSession
     *
     * */
    login (cb, tag) {
        let _this = this
        if (tag) {
            wx.checkSession({
                success() {
                    if (_this.header['access-token']) {
                        typeof cb == "function" && cb()
                    } else {
                        login()
                    }
                },
                fail() {
                    login()
                }
            })
        } else {
            if (_this.header['access-token']) {
                typeof cb == "function" && cb()
            } else {
                login()
            }
        }
        function login() {
            if (!eventBus.eventStore.hasOwnProperty('login')) {
                wx.login({
                    success(res) {
                        if (res.code) {
                            //发起网络请求
                            wx.request({
                                url: _this.baseUrl + '/main.MiniUser/login',
                                data: {
                                    code: res.code
                                },
                                success(res) {
                                    if (res.data.code === 1) {
                                        _this.header['access-token'] = res.data.data.access_token
                                        eventBus.emit('login')
                                        eventBus.off('login')
                                    } else {
                                        wx.showToast({
                                            title: '登录失败......',
                                            icon: 'none',
                                            duration: 500
                                        })
                                        console.log(res)
                                    }
                                },
                                fail(error) {
                                    wx.showToast({
                                        title: '登录失败......',
                                        icon: 'none',
                                        duration: 500
                                    })
                                }
                            })
                        } else {
                            wx.showToast({
                                title: '微信登录失败......',
                                icon: 'none',
                                duration: 500
                            })
                            console.log(res)
                        }
                    }
                })
            }
            eventBus.on('login',cb)
        }
    }


    /**
     * @description 上传文件
     * @param path 路径
     * */
    uploadFile (path, successFunction, errorFunction, tag = 0) {
        let _this = this
        _this.login(function () {
            wx.uploadFile({
                url: _this.parseUrl('/5e8d7f776c1f9'),
                filePath: path,
                header: _this.header,
                name: 'file',
                success(res) {
                    // 上传完成需要更新 fileList
                    res.data = JSON.parse(res.data)
                    if (res.data.code === 1) {
                        // 成功
                        if (successFunction && typeof successFunction == 'function') {
                            successFunction(res)
                        }
                    } else if (res.data.code == -7) {
                        // 没有登录
                        _this.header['access-token'] = ''
                        _this.uploadFile(path, successFunction, errorFunction, tag)
                    } else {
                        // 其他错误
                        if (errorFunction && typeof errorFunction == 'function') {
                            errorFunction(res)
                        }
                        wx.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                },
                fail(err) {
                    wx.showToast({
                        title: '服务器忙...',
                        icon: 'none',
                        duration: 2000
                    })
                }
            });
        }, tag)
    }


    /**
     * @description 处理url 若果是以http开头 直接使用 否则加上baseUrl
     * */
    parseUrl (path) {
        if (/^https?:/.test(path)) {
            return path
        } else {
            return this.baseUrl + path
        }
    }
}

export default Request

