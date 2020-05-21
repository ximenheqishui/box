import config from './config'
import {
    Request,
    eventBus,
    formatHtml,
    dateFormat }  from './util/index'
// 首页数据缓存

App({
    onLaunch: function (options) {
    },

    onShow: function () {},

    eventBus: eventBus,

    dateFormat: dateFormat,

    network: new Request(),

    formatHtml: formatHtml,

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

    /**
     * @description  获取当前用户绑定的房间
     * */
    getRoom (cb) {
        let _this = this
        let room = {
            data: [],
            select: {
                community_name: "",
                room:"",
                fullRoom : "",
                community_id: "",
                apartment_id:"",
            }
        }
        function fuzhi(info) {
            room.select.community_name  =  info.community_name
            room.select.room  =  info.text
            room.select.fullRoom  =  info.community_name + ' ' +  info.text
            room.select.community_id  =  info.community_id
            room.select.apartment_id = info.owner_id
        }
        if (_this.globalData.roomRefresh) {
            _this.globalData.roomRefresh = false
            this.network.request(
                '/main.User/getOwnerAll',
                'get',
                {},
                function (res) {
                    // 成功之后的回调
                    if (res.data.data && res.data.data.length) {
                        res.data.data.forEach(function(item){
                            item.value = item.owner_id
                            item.text = item.building ? item.building + '楼' : ''
                            item.text += item.unit ? item.unit + '单元' : ''
                            item.text += item.apartment ? item.apartment + '室' : ''
                            if (item.is_default) {
                                    fuzhi(item)
                                }
                            item.text = item.community_name + ' ' +  item.text
                        })
                        room.data = res.data.data
                    }
                    _this.globalData.room = room
                    typeof cb == "function" && cb(room)
                },
                function (res) {
                    // 失败的回调函数
                },
            )
        } else {
            typeof cb == "function" && cb(_this.globalData.room)
        }
    },

    globalData: {
        refreshPage: false,
        roomRefresh: true,
        room: '',
        staticUrl: config.staticUrl,
        userInfo: {}, // 前端获取的用户信息
        setting: {}, // 后台获取的用户信息
        shopCar:{
            total: 0,
            totalPrice: 0,
            list: []
        }
    }
})
