const app = getApp()
const GenerateTestUserSig = require("../debug/GenerateTestUserSig.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        invitationNo: '',
        tapTime: ''
    },

    // 绑定输房间号入框
    bindInvitationNo: function (e) {
        var self = this;
        self.setData({
            invitationNo: e.detail.value
        });
    },


    // 获取用户头像并进入房间
    joinRoom(e) {
        var self = this;
        if (!e.detail.userInfo) {
            return
        }
        // 防止两次点击操作间隔太快
        var nowTime = new Date();
        if (nowTime - this.data.tapTime < 1000) {
            return;
        }
        self.setData({
            'tapTime': nowTime
        });

        console.log(e.detail.userInfo)
        app.globalData.userInfo = e.detail.userInfo

        if (!self.data.invitationNo) {
            wx.showToast({
                title: '请输入邀请码',
                icon: 'none',
                duration: 2000
            })
            return
        }

        if (/^\d\d*$/.test(self.data.invitationNo) === false) {
            wx.showToast({
                title: '只能为数字',
                icon: 'none',
                duration: 2000
            })
            return
        }

        // wx.request({
        //     url: 'http://192.168.199.147:3000/weixin-xcx/jiaoyanroom',
        //     data: {
        //         invitationNo: self.data.invitationNo
        //     },
        //     success(res) {
        //         if (!res.data.code) {
        //             app.getOpenID(function (info) {
        //                 var userSig = GenerateTestUserSig.genTestUserSig(info.openid);
        //
        //                 var url = `../room/room?roomID=${res.data.room}&sdkAppID=${userSig.sdkAppID}&userId=${info.openid}&userSig=${userSig.userSig}`;
        //
        //                 wx.navigateTo({
        //                     url: url
        //                 });
        //
        //                 wx.showToast({
        //                     title: '进入房间',
        //                     icon: 'success',
        //                     duration: 1000
        //                 })
        //             })
        //         } else {
        //             wx.showToast({
        //                 title: '邀请码已过期',
        //                 icon: 'none',
        //                 duration: 2000
        //             })
        //         }
        //     }
        // })


        app.getOpenID(function (info) {
            var userSig = GenerateTestUserSig.genTestUserSig(info.openid);

            var url = `../room/room?roomID=123&sdkAppID=${userSig.sdkAppID}&userId=${info.openid}&userSig=${userSig.userSig}`;

            wx.navigateTo({
                url: url
            });

            wx.showToast({
                title: '进入房间',
                icon: 'success',
                duration: 1000
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        app.closeSocket()
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
        return {
            path: '/pages/webrtc-room/index/index',
            imageUrl: 'https://mc.qcloudimg.com/static/img/dacf9205fe088ec2fef6f0b781c92510/share.png'
        }
    }
})
