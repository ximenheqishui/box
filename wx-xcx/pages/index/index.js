//index.js
// 引入SDK核心类
var QQMapWX = require('../../lib/qqmap/qqmap-wx-jssdk.js');
var qqmapsdk;
//获取应用实例
const app = getApp()

Page({
  data: {
    lines: [],
    point: [],
  },
  onShow: function () {
    let _this = this
    _this.getDistance(_this.lines)
  },
    //事件处理函数
  goPage: function(e) {
    wx.navigateTo({
      url: `../busLine/index?id=${e.mark.id}`
    })
  },
  onLoad: function () {
    let _this = this
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'DGEBZ-U34WO-CTDWB-SVHJM-76CT6-G5FKJ'
    })
    // 获取公交线路
    wx.request({
      method: 'get',
      url: app.globalData.baseUrl + '/bus/getLineList',
      dataType: 'json',
      data: {},
      success (res) {
        let data = res.data.data
        _this.setData({
          lines: data
        })
        _this.getDistance(data)
      },
      fail (error) {
        console.log(error)
      }
    })
  },
  getDistance(data){
    var _this = this;

    let arr = []
    if (data && data.length) {
      data.forEach(function(item){
        arr = arr.concat(item.station)
      })

      //调用距离计算接口
      qqmapsdk.calculateDistance({
        mode: 'walking',//可选值：'driving'（驾车）、'walking'（步行），不填默认：'walking',可不填
        //from参数不填默认当前地址
        //获取表单提交的经纬度并设置from和to参数（示例为string格式）
        from: '',  // 若起点有数据则采用起点坐标，若为空默认当前地址
        to: arr,  // 终点坐标
        success: function(res) {//成功后的回调
          console.log(res);
          var res = res.result;
          var dis = [];
          for (var i = 0; i < res.elements.length; i++) {
            dis.push(res.elements[i].distance); //将返回数据存入dis数组，
          }
          function sortNumber(a,b) {
            return a - b
          }
          let point = []
          data.forEach(function(item){
            let distance =  dis.splice(0,item.station.length)
            let distance2 = JSON.parse(JSON.stringify(distance))
            distance.sort(sortNumber)
            let index = distance2.indexOf(distance[0])
            item.station[index].distance = distance[0]
            // 小于10千米的才显示出来
            if (distance[0] < 35000) {
              item.station[index].distance = item.station[index].distance > 1000 ?   (item.station[index].distance/1000).toFixed(2) + 'km' : item.station[index].distance + 'm',
              point.push({
                title: item.title,
                id: item.id,
                point: item.station[index]
              })
            }
          })
          console.log(point)
          _this.setData({
            point: point
          })
        },
        fail: function(error) {
          console.error(error);
        },
        complete: function(res) {
          console.log(res);
        }
      });
    }


  }
})
