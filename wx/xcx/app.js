import config from './config'
import './util/index'

App({
    onLaunch: function (options) {
    },

    onShow: function () {},

    /**
     * @description 页面后退 刷新数据
     * */
    jsNavigateBack: function () {
        let _this = this
        this.globalData.refreshPage = true
        wx.navigateBack({
            delta: 1,
            complete: function () {
                _this.globalData.refreshPage = false
            }
        })
    },

    globalData: {
        refreshPage: false,
        roomRefresh: true,
        room: '',
        staticUrl: config.staticUrl,
        userInfo: {}, // 前端获取的用户信息
        setting: {}, // 后台获取的用户信息
    }
})
