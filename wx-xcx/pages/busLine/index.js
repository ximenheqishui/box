// 引入SDK核心类
var QQMapWX = require('../../lib/qqmap/qqmap-wx-jssdk.js');
var qqmapsdk;
//获取应用实例
const app = getApp()

Page({
    data: {
        // 分享时的参数
        current: '',
        id: '',
        interNum: 0, //  定时器
        pointWidth: 70, // 每一个点位的宽度 这个是css设置的
        tag: true, // 是否发车
        zuijin: -1, // 最近点位的数组坐标
        left: 0, // 整个滚动区域左边滚动的距离
        carLeft: 0, // 校车定位
        points: [],  // 这条线上所有的点位
        startName: '开始',
        endName: '结束',
        startTime: '06:00',
        endTime: '20:00',
        jizhan: 0,
        jimi: '0m',
        jifenzhong: '0分钟',
    },

    onShareAppMessage: function (res) {
        return {
            title: '永旺梦乐城',
            path: `/pages/busLine/index?id=${this.data.id}`
        }
    },
    onShow: function () {
        this.getDistance(this.data.points)
    },
    onHide: function () {
        clearInterval(this.data.interNum)
    },
    onUnload: function () {
        clearInterval(this.data.interNum)
    },
    onLoad: function (options) {
        let _this = this
        _this.setData({
            id: options.id
        })
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'A65BZ-DDJ6O-DCOWL-SPETB-VDH7H-3NBJT'
        });
        // 获取公交线路
        wx.request({
            method: 'get',
            url: app.globalData.baseUrl + '/bus/getLineInfo',
            dataType: 'json',
            data: {
                id: options.id
            },
            success(res) {
                let data = res.data.data
                wx.setNavigationBarTitle({
                    title: data.title
                })

                // 设置选中点位
                if (options.current) {
                    data.station.forEach(function (item, index) {
                        if (options.current == item.id) {
                            _this.setData({
                                current: index
                            })
                        }
                    })
                }

                _this.setData({
                    points: data.station,
                    startName: data.station[0].title,
                    endName: data.station[data.station.length - 1].title,
                    startTime: data.start_time.slice(0, 5),
                    endTime: data.end_time.slice(0, 5)
                })

                // 算出最近的点位
                _this.getDistance(data.station)

            },
            fail(error) {
                console.log(error)
            }
        })
    },

    // 获取最近点的站牌
    getDistance(data) {
        var _this = this;
        // 判断是否有数据  是否是第一次  第一次就不执行   等待接口请求到数据再执行
        if (data && data.length) {
            //调用距离计算接口
            qqmapsdk.calculateDistance({
                mode: 'walking',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
                //from参数不填默认当前地址
                //获取表单提交的经纬度并设置from和to参数（示例为string格式）
                from: '',  // 若起点有数据则采用起点坐标，若为空默认当前地址
                to: data,  // 终点坐标
                success: function (res) {//成功后的回调
                    console.log(res);
                    var res = res.result;
                    var dis = [];
                    for (var i = 0; i < res.elements.length; i++) {
                        dis.push(res.elements[i].distance); //将返回数据存入dis数组，
                    }

                    function sortNumber(a, b) {
                        return a - b
                    }

                    let distance = dis
                    let distance2 = JSON.parse(JSON.stringify(distance))
                    distance.sort(sortNumber)
                    let index = distance2.indexOf(distance[0])  // 从所有的点位中计算出  最近的点位并返回数组中的位置
                    let moveLeft = (index > 3 ? index - 2 : 0) * _this.data.pointWidth  // 计算整体向右移动的距离
                    _this.setData({
                        zuijin: index,
                        left: moveLeft,
                    })
                    _this.getCarInfo()
                    _this.setData({
                        interNum: setInterval(function () {
                            // 获取公交线路
                            _this.getCarInfo()
                        }, 5000)
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
    },

    // 获取车的位置并计算时候发车和距离现在最近点的时间距离，用时
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
                    // 设置车的位置
                    let carLeft = 20 + (data.location - 1) * _this.data.pointWidth - 16 + 5  // 小车定位
                    _this.setData({
                        carLeft: carLeft
                    })

                    let pointIndex = _this.data.zuijin
                    if (_this.data.current !== '') {
                        pointIndex =  _this.data.current
                    }
                    // 判断是否发车
                    if (data.location == 1 || data.location > (pointIndex + 1)) {
                        _this.setData({
                            tag: false
                        })
                    } else {
                        _this.setData({
                            tag: true,
                            jizhan: Math.ceil(pointIndex + 1 - data.location)
                        })
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
                        _this.getCarDistance(carData)
                    }
                } else {
                    _this.setData({
                        tag: false
                    })
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
                let jimi = 0

                ret.forEach(function (item) {
                    jifenzhong += item.duration
                    jimi += item.distance
                })
                _this.setData({
                    jifenzhong: jifenzhong + '分钟',
                    jimi: jimi > 1000 ? (jimi / 1000).toFixed(2) + 'km' : jimi + 'm',
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

    goMap () {
        let pointIndex = this.data.zuijin
        if (this.data.current !== '') {
            pointIndex =  this.data.current
        }
        wx.navigateTo({
            url: `/pages/stationLine/index?id=${this.data.id}&index=${pointIndex}`
        })
    }
})
