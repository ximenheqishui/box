const app = getApp()

Page({

    data: {
        first:true,
        roomList: [],
        roomId: 0,
        community_id: 0,
        lunbo: {
            indicatorDots: true,
            vertical: false,
            autoplay: true,
            interval: 20000,
            duration: 500,
            lunbo: [],
        },
        gonggao:{
            indicatorDots: false,
            vertical: true,
            autoplay: true,
            interval: 10000,
            duration: 500,
            lunbo: [],
        },
        lunbo2: [],
        grid: [
            {
                url: '/pagesproperty/community/index/index',
                registerUrl: '/pagesproperty/bindRoom/index',
                icon: 'iconxiaoquguanli',
                text: '小区信息',
                color: '#3c57fb',
                disabledColor: '#666',
            },
            {
                url: '/pagesproperty/pay/list/index',
                registerUrl: '/pagesproperty/bindRoom/index',
                icon: 'iconpeizhitubiaosvg-',
                text: '在线缴费',
                color: '#fc7b44',
                disabledColor: '#666',
            },
            {
                url: '/pagesproperty/car/index/index',
                registerUrl: '/pagesproperty/bindRoom/index',
                icon: 'iconcheliang-',
                text: '车辆管理',
                color: '#67b9f6',
                disabledColor: '#666',
            },
            {
                url: '/pagesproperty/visit/list/index',
                registerUrl: '/pagesproperty/bindRoom/index',
                icon: 'iconrenyuandengji',
                text: '来访历史',
                color: '#ff9d3f',
                disabledColor: '#666',
            },
            {
                url: '/pagesproperty/repairs/add/index',
                registerUrl: '/pagesproperty/bindRoom/index',
                icon: 'iconweixiu',
                text: '在线报修',
                color: '#fc7740',
                disabledColor: '#666',
            },
            {
                url: '/pages/coming/index',
                registerUrl: '/pages/coming/index',
                icon: 'iconjiankong1',
                text: '安防监控',
                color: '#ffa544',
                disabledColor: '#ffa544',
            },
            {
                url: '/pages/coming/index',
                registerUrl: '/pages/coming/index',
                icon: 'iconyuyueguahao1',
                text: '预约诊疗',
                color: '#3c57fb',
                disabledColor: '#3c57fb',
            },
            {
                url: '/pages/coming/index',
                registerUrl: '/pages/coming/index',
                icon: 'icondianziweilan',
                text: '电子围栏',
                color: '#ffa544',
                disabledColor: '#ffa544',
            }
        ]
    },

    onLoad: function (options) {
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
        this.getRoom()
        this.getLunbo()
        this.getLunbo2()
    },
    onShow: function (e) {
        if (this.data.first) {
            this.data.first = false
        } else {
            this.getRoom(1)
        }
    },
    onShareAppMessage: function (e) {
    },

    // 自定也方法
    getRoom (tag) {
        let _this = this
        app.getRoom(function(res){
            if (tag) {
                if (_this.data.community_id !=  res.select.community_id) {
                    _this.getGongGao(res.select.community_id)
                }
            } else {
                _this.getGongGao(res.select.community_id)
                wx.hideLoading()
            }
            _this.setData({
                community_id: res.select.community_id,
                roomId: res.select.apartment_id,
                roomList: res.data
            })
        })
    },
    getGongGao (id) {
        let _this = this
        app.network.request(
            '/main.Content/getList',
            'get',
            {
                community_id: id,
                content_group_id: 12,
                page: 1,
                limit: 10,
            },
            function (res) {
                // 成功之后的回调
                if (res.data.data.total) {
                    _this.setData({
                        'gonggao.lunbo': res.data.data.data
                    })
                } else {
                    _this.setData({
                        'gonggao.lunbo': []
                    })
                }
            },
            function (res) {
                // 失败的回调函数
            },
        )
    },
    getLunbo () {
        let _this = this
        app.network.request(
            '/main.Slide/getList',
            'get',
            {
                community_id: _this.data.community_id,
                slide_group_id: 1
            },
            function (res) {
                // 成功之后的回调
                if (res.data.data.total) {
                    _this.setData({
                        'lunbo.lunbo': res.data.data.data
                    })
                } else {
                    _this.setData({
                        'lunbo.lunbo': []
                    })
                }
            },
            function (res) {
                // 失败的回调函数
            },
        )
    },
    getLunbo2 () {
        let _this = this
        app.network.request(
            '/main.Slide/getList',
            'get',
            {
                community_id: _this.data.community_id,
                slide_group_id: 2
            },
            function (res) {
                // 成功之后的回调
                if (res.data.data.total) {
                    _this.setData({
                        'lunbo2': res.data.data.data
                    })
                } else {
                    _this.setData({
                        'lunbo2': []
                    })
                }
            },
            function (res) {
                // 失败的回调函数
            },
        )
    },
    roomChange (e) {
        // 还要置换下面的数据 暂时不做
        let _this = this
        let community_id = 0
        this.data.roomList.forEach(function(item){
            if (item.id == e.detail) {
                community_id = item.community_id
                return false
            }
        })
        _this.setData({
            roomId: e.detail,
            community_id: community_id
        })
        this.setApartment(e.detail)
        this.getGongGao()
    },
    setApartment (id) {
        app.network.request(
            '/main.User/setCurrentOwner',
            'post',
            {
                owner_id: id,
            },
            function (res) {
                // 成功之后的回调
            },
            function (res) {
                // 失败的回调函数
            },
        )
    },
})
