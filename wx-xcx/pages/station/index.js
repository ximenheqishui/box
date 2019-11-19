//获取应用实例
const app = getApp()

Page({
    data: {
        latitude: 0,
        longitude: 0,
        height: 0,
        markers: []
    },
    onLoad: function (options) {
        let _this = this
        _this.setData({
            height: wx.getSystemInfoSync().windowHeight
        })
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                var latitude = res.latitude
                var longitude = res.longitude
                _this.setData({
                    latitude: latitude,//纬度
                    longitude: longitude,//经度
                })
            }
        })

        // 获取公交线路
        wx.request({
            method: 'get',
            url: app.globalData.baseUrl + '/bus/getLineList',
            dataType: 'json',
            data: {},
            success(res) {
                let data = res.data.data
                let markers = []
                data.forEach(function (item) {
                    if (item.station && item.station.length) {
                        item.station.forEach(function (item2) {
                            var left = item2.title.length * 7
                            item2.parentId = item.id
                            item2.iconPath = '/image/point.png'
                            item2.label = {
                                content: item2.title,
                                color: '#183eff',
                                borderRadius: 4,
                                padding: 4,
                                bgColor: '#fff',
                                textAlign: 'center',
                                anchorX: -left,
                                anchorY: 4
                            }
                            delete item2.title
                            markers.push(item2)
                        })
                    }
                })
                _this.setData({
                    markers: markers
                })
            },
            fail(error) {
                console.log(error)
            }
        })
    },
    markertap(e) {
        var data = this.data.markers[e.markerId - 1]
        wx.navigateTo({
            url: `/pages/busLine/index?id=${data.parentId}&current=${data.id}`
        })
    }
})
