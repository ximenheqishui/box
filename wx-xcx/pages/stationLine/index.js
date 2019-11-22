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
        let current = options.index || 2
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
                _this.setData({
                    latitude: data.station[current].latitude,//纬度
                    longitude: data.station[current].longitude,//经度
                })
                let markers = []
                data.station.forEach(function (item2, index2) {
                    var left = item2.title.length * 7
                    item2.iconPath = '/image/point.png'
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
    },
    // 获取车的位置并计算时候发车和距离现在最近点的时间距离，用时
    getCarInfo() {
        getCarNum++
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
                    let point = {
                        latitude: data.latitude,
                        longitude:data.longitude,
                        iconPath: '/image/car.png',
                        width: 44,
                        height: 20,
                        anchor:{
                            x: 0.5,
                            y: 0.5
                        },
                        rotate: data.angle
                    }

                    let marker = _this.data.markers
                    let pointIndex = parseInt(_this.data.current)

                    // 判断是否发车
                    if (data.location == 1 || data.location >= (pointIndex + 1)) {
                        if (getCarNum === 1) {
                            marker.push(point)
                        } else {
                            marker[marker.length - 1] = point
                        }
                        _this.setData({
                            markers: marker
                        })
                    } else {
                        let carData = {
                            from: {
                                latitude: data.latitude,
                                longitude: data.longitude
                            }, // 车当前的经纬度
                            to: {
                                latitude: _this.data.points[pointIndex].latitude,
                                longitude: _this.data.points[pointIndex].longitude
                            }, // 最近点的经纬度
                            // waypoints: '39.951004,116.571980;'  // 经过哪些点
                            waypoints: ''
                        }
                        //调用距离计算接口
                        qqmapsdk.direction({
                            mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
                            //from参数不填默认当前地址
                            from: carData.from,
                            to: carData.to,
                            waypoints: carData.waypoints,
                            success: function (res) {
                                console.log(res);
                                var ret = res.result.routes;
                                let jifenzhong = 0
                                ret.forEach(function (item) {
                                    jifenzhong += item.duration
                                })
                                point.label = {
                                    content: '距离候车站剩余：' + jifenzhong + '分钟',
                                    bgColor: '#ffffff',
                                    padding: 4,
                                    anchorX: 20
                                }
                                if (getCarNum === 1) {
                                    marker.push(point)
                                } else {
                                    marker[marker.length - 1] = point
                                }
                                _this.setData({
                                    markers: marker,
                                    latitude: data.latitude,
                                    longitude: data.longitude,
                                })
                            },
                            fail: function (error) {
                                console.error(error);
                            },
                            complete: function (res) {
                                // console.log(res);
                            }
                        });
                    }
                }
            },
            fail(error) {
                console.log(error)
            }
        })
    },
    // 计算车到最近点的位置
    getCarDistance(data) {
        var _this = this;
        //调用距离计算接口
        qqmapsdk.direction({
            mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
            //from参数不填默认当前地址
            from: data.from,
            to: data.to,
            waypoints: data.waypoints,
            success: function (res) {
                console.log(res);
                var ret = res.result.routes;
                let jifenzhong = 0
                ret.forEach(function (item) {
                    jifenzhong += item.duration
                })
                _this.setData({
                    jifenzhong: jifenzhong + '分钟'
                })
            },
            fail: function (error) {
                console.error(error);
            },
            complete: function (res) {
                // console.log(res);
            }
        });
    },

    onShareAppMessage: function (res) {
        return {
            title: '永旺梦乐城',
            path: `/pages/stationLine/index?index=${this.data.current}&id=${this.data.id}}`
        }
    }
})
