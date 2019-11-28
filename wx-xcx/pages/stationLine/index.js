// 引入SDK核心类
var QQMapWX = require('../../lib/qqmap/qqmap-wx-jssdk.js');
var qqmapsdk;

var timer;
var getCarNum = 0
//获取应用实例
const app = getApp()

Page({
    data: {
        id: 0,
        mapContext: null,
        current: '',
        completeNum: 0,
        latitude: 0,
        longitude: 0,
        height: 0,
        points: [],
        markers: [],
        pointLIN: [],
        polyline: [
            {
                points: [],
                color: '#1349ff',
                width: 3
            }
        ]
    },
    onShow: function () {
        let _this = this
        if (_this.data.points.length) {
            timer = setInterval(function () {
                _this.getCarInfo()
            }, 5000)
        }
    },
    onHide: function () {
        clearInterval(timer)
    },
    onUnload: function () {
        clearInterval(timer)
    },
    onLoad: function (options) {
        let _this = this
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'A65BZ-DDJ6O-DCOWL-SPETB-VDH7H-3NBJT'
        });
        let current = options.index
        _this.setData({
            id: options.id || 2,
            current: current,
            height: wx.getSystemInfoSync().windowHeight
        })
        // 获取公交线路
        wx.request({
            method: 'get',
            url: app.globalData.baseUrl + '/bus/getLineInfo',
            dataType: 'json',
            data: {
                id: _this.data.id
            },
            success(res) {
                let data = res.data.data
                let markers = []

                // 增加车的位置
                let point = {
                    id: 10086,
                    iconPath: '/image/car.png',
                    width: 44,
                    height: 20,
                    zIndex: 10000,
                    anchor:{
                        x: 0.5,
                        y: 0.5
                    },
                    rotate: 0
                }
                console.log(data.station)
                console.log(current)
                if (data.station && data.station.length) {
                    _this.setData({
                        latitude: data.station[current].latitude,//纬度
                        longitude: data.station[current].longitude,//经度
                    })
                    data.station.forEach(function (item2, index2) {
                        var left = item2.title.length * 7
                        item2.iconPath = '/image/point.png'
                        item2.zIndex = 1
                        if (index2 === data.station.length - 1) {
                            item2.iconPath = '/image/zhong.png'
                        }
                        if (current == index2) {
                            item2.iconPath = '/image/pai.png'
                        }
                        item2.label = {
                            content: item2.title,
                            color: '#000',
                            fontSize: 12,
                            textAlign: 'center',
                            anchorX: -left,
                            anchorY: 0
                        }
                        delete item2.title
                        markers.push(item2)
                    })

                    // 设置车辆位置
                    point.latitude = data.station[0].latitude
                    point.longitude = data.station[0].longitude
                }

                markers.push(point)

                let polyline = [{
                    points: data.polyline || [],
                    color: '#07c160',
                    width: 3
                }]
                _this.setData({
                    markers: markers,
                    points: data.station,
                    polyline: polyline
                })
                _this.getCarInfo()
                timer = setInterval(function () {
                    _this.getCarInfo()
                }, 5000)
            },
            fail(error) {
                console.log(error)
            }
        })
        _this.data.mapContext = wx.createMapContext('map')
    },
    getCarInfo() {
        let _this = this
        wx.request({
            method: 'get',
            url: app.globalData.baseUrl + '/bus/getList',
            dataType: 'json',
            data: {
                line_id: _this.data.id
            },
            success(res) {
                if (res.data.data && res.data.data.length) {
                    let data = res.data.data[0]
                    _this.data.mapContext.translateMarker({
                        markerId:10086,
                        destination:{
                            latitude: parseFloat(data.latitude),
                            longitude:parseFloat(data.longitude),
                        },
                        autoRotate: false,
                        rotate: data.angle || 0,
                        duration: 200,
                        success: function(){
                            console.log('ok')
                        },
                        fail: function(){
                            console.log('fail')
                        },
                        complete: function () {
                            console.log('sss')
                        }
                    })
                }
            },
            fail(error) {
                console.log(error)
            }
        })
    },

    onShareAppMessage: function (res) {
        return {
            title: '永旺梦乐城',
            path: `/pages/stationLine/index?index=${this.data.current}&id=${this.data.id}}`
        }
    }
})
