//获取应用实例
const app = getApp()

Page({
    data: {
        latitude: 0,
        longitude: 0,
        height: 0,
        circles: [],
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
                let circle = {
                    latitude: latitude,//纬度
                    longitude: longitude,//经度
                    radius:500,
                    fillColor: '#00000012',
                    color: '#036efa',
                    strokeWidth: 2
                }
                _this.setData({
                    circle: [circle],
                    latitude: latitude,//纬度
                    longitude: longitude,//经度
                })
                let markers = _this.data.markers
                markers.push({
                    id: 10086,
                    latitude:latitude + 0.0046,
                    longitude: longitude,
                    iconPath: '/image/kong.png',
                    label: {
                        content: '距我500米',
                        color: '#183eff',
                        borderRadius: 4,
                        padding: 4,
                        bgColor: '#fff',
                        textAlign: 'center',
                        anchorX: -34
                    }
                })
                _this.setData({
                    markers: markers
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
                let markers = _this.data.markers
                data.forEach(function (item) {
                    if (item.station && item.station.length) {
                        item.station.forEach(function (item2) {
                            var left = item2.title.length * 7
                            item2.parentId = item.id
                            item2.iconPath = '/image/point3.png'
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
        var data = {}
        if (e.markerId == 10086) {
            return false
        }
        this.data.markers.forEach(function(item){
            if (item.id == e.markerId) {
                data =  item
            }
        })
        wx.navigateTo({
            url: `/pages/busLine/index?id=${data.parentId}&current=${data.id}`
        })
    },
    onShareAppMessage: function (res) {
        return {
            title: '永旺梦乐城',
            path: `/pages/station/index`
        }
    }
})
