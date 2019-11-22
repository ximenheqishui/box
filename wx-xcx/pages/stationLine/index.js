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
            }, 10000)
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

                let lineP = []
                for (let i = 0; i < data.station.length; i++) {
                    let a = parseInt(i / 10)
                    if (lineP[a]) {
                        lineP[a].push(data.station[i])
                    } else {
                        lineP[a] = []
                        if (a === 0) {
                            lineP[a][0] = data.station[i]
                        } else {
                            lineP[a][0] = lineP[a - 1][9]
                            lineP[a][1] = data.station[i]
                        }
                    }
                }

                lineP.forEach(function (item) {
                    let data = {
                        from: {
                            latitude: item[0].latitude,
                            longitude: item[0].longitude
                        },
                        to: {
                            latitude: item[item.length - 1].latitude,
                            longitude: item[item.length - 1].longitude
                        },
                        waypoints: ''
                    }
                    let strArr = item.map(function (item2) {
                        return item2.latitude + ',' + item2.longitude
                    })
                    data.waypoints = strArr.join(';')
                    _this.getDirection(data)
                })
                timer = setInterval(function () {
                    console.log(1)
                    if (lineP.length === _this.data.completeNum) {
                        console.log(2)
                        clearInterval(timer)
                        _this.getCarInfo()
                        timer = setInterval(function () {
                            _this.getCarInfo()
                        }, 10000)
                    }
                }, 500)
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
                _this.setData({
                    markers: markers,
                    points: data.station,
                })
            },
            fail(error) {
                console.log(error)
            }
        })

    },
    // 计算车到最近点的位置
    getDirection(data) {
        var _this = this;
        qqmapsdk.direction({
            mode: 'driving',//可选值：'driving'（驾车）、'walking'（步行）、'bicycling'（骑行），不填默认：'driving',可不填
            //from参数不填默认当前地址
            from: data.from,
            to: data.to,
            waypoints: data.waypoints,
            success: function (res) {
                console.log(res);
                var ret = res;
                var coors = ret.result.routes[0].polyline, pl = [];
                //坐标解压（返回的点串坐标，通过前向差分进行压缩）
                var kr = 1000000;
                for (var i = 2; i < coors.length; i++) {
                    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                }
                //将解压后的坐标放入点串数组pl中
                for (var i = 0; i < coors.length; i += 2) {
                    pl.push({latitude: coors[i], longitude: coors[i + 1]})
                }

                let polyline = [{
                    points: _this.data.polyline[0].points.concat(pl),
                    color: '#07c160',
                    width: 3
                }]
                _this.setData({
                    polyline: polyline
                })
            },
            fail: function (error) {
                console.error(error);
            },
            complete: function (res) {
                _this.setData({
                    completeNum: _this.data.completeNum + 1
                })
            }
        });
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
                    console.log(data)
                    let marker = _this.data.markers
                    let dis = _this.data.polyline[0].points.map(function (item, index) {
                        return Math.sqrt(Math.pow((item.latitude - data.latitude), 2) + Math.pow((item.longitude - data.longitude), 2)) + ',' + index
                    })
                    dis.sort()
                    let zuijin = dis[0].split(',')[1]
                    console.log(zuijin)
                    if (zuijin == 0) {
                        zuijin = 1
                    }
                    // zuijin = 126
                    // console.log(_this.data.polyline[0].points.length)
                    let point = {
                        latitude: _this.data.polyline[0].points[zuijin].latitude,
                        longitude: _this.data.polyline[0].points[zuijin].longitude,
                        iconPath: '/image/car.png',
                        width: 44,
                        height: 20,
                        anchor:{
                            x: 0.5,
                            y: 0.5
                        },
                        rotate: _this.getAngle(_this.data.polyline[0].points[zuijin - 1], _this.data.polyline[0].points[zuijin])
                    }





                    let pointIndex = _this.data.current

                    // 判断是否发车
                    if (data.location == 1 || data.location > (pointIndex + 1)) {
                        if (getCarNum === 1) {
                            marker.push(point)
                        } else {
                            marker[marker.length - 1] = point
                        }
                        _this.setData({
                            markers: marker,
                            latitude: _this.data.polyline[0].points[zuijin].latitude,
                            longitude: _this.data.polyline[0].points[zuijin].longitude,
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
                                    latitude: _this.data.polyline[0].points[zuijin].latitude,
                                    longitude: _this.data.polyline[0].points[zuijin].longitude,
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
    markertap(e) {
        var data = this.data.markers[e.markerId - 1]
    },
    getAngle(pntFirst, pntNext) {
        var dRotateAngle = Math.atan2(pntFirst.latitude - pntNext.latitude, pntFirst.longitude - pntNext.longitude);
        // 弧度转度数
        dRotateAngle = dRotateAngle * 180 / Math.PI;
        // 正负180度转为顺时针360度
        if (dRotateAngle < 0 ) {
            dRotateAngle  = -dRotateAngle
        } else {
            dRotateAngle = 360 - dRotateAngle
        }
        console.log('度', dRotateAngle)
        if (isNaN(dRotateAngle)) {
            return 0;
        }
        return dRotateAngle;
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
    }
})
