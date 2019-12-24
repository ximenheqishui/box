// pages/webrtc-room/signature/signature.js

// canvas 全局配置
var context = null;// 使用 wx.createContext 获取绘图上下文 context
var isButtonDown = false;
var arrx = [];
var arry = [];
var arrz = [];
var canvasw = 0;
var canvash = 0;
wx.getSystemInfo({
  success: function (res) {
    canvasw = res.windowWidth;//设备宽度
    // canvash = res.windowWidth * 7 / 15;
    canvash = res.windowHeight
  }
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: "",
    sign: false,
    roomID: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.data.roomID = options.roomID || '';
      context = wx.createCanvasContext('canvas');
      context.beginPath()
      context.setStrokeStyle('#ff0000');
      context.setLineWidth(4);
      context.setLineCap('round');
      context.setLineJoin('round');

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  //开始
  canvasStart: function (event) {
    isButtonDown = true;
    arrz.push(0);
    arrx.push(event.changedTouches[0].x);
    arry.push(event.changedTouches[0].y);
    //context.moveTo(event.changedTouches[0].x, event.changedTouches[0].y);

  },
  //过程
  canvasMove: function (event) {
    if (isButtonDown) {
      arrz.push(1);
      arrx.push(event.changedTouches[0].x);
      arry.push(event.changedTouches[0].y);
      // context.lineTo(event.changedTouches[0].x, event.changedTouches[0].y);
      // context.stroke();
      // context.draw()

    };

    for (var i = 0; i < arrx.length; i++) {
      if (arrz[i] == 0) {
        context.moveTo(arrx[i], arry[i])
      } else {
        context.lineTo(arrx[i], arry[i])
      };

    };
    context.clearRect(0, 0, canvasw, canvash);

    context.setStrokeStyle('#ff0000');
    context.setLineWidth(4);
    context.setLineCap('round');
    context.setLineJoin('round');
    context.stroke();

    context.draw(false);
  },
  canvasEnd: function (event) {
    isButtonDown = false;
  },
  cleardraw: function () {
    //清除画布
    arrx = [];
    arry = [];
    arrz = [];
    context.clearRect(0, 0, canvasw, canvash);
    context.draw(true);
  },
  //导出图片
  getimg: function () {
    if (arrx.length == 0) {
      wx.showModal({
        title: '提示',
        content: '签名内容不能为空！',
        showCancel: false
      });
      return false;
    };
    wx.navigateBack({
      delta: 1,
    })
    // wx.navigateTo({
    //   url: `../room/room?roomID=${this.data.roomID}`
    // });

    //生成图片
    // wx.canvasToTempFilePath({
    //   canvasId: 'canvas',
    //   success: function (res) {
    //     console.log(res.tempFilePath);
    //     //存入服务器
    //     // wx.uploadFile({
    //     //   url: 'a.php', //接口地址
    //     //   filePath: res.tempFilePath,
    //     //   name: 'file',
    //     //   formData: {                                 //HTTP 请求中其他额外的 form data
    //     //     'user': 'test'
    //     //   },
    //     //   success: function (res) {
    //     //     console.log(res);
    //     //   },
    //     //   fail: function (res) {
    //     //     console.log(res);
    //     //   },
    //     //   complete: function (res) {
    //     //   }
    //     // });
    //   }
    // })

  },

})
